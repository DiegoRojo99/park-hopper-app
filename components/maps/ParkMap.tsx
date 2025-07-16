import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LivePark } from "../../types/db";

export default function ParkMap({ park }: { park: LivePark }) {
  const { attractions = [], restaurants = [], shows = [] } = park;

  const allChildren = [
    ...attractions.map((a) => ({ ...a, type: "ATTRACTION" })),
    ...restaurants.map((r) => ({ ...r, type: "RESTAURANT" })),
    ...shows.map((s) => ({ ...s, type: "SHOW" })),
  ];

  const center = {
    latitude: park.latitude || 0,
    longitude: park.longitude || 0,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map} initialRegion={center}>
        {allChildren.filter((item) => item.latitude && item.longitude).map((item) => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.latitude || 0,
              longitude: item.longitude || 0,
            }}
            title={item.name}
            description={item.type}
            pinColor={
              item.type === "ATTRACTION"
                ? "blue"
                : item.type === "RESTAURANT"
                ? "green"
                : "purple"
            }
          />
        ))}
      </MapView>
      <View style={styles.legend}>
        <Text style={styles.legendText}>Legend:</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>          
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "blue" }]} />
            <Text style={styles.legendLabel}>Attraction</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "green" }]} />
            <Text style={styles.legendLabel}>Restaurant</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: "purple" }]} />
            <Text style={styles.legendLabel}>Show</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 0,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width - 32,
    flex: 1,
    borderRadius: 12,
  },
  legend: {
    flexDirection: "column",
    marginTop: 8,
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  legendText: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 14,
  },
});