import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { DestinationWithParks, ParkWithDestination } from "../../types/db";
import DestinationCard from "../destinations/DestinationCard";

export default function ParkList() {
  const [parks, setParks] = useState<ParkWithDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParks = async () => {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL!;
      if (!apiUrl) {
        setError('API URL is not defined');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${apiUrl}/api/parks`);
        if (!response.ok) {
          throw new Error('Failed to fetch parks');
        }
        const data = await response.json();
        setParks(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchParks();
  }, []);

  if (loading) return <View style={styles.container}><Text>Loading...</Text></View>;
  if (error) return <View style={styles.container}><Text>Error: {error}</Text></View>;

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

  const sortedDestinations = grouped.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

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