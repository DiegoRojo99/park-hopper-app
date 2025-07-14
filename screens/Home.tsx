import { Text, View, StyleSheet, Pressable } from "react-native";
import colors from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleGetStarted = () => {
    navigation.navigate("Explore");
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Park Hopper</Text>
      <Text style={styles.text}>
        Discover, plan, and enjoy your next park adventure. Find the best parks, track your visits, and share your experiences!
      </Text>
      <View style={{ marginTop: 20 }}>
        <Pressable style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  text: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: colors.light.primary,
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
});