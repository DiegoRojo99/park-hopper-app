import { StyleSheet, Text, View } from "react-native";
import { DestinationWithParks } from "../../types/db";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ParkRow from "../parks/ParkRow";
import { useState } from "react";

export default function DestinationCard({ destination }: { destination: DestinationWithParks }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.chevronContainer}>
          {open ? (
            <MaterialCommunityIcons name="chevron-up" size={32} color="black" onPress={() => setOpen(false)} />
          ) : (
            <MaterialCommunityIcons name="chevron-down" size={32} color="black" onPress={() => setOpen(true)} />
          )}
        </View>
        <View style={{ paddingHorizontal: 8, marginLeft: 8, flex: 1 }}>
          <Text style={styles.title}>{destination.name}</Text>
          <Text style={styles.description}>
            {destination.parks.length} park{destination.parks.length !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>
      { open && 
        <View style={styles.parksContainer}>
          {destination.parks.map((park) => ( <ParkRow key={park.id} park={park} /> ))}
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: "100%",
    flexDirection: "column",
  },
  topRow: {
    flexDirection: "row",
  },
  chevronContainer: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  parksContainer: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: "#eee"
  },
});
