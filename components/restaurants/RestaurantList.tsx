import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Restaurant } from "../../types/db";

export default function RestaurantList({ restaurants }: { restaurants?: Restaurant[] }) {
  if (!restaurants?.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>No Restaurants Available</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 6, paddingTop: 8 }}>
        {restaurants.map((restaurant, index) => (
          <RestaurantCard key={index} restaurant={restaurant} />
        ))}
      </ScrollView>
    </View>
  );
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <View style={styles.restaurantItem}>
      <Text style={styles.restaurantName} numberOfLines={2} ellipsizeMode="tail">{restaurant.name}</Text>
      {restaurant.cuisines?.length ? (
        <RestaurantCuisines cuisines={restaurant.cuisines} />
      ) : (
        <Text style={{textAlign: 'center'}}>No cuisines available</Text>
      )}
    </View>
  );
}

function RestaurantCuisines({ cuisines }: { cuisines: string[] }) {
  return (
    <View style={styles.cuisineContainer}>
      {cuisines.map((cuisine, index) => (
        <View key={index} style={{ padding: 6, backgroundColor: "#f0f0f0", borderRadius: 4 }}>
          <Text style={styles.cuisineText}>
            {cuisine}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  restaurantItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 8,
    paddingBottom: 4,
    textAlign: "center",
  },
  cuisineContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  cuisineText: {
    fontSize: 14,
    color: "#666",
  },
});