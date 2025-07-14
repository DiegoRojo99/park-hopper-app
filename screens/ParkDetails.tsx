import { View, Text, StyleSheet } from "react-native";
import { LivePark } from "../types/db";
import { useEffect, useState } from "react";
import ParkChildrenTab from "../components/tabs/ChildrenTab";
import LiveAttractionsList from "../components/attractions/LiveAttractionsList";
import LiveShows from "../components/shows/LiveShows";
import RestaurantList from "../components/restaurants/RestaurantList";

export default function ParkDetails({ route, navigation }: { route: any, navigation: any }) {
  const { parkId } = route.params;
  const [park, setPark] = useState<LivePark | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Attractions");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL!;
    if (!apiUrl) {
      setError("API URL is not defined");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    if (!parkId) {
      setError("Park ID is not provided");
      setLoading(false);
      return;
    }

    fetch(`${apiUrl}/api/parks/${parkId}/live`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch park details");
        return res.json();
      })
      .then((data) => setPark(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

  }, [parkId]);

  if (loading) return <View style={styles.container}><Text>Loading...</Text></View>;
  if (error) return <View style={styles.container}><Text>Error: {error}</Text></View>;
  if (!park) return <View style={styles.container}><Text>No park data available</Text></View>;

  return (
    <View style={styles.container}>
      {/* Park Details */}
      <View style={{ padding: 16, alignItems: "center" }}>
        <Text style={styles.title}>{park.name}</Text>
        <Text style={styles.description}>{park.destination.name}</Text>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ParkChildrenTab activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {activeTab === "Attractions" && <LiveAttractionsList attractions={park.attractions} />}
        {activeTab === "Shows" && <LiveShows shows={park.shows} />}
        {activeTab === "Restaurants" && <RestaurantList restaurants={park.restaurants} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 32,
    marginBottom: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 32,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
  tabContainer: {
    flex: 1,
  },
  tabContent: {
    flex: 6,
    paddingHorizontal: 16,
    width: "100%",
  },
});
  
