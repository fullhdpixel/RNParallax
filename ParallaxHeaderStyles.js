import { StyleSheet, Platform, Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const IS_IPHONE_X = SCREEN_HEIGHT === 812;

const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 0;
const NAV_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 45;

// Setup DEFAULTS
export const DEFAULTS = {
  HEADER_MAX_HEIGHT: 200,
  HEADER_MIN_HEIGHT: NAV_BAR_HEIGHT,
  SCROLL_EVENT_THROTTLE: 16,
  EXTRA_SCROLL_HEIGHT: 50,
  BACKGROUND_IMAGE_SCALE: 1.5,
  TITLE_COLOR: "white",
  NAVBAR_COLOR: "#3498db",
  BACKGROUND_COLOR: "#303F9F"
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  scrollView: {
    flex: 1
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: DEFAULTS.NAVBAR_COLOR,
    overflow: "hidden"
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: DEFAULTS.HEADER_MAX_HEIGHT,
    resizeMode: "cover"
  },
  bar: {
    backgroundColor: "transparent",
    height: DEFAULTS.HEADER_MIN_HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  headerTitle: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  headerText: {
    color: DEFAULTS.TITLE_COLOR,
    textAlign: "center",
    fontSize: 16
  }
});
