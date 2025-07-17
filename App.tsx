import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Explore from './screens/Explore';
import ParkDetails from './screens/ParkDetails';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from './utils/Colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

const Stack = createNativeStackNavigator();
const commonScreenOptions = {
  headerStyle: {
    backgroundColor: colors.light.primary,
  },
  headerTintColor: colors.white,
};

const BottomTabs = createBottomTabNavigator();
const TabScreenOptions = {
  headerShown: false,
  tabBarInactiveTintColor: colors.light.accent,
  tabBarActiveTintColor: '#ffffff',
  tabBarStyle: {
    backgroundColor: colors.light.primary,
    marginBottom: 0,
    paddingTop: 5,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10, 
  },
};

function ExploreStack() {
  return (
    <Stack.Navigator screenOptions={commonScreenOptions}>
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="ParkDetails" component={ParkDetails} options={{ title: '' }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomTabs.Navigator screenOptions={TabScreenOptions}>
          <BottomTabs.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <BottomTabs.Screen 
            name="ExploreStack"
            component={ExploreStack}
            options={{
              title: 'Explore',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="search" size={size} color={color} />
              ),
            }}
          />
          </BottomTabs.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
