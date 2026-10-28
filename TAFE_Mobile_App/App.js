import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#6200ee' },
        headerTintColor: '#fff'
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name='Details' component={DetailsScreen} options={{headerShown: true}}/>
    </Stack.Navigator>
  );
}

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
          <Tab.Screen name='Home' component={HomeStack} options={{headerShown: false}} />
          {/* <Tab.Screen name='Details' component={DetailsScreen} /> */}
          <Tab.Screen name='Settings' component={SettingsScreen} options={{headerShown: false}}/>
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
