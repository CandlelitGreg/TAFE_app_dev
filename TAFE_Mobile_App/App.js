import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider as PaperProvider, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import EventsScreen from './screens/EventsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={( {navigation} ) => ({
        headerRight: () => (
          <IconButton
            type='button'
            icon='cog'
            size={24}
            onPress={() => navigation.navigate('Settings')}
            style={{position: 'absolute', top: '6px', right: '10px'}}
          />
        ),
        headerStyle: { backgroundColor: '#3CA6E5' },
        headerTintColor: '#fff'
      })}
    >
      <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name='Event Details' component={DetailsScreen} options={{headerShown: true}}/>
      <Stack.Screen name='Events' component={EventsScreen} options={{headerShown: true}}/>
      <Stack.Screen name='Settings' component={SettingsScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#3CA6E5',
            tabBarInactiveTintColor: '#999',
            headerStyle: { backgroundColor: '#3CA6E5' },
            headerTintColor: '#fff'
          }}
        >
          <Tab.Screen name='Home' component={HomeStack} options={{headerShown: false}} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
