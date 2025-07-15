import { View, Text, StyleSheet, ScrollView } from "react-native";
import { DestinationWithParks, ParkWithDestination } from "../../types/db";
import DestinationCard from "./DestinationCard";
import { SortOption } from "../../types/navigation";

export default function DestinationList({ parks, sortOption }: { parks?: ParkWithDestination[]; sortOption: SortOption }) {
  if (!parks?.length) {
    return (<View style={styles.container}><Text>No parks available</Text></View>);
  }

  // Group parks by destination.name
  const grouped = parks.reduce<DestinationWithParks[]>((acc, park) => {
    const destName = park.destination?.name || 'Unknown';
    const existing = acc.find((destination) => destination.name === destName);
    if (existing) {
      existing.parks.push(park);
    } else {
      acc.push({
        id: park.destination?.id ?? `unknown-${destName}`,
        slug: park.destination?.slug ?? destName.toLowerCase().replace(/\s+/g, '-'),
        name: destName,
        parks: [park]
      });
    }
    return acc;
  }, []);

  const sortedDestinations = grouped.sort((a, b) => {
    if (sortOption === "Number of Parks") {
      return b.parks.length - a.parks.length;
    } 
    else if (sortOption === "Name (A-Z)") {
      return a.name.localeCompare(b.name);
    }
    else if (sortOption === "Name (Z-A)") {
      return b.name.localeCompare(a.name);
    }
    else {
      return 0; // Default case, no sorting
    }
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        {sortedDestinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  destinationCard: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  destinationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  parkName: {
    fontSize: 16,
    marginLeft: 8,
  },
});