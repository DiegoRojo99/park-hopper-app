import { StyleSheet, Text, View } from "react-native";
import { DestinationWithParks } from "../../types/db";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ParkRow from "../parks/ParkRow";

export default function DestinationCard({ destination }: { destination: DestinationWithParks }) {
  return (
    <View style={styles.card}>
      <View style={styles.description}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons name="ferris-wheel" size={32} color="black" />
          <View style={{ paddingHorizontal: 8, marginLeft: 8, flex: 1, borderBottomWidth: 1, borderColor: "#eee" }}>
            <Text style={styles.title}>{destination.name}</Text>
            <Text style={styles.description}>
              {destination.parks.length} park{destination.parks.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.parksContainer}>
        {destination.parks.map((park) => ( <ParkRow key={park.id} park={park} /> ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  parksContainer: {
    marginTop: 8,
  },
});
