import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ParkWithDestination } from "../../types/db";

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
  const grouped = parks.reduce<Record<string, ParkWithDestination[]>>((acc, park) => {
    const destName = park.destination?.name || 'Unknown';
    if (!acc[destName]) acc[destName] = [];
    acc[destName].push(park);
    return acc;
  }, {});

  const sortedDestinations = Object.entries(grouped).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Park List</Text>
      <ScrollView>
        {sortedDestinations.map(([destName, parks]) => (
          <View key={destName} style={styles.destinationCard}>
            <Text style={styles.destinationTitle}>{destName}</Text>
            {parks.map(park => (
              <Text key={park.id} style={styles.parkName}>{park.name}</Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
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