import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DestinationList from "../components/destinations/DestinationList";
import { ParkWithDestination } from "../types/db";
import SearchBar from "../components/utils/SearchBar";
import Ionicons from '@expo/vector-icons/Ionicons';
import ParkFilterModal from "../components/utils/modals/ParkFilterModal";
import { SortOption } from "../types/navigation";

export default function ExplorePage() {
  const [parks, setParks] = useState<ParkWithDestination[]>([]);
  const [filteredParks, setFilteredParks] = useState<ParkWithDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>("Number of Parks");

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
    <>
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Parks</Text>
        <View>
          <Ionicons name="filter-circle" size={32} color="black" onPress={() => setIsFilterModalVisible(true)} />
        </View>
      </View>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        customStyle={styles.searchBarStyle}
      />
      <DestinationList parks={filteredParks} sortOption={sortOption} />
    </View>
    <ParkFilterModal
      isVisible={isFilterModalVisible}
      onClose={() => setIsFilterModalVisible(false)}
      sortOption={sortOption}
      setSortOption={setSortOption}
    />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 16,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
    flex: 1,
  },
  text: {
    fontSize: 18,
    color: "#333",
  },
  searchBarStyle: {
    marginHorizontal: 16,
  },
});