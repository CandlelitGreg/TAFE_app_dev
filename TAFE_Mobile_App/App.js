import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider as PaperProvider, IconButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import EventsScreen from './screens/EventsScreen';
import RegisterScreen from './screens/RegisterScreen';
import { SettingsProvider } from './contexts/SettingsContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const date = new Date();
export const today = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;


const UncheckedMOCKITEMS = [
    {
        id: '1',
        title: 'Random book',
        description: 'random book desc',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['4']
    },
    {
        id: '2',
        title: 'Different book',
        description: 'this book is totally not random',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['5']
    },
    {
        id: '3',
        title: 'Kindle',
        description: 'gave up on books pretty quickly',
        location: 'Community Hall',
        date: '11/11/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['2']
    },
    {
        id: '4',
        title: 'Random book',
        description: 'random book desc',
        location: 'Community Hall',
        date: '11/11/2026',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['3']
    },
    {
        id: '5',
        title: 'Different book',
        description: 'this book is totally not random',
        location: 'Community Hall',
        date: '12/11/2026',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['2']
    },
    {
        id: '6',
        title: 'Kindle',
        description: 'gave up on books pretty quickly',
        location: 'Community Hall',
        date: '11/11/2026',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['1', '4', '5']
    },
    {
        id: '7',
        title: 'Different book',
        description: 'this book is totally not random',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['2']
    },
    {
        id: '8',
        title: 'Kindle',
        description: 'gave up on books pretty quickly',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['4', '6']
    }
]

export const MOCKITEMS = UncheckedMOCKITEMS.map((event) => ({
  ...event,
  tags:
    event.date === today 
      ? Array.from(new Set(['0', ...event.tags]))
      : event.tags.filter((tag) => tag !== '0'),
}));


export const CHIP_DATA = [
    { id: '0', name: 'Today' },
    { id: '1', name: 'Athletics' },
    { id: '2', name: 'Fitness' },
    { id: '3', name: 'Music' },
    { id: '4', name: 'Social' },
    { id: '5', name: 'Outdoors' },
    { id: '6', name: 'Family' }
]



function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3CA6E5' },
        headerTintColor: '#ffffff'
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
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
