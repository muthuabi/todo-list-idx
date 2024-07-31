import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
// Screen component
import ToDo from './components/ToDo';
import AppInfo from './components/AppInfo';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarStyle:{
          paddingVertical:5,
        },
        tabBarLabelStyle:{
          fontSize:11,
          paddingBottom:5,
        }
      }}>
      
        <Tab.Screen
          name="Tasks"
          component={ToDo}
          options={{ headerShown: false,
          tabBarIcon:({color,size})=>(<Icon name='tasks' color={color} size={size} />)
           }}
        />
         <Tab.Screen
          name="App Info"
          component={AppInfo}          
          options={{ 
            tabBarLabel: 'App Info',
            tabBarIcon:({color,size})=>(<Icon name='info' color={color} size={size} />)
           }}
        />
       
      </Tab.Navigator>
    </NavigationContainer>
  );
}