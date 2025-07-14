import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LiveAttraction } from "../../types/db";
import Octicons from '@expo/vector-icons/Octicons';
import colors from "../../utils/Colors";

export default function LiveAttractionsList({ attractions }: { attractions: LiveAttraction[] | undefined }) {
  
  function sortByWaitTime(a: LiveAttraction, b: LiveAttraction) {
    const waitA = a.liveData?.queue?.STANDBY?.waitTime;
    const waitB = b.liveData?.queue?.STANDBY?.waitTime;
    if(!waitA) return 1; // Treat null as greater than any number
    if(!waitB) return -1; // Treat null as greater than any number
    return waitB - waitA;
  }

  function filterNonApplicableRide(attraction: LiveAttraction) {
    const status = attraction.liveData?.status;
    return status && ["OPERATING", "DOWN", "CLOSED"].includes(status);
  }

  if (!attractions || attractions.length === 0) {
    return <View style={styles.container}><Text>No attractions available</Text></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{...styles.headerText, width: 24}}></Text>
        <Text style={{...styles.headerText, flex: 1}}>Name</Text>
        <Text style={{...styles.headerText, width: 60, textAlign: 'right'}}>Time</Text>
      </View>
      <ScrollView>
        {attractions
          ?.filter(filterNonApplicableRide)
          ?.sort(sortByWaitTime)
          ?.map((attraction, index) => (
            <LiveAttractionRow key={index} attraction={attraction} index={index} />
          ))}
      </ScrollView>
    </View>
  );
}

function LiveAttractionRow({ attraction, index }: { attraction: LiveAttraction, index: number }) {
  const waitingTime = attraction.liveData?.queue?.STANDBY?.waitTime
    ? `${attraction.liveData.queue.STANDBY.waitTime}`
    : "N/A";
  const status = attraction.liveData?.status;
  const statusColor = status === "OPERATING" ? colors.success : status === "CLOSED" ? colors.error : colors.warning;

  return (
    <View style={[styles.attractionItem, { backgroundColor: index % 2 === 1 ? "#f9f9f9" : "#fff" }]}>
      <Octicons name="dot-fill" size={24} color={statusColor} style={styles.statusIcon} />
      <View style={styles.attractionNameContainer}>
        <Text style={styles.attractionName} numberOfLines={1} ellipsizeMode="tail">
          {attraction.name}
        </Text>
      </View>
      <Text style={styles.attractionDescription}>{waitingTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 8,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  attractionItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  statusIcon: {
    marginRight: 8,
  },
  attractionNameContainer: {
    flex: 1, // Ensures the name area grows but doesn’t push others
    marginRight: 12,
  },
  attractionName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  attractionDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
    width: 60,
  },
});
