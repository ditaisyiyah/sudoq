import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Home from './pages/Home'
import Game from './pages/Game'
import Finish from './pages/Finish'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store} >
      <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: 'hotpink',
              },
              headerTintColor: 'white',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold'
              }
            }}>
            <Stack.Screen name='Home' component={Home}
              options={{ 
                title: 'Play Now!',
              }}/>
            <Stack.Screen name='Game' component={Game}
              options={{ 
                title: 'Play',
              }}/>
            <Stack.Screen name='Finish' component={Finish}
              options={{ 
                title: 'Finish',
              }}/>
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
