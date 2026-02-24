import useThemeStore from "../store/useThemeStore";
import { LIGHT_COLORS, DARK_COLORS } from "../constant/all-color";

const useColors = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  return isDarkMode ? DARK_COLORS : LIGHT_COLORS;
};

export default useColors;
