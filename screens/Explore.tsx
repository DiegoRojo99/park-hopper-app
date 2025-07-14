import { View, Text, StyleSheet } from "react-native";
import ParkList from "../components/parks/ParkList";

export default function Explore() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Parks</Text>
      <ParkList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});