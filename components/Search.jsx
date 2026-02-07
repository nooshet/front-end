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

const Search = ({ inputRef, search, setSearch }) => {
  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      style={styles.pressable}
    >
      <View style={styles.searchContainer}>
        <Image source={SearchIcon} />
        <TextInput
          ref={inputRef}
          placeholder="Nə yemək istəyirsən?"
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          keyboardType="default"
          style={styles.searchInput}
        />
      </View>

      <TouchableOpacity style={styles.filterBtn}>
        <Image source={FilterIcon} />
      </TouchableOpacity>
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
