import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ParkList from "../components/parks/ParkList";
import { ParkWithDestination } from "../types/db";

export default function DestinationList() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Parks</Text>
      <ParkList parks={parks} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 12,
    color: "#333",
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
});