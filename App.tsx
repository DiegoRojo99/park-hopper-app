import { StyleSheet, View } from 'react-native';
import Explore from './screens/explore';

export default function App() {
  return (
    <View style={styles.container}>
      <Explore />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
