import {
  View,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import SearchIcon from "../assets/search.png";
import FilterIcon from "../assets/filter.png";

const Search = ({ inputRef, search, setSearch, placeholder, filter, containerStyle, onFilterPress, darkMode }) => {
  const textColor = darkMode ? "#fff" : "#000";
  const placeholderColor = darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)";
  const iconTintColor = darkMode ? "#fff" : undefined;

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      style={[styles.pressable, containerStyle]}
    >
      <View style={styles.searchContainer}>
        <Image source={SearchIcon} style={iconTintColor ? { tintColor: iconTintColor } : {}} />
        <TextInput
          ref={inputRef}
          placeholder={placeholder}
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={placeholderColor}
          autoCapitalize="none"
          keyboardType="default"
          style={[styles.searchInput, { color: textColor }]}
        />
      </View>

      {filter && (
        <TouchableOpacity style={styles.filterBtn} onPress={onFilterPress}>
          <Image source={FilterIcon} style={iconTintColor ? { tintColor: iconTintColor } : {}} />
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

export default Search;

const styles = StyleSheet.create({
  pressable: {
    borderRadius: 31,
    height: 52,
    borderWidth: 1,
    borderColor: "rgba(162, 158, 158, 0.14)",
    borderStyle: "solid",
    paddingLeft: 18,
    paddingRight: 3,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    flexDirection: "row",
    gap: 11,
    flex: 1,
    alignItems: "center",
  },
  searchInput: { flex: 1, height: "100%" },
  filterBtn: {
    borderWidth: 1,
    borderColor: "rgba(162, 158, 158, 0.14)",
    borderStyle: "solid",
    borderRadius: 31,
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 3,
  },
});
