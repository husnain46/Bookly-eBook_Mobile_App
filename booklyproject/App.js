import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Home from './screens/Home'
import Search from './screens/Search'
import BookDetail from './screens/BookDetail'

const Stack = createStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false
          }
        }>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Search"
          component={Search}
        />
        <Stack.Screen
          name="BookDetail"
          component={BookDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
