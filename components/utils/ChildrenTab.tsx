import { View, StyleSheet, Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from "../../utils/Colors";

export default function ParkChildrenTab({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) {
  return (
    <View style={styles.tabContainer}>
      <Pressable style={[styles.tab, activeTab === "Attractions" ? styles.activeTab : styles.inactiveTab]} onPress={() => setActiveTab("Attractions")}>
        <MaterialCommunityIcons name="ferris-wheel" size={32} color="black" />
      </Pressable>
      <Pressable style={[styles.tab, activeTab === "Shows" ? styles.activeTab : styles.inactiveTab]} onPress={() => setActiveTab("Shows")}>
        <MaterialCommunityIcons name="drama-masks" size={32} color="black" />
      </Pressable>
      <Pressable style={[styles.tab, activeTab === "Restaurants" ? styles.activeTab : styles.inactiveTab]} onPress={() => setActiveTab("Restaurants")}>
        <Ionicons name="restaurant" size={32} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 8,
  },
  tab: {
    padding: 12,
    marginVertical: 4,
    alignItems: "center",
    height: 56,
    justifyContent: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.light.primary,
  },
  inactiveTab: {
  },
});
