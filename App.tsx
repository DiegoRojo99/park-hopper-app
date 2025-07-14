import Explore from './screens/Explore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import ParkDetails from './screens/ParkDetails';

const Stack = createNativeStackNavigator();
const commonScreenOptions = {
  headerShown: false,
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={commonScreenOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Explore" component={Explore} />
        <Stack.Screen name="ParkDetails" component={ParkDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
