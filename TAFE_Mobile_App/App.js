import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider as PaperProvider, IconButton } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
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
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name='Event Details' component={DetailsScreen} options={{headerShown: true}}/>
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
          {/* <Tab.Screen name='Details' component={DetailsScreen} /> */}
          <Tab.Screen name='Settings' component={SettingsScreen} options={{headerShown: false}}/>
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}
