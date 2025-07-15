import { Pressable, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";

export default function ParkRow({ park }: { park: { id: string; name: string } }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Pressable style={styles.parkRow} onPress={() => navigation.navigate("ParkDetails", { parkId: park.id })}>
      <Text style={styles.parkName}>{park.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  parkRow: {
    padding: 8,
    marginVertical: 4,
    backgroundColor: "#eeeeee",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 1,
  },
  parkName: {
    fontSize: 14,
    marginLeft: 8,
  },
});
