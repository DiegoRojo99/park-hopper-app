import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({ searchQuery, setSearchQuery, customStyle }: { searchQuery: string; setSearchQuery: (query: string) => void; customStyle?: object }) {
  return (
    <View style={{...styles.searchBarContainer, ...customStyle}}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});