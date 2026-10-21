// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#6200ee',
            tabBarInactiveTintColor: '#999',
            headerStyle: { backgroundColor: '#6200ee' },
            headerTintColor: '#fff',
          }}
        >
          <Tab.Screen name='Home' component={HomeScreen} />
          <Tab.Screen name='Details' component={DetailsScreen} />
          <Tab.Screen name='Settings' component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
