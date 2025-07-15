import { View, ScrollView, StyleSheet, Text } from "react-native";
import { LiveShow, ShowTimes } from "../../types/db";

export default function LiveShows({ shows }: { shows?: LiveShow[] }) {
  if (!shows?.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>No Live Shows Available</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 6, paddingTop: 8 }}>
        {shows.map((show, index) => (
          <LiveShowCard key={index} show={show} />
        ))}
      </ScrollView>
    </View>
  );
}

function LiveShowCard({ show }: { show: LiveShow }) {
  return (
    <View style={styles.showItem}>
      <Text style={styles.showTitle} numberOfLines={2} ellipsizeMode="tail">{show.name}</Text>
      {show.liveData?.showtimes?.length ? (
        <LiveShowTimes showtimes={show.liveData.showtimes} timezone={show.timezone} />
      ) : (
        <Text style={{...styles.showTimeContainer, textAlign: 'center'}}>No showtimes available</Text>
      )}
    </View>
  );
}

function LiveShowTimes({ showtimes, timezone }: { showtimes: ShowTimes[], timezone: string | undefined }) {
  function formatTime(dateTime: string): string {
    const date = new Date(dateTime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: timezone });
  }

  function formatShowTime(showtime: ShowTimes): string {
    const start = formatTime(showtime.startTime);
    const end = formatTime(showtime.endTime);
    if (start === end) return start;
    return `${start} - ${end}`;
  }

  return (
    <View style={styles.showTimeContainer}>
      {showtimes.map((showtime, index) => (
        <View key={index} style={styles.showTime}>
          <Text style={styles.contentText}>
            {formatShowTime(showtime)}
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
  contentText: {
    fontSize: 16,
    color: "#666",
  },
  showItem: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 0 }, // shadow to the right
    shadowOpacity: 0.1,
    shadowRadius: 10.41,
    elevation: 3,
  },
  showTitle: {
    fontSize: 14,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 8,
    marginBottom: 8,
    textAlign: "center",
  },
  showTimeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  showTime: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 4,
    borderRadius: 8,
  },
});