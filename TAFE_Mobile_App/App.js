import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider as PaperProvider, IconButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';


import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import EventsScreen from './screens/EventsScreen';
import RegisterScreen from './screens/RegisterScreen';
import { SettingsProvider } from './contexts/SettingsContext';
import RegConfScreen from './screens/RegConfScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const EVENT_FETCH_URL = 'https://raw.githubusercontent.com/CandlelitGreg/TAFE_app_dev/refs/heads/main/TAFE_Mobile_App/events.json';

const date = new Date();
export const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;


export const CHIP_DATA = [
    { id: '0', name: 'Today' },
    { id: '1', name: 'Athletics' },
    { id: '2', name: 'Fitness' },
    { id: '3', name: 'Music' },
    { id: '4', name: 'Social' },
    { id: '5', name: 'Outdoors' },
    { id: '6', name: 'Family' },
    { id: '7', name: 'Community'},
    { id: '8', name: 'Arts & Crafts'},
    { id: '9', name: 'Education'},
]


export const fetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetch(EVENT_FETCH_URL)
          .then((response) => response.json())
          .then((data) => {
              setTimeout(() => {
                  setEvents(data);
                  setLoading(false);
              }, 3000);     
          });
  }, []);//Check for error

  const MOCKITEMS = events.map((event) => ({
  ...event,
  tags:
    event.date === today 
      ? Array.from(new Set(['0', ...event.tags]))
      : event.tags.filter((tag) => tag !== '0'),
}));

  return { MOCKITEMS, loading };
}


function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3CA6E5' },
        headerTintColor: '#ffffff'
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name='Confirmation' component={RegConfScreen} options={{headerShown: false}}/>
      <Stack.Screen name='Event Details' component={DetailsScreen} options={( {navigation} ) => ({headerRight: () => 
          (
          <IconButton
            type='button'
            icon='cog'
            size={24}
            onPress={() => navigation.navigate('Settings')}
            style={{position: 'absolute', top: '6px', right: '10px'}}
          />
        ), headerShown: true})}/>
      <Stack.Screen name='Events' component={EventsScreen} options={( {navigation} ) => ({headerRight: () => 
          (
          <IconButton
            type='button'
            icon='cog'
            size={24}
            onPress={() => navigation.navigate('Settings')}
            style={{position: 'absolute', top: '6px', right: '10px'}}
          />
        ), headerShown: true})}/>
      <Stack.Screen name='Settings' component={SettingsScreen} options={{headerShown: true}}/>
      <Stack.Screen name='Register' component={RegisterScreen} options={( {navigation} ) => ({headerRight: () => 
          (
          <IconButton
            type='button'
            icon='cog'
            size={24}
            onPress={() => navigation.navigate('Settings')}
            style={{position: 'absolute', top: '6px', right: '10px'}}
          />
        ), headerShown: true})}/>
    </Stack.Navigator>
  );
}

export default function App() {
  const [settings, setSettings] = useState([]);

  const editSettings = (setting) => {
    setSettings((prevSelected) => {
      if (prevSelected.includes(setting)) {
        return prevSelected.filter((item) => item !== setting);
      } else {
        return [...prevSelected, setting];
      }
    });   
  };



  return (
    <SettingsProvider>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#3CA6E5',
              tabBarInactiveTintColor: '#999',
              headerStyle: { backgroundColor: '#3CA6E5' },
              headerTintColor: '#ffffff'
            }}
          >
            <Tab.Screen name='Home' component={HomeStack} options={{headerShown: false}} />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SettingsProvider>
  )
}
