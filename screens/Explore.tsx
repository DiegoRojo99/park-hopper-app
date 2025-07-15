import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DestinationList from "../components/destinations/DestinationList";
import { ParkWithDestination } from "../types/db";
import SearchBar from "../components/utils/SearchBar";

export default function ExplorePage() {
  const [parks, setParks] = useState<ParkWithDestination[]>([]);
  const [filteredParks, setFilteredParks] = useState<ParkWithDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
        setFilteredParks(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchParks();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = parks.filter(park =>
        park.name.toLowerCase().includes(lowerCaseQuery) ||
        park.destination.name.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredParks(filtered);
    } 
    else {
      setFilteredParks(parks);
    }
  }, [searchQuery, parks]);

  if (loading) return <View style={styles.container}><Text>Loading...</Text></View>;
  if (error) return <View style={styles.container}><Text>Error: {error}</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Parks</Text>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        customStyle={styles.searchBarStyle}
      />
      <DestinationList parks={filteredParks} />
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
  searchBarStyle: {
    marginHorizontal: 16,
  },
});