import React, { Component } from "react";
import PropTypes from "prop-types";

import { DEFAULTS, styles } from "./ParallaxHeaderStyles";
import { Animated, View } from "react-native";

class ParallaxHeader extends Component {
  constructor() {
    super();
    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  getHeaderMaxHeight() {
    const { headerMaxHeight } = this.props;
    return headerMaxHeight;
  }

  getHeaderMinHeight() {
    const { headerMinHeight } = this.props;
    return headerMinHeight;
  }

  getHeaderScrollDistance() {
    return this.getHeaderMaxHeight() - this.getHeaderMinHeight();
  }

  getExtraScrollHeight() {
    const { extraScrollHeight } = this.props;
    return extraScrollHeight;
  }

  getBackgroundImageScale() {
    const { backgroundImageScale } = this.props;
    return backgroundImageScale;
  }

  getInputRange() {
    return [-this.getExtraScrollHeight(), 0, this.getHeaderScrollDistance()];
  }

  getHeaderHeight() {
    return this.state.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [
        this.getHeaderMaxHeight() + this.getExtraScrollHeight(),
        this.getHeaderMaxHeight(),
        this.getHeaderMinHeight()
      ],
      extrapolate: "clamp"
    });
  }

  getNavBarOpacity() {
    return this.state.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 1, 1],
      extrapolate: "clamp"
    });
  }

  getImageOpacity() {
    return this.state.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [1, 1, 0],
      extrapolate: "clamp"
    });
  }

  getImageTranslate() {
    return this.state.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 0, -50],
      extrapolate: "clamp"
    });
  }

  getImageScale() {
    return this.state.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [this.getBackgroundImageScale(), 1, 1],
      extrapolate: "clamp"
    });
  }

  getTitleTranslate() {
    return this.state.scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [5, 0, 0],
      extrapolate: "clamp"
    });
  }

  renderHeaderForeground() {
    const { renderNavBar } = this.props;

    return (
      <Animated.View
        style={[
          styles.bar,
          {
            height: this.getHeaderMinHeight()
          }
        ]}
      >
        {renderNavBar()}
      </Animated.View>
    );
  }

  renderBackgroundImage() {
    const { backgroundImage } = this.props;
    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();

    return (
      <Animated.Image
        style={[
          styles.backgroundImage,
          {
            height: this.getHeaderMaxHeight(),
            opacity: imageOpacity,
            transform: [{ translateY: imageTranslate }, { scale: imageScale }]
          }
        ]}
        source={backgroundImage}
      />
    );
  }

  renderPlainBackground() {
    const { backgroundColor } = this.props;

    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();

    return (
      <Animated.View
        style={{
          height: this.getHeaderMaxHeight(),
          backgroundColor,
          opacity: imageOpacity,
          transform: [{ translateY: imageTranslate }, { scale: imageScale }]
        }}
      />
    );
  }

  renderNavbarBackground() {
    const { navbarColor } = this.props;
    const navBarOpacity = this.getNavBarOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            backgroundColor: navbarColor,
            opacity: navBarOpacity
          }
        ]}
      />
    );
  }

  renderHeaderBackground() {
    const { backgroundImage, backgroundColor } = this.props;
    const imageOpacity = this.getImageOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            opacity: imageOpacity,
            backgroundColor: backgroundImage ? "transparent" : backgroundColor
          }
        ]}
      >
        {backgroundImage && this.renderBackgroundImage()}
        {!backgroundImage && this.renderPlainBackground()}
      </Animated.View>
    );
  }

  renderScrollView() {
    const { renderContent, scrollEventThrottle } = this.props;

    return (
      <Animated.ScrollView
        style={styles.scrollView}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
        ])}
      >
        <View style={{ marginTop: this.getHeaderMaxHeight() }}>
          {renderContent()}
        </View>
      </Animated.ScrollView>
    );
  }

  renderCustomView() {
    const { renderCustomView } = this.props;
    const titleTranslate = this.getTitleTranslate();

    return (
      <Animated.View
        style={[
          styles.headerTitle,
          {
            transform: [{ translateY: titleTranslate }],
          }
        ]}
      >
        {renderCustomView()}
      </Animated.View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderScrollView()}
        {this.renderNavbarBackground()}
        {this.renderHeaderBackground()}
        {this.renderCustomView()}
        {this.renderHeaderForeground()}
      </View>
    );
  }
}

ParallaxHeader.propTypes = {
  renderNavBar: PropTypes.func,
  renderContent: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.any,
  navbarColor: PropTypes.string,
  renderCustomView: PropTypes.View,
  headerMaxHeight: PropTypes.number,
  headerMinHeight: PropTypes.number,
  scrollEventThrottle: PropTypes.number,
  extraScrollHeight: PropTypes.number,
  backgroundImageScale: PropTypes.number
};

ParallaxHeader.defaultProps = {
  renderNavBar: () => <View />,
  navbarColor: DEFAULTS.NAVBAR_COLOR,
  backgroundColor: DEFAULTS.BACKGROUND_COLOR,
  backgroundImage: null,
  renderCustomView: () => <View/>,
  headerMaxHeight: DEFAULTS.HEADER_MAX_HEIGHT,
  headerMinHeight: DEFAULTS.HEADER_MIN_HEIGHT,
  scrollEventThrottle: DEFAULTS.SCROLL_EVENT_THROTTLE,
  extraScrollHeight: DEFAULTS.EXTRA_SCROLL_HEIGHT,
  backgroundImageScale: DEFAULTS.BACKGROUND_IMAGE_SCALE
};

export default ParallaxHeader;
