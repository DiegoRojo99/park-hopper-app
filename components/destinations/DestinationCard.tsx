import { StyleSheet, Text, View } from "react-native";
import { DestinationWithParks } from "../../types/db";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
          {destination.parks.map((park) => ( <ParkCard key={park.id} park={park} /> ))}
      </View>
    </View>
  );
}

function ParkCard({ park }: { park: { id: string; name: string } }) {
  return (
    <View style={styles.parkCard}>
      <Text style={styles.parkName}>{park.name}</Text>
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
  parkCard: {
    padding: 8,
    marginVertical: 4,
    backgroundColor: "#dddddd",
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
