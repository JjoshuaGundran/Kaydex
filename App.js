import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  StatusBar
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

function HomeScreen({ navigation }) {
  const lists = [1,2,3,4,5,6]

  return (
    <View style={styles.container}>
      {lists.map((item) => (
        <TouchableOpacity key={item} style={styles.optionContainer} onPress={()=>navigation.navigate('About', {idolId: item})}>
          <Text style={styles.baseText}>One Thing</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

function AboutScreen({ route }) {
  const idolId = JSON.stringify(route.params.idolId)

  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>{idolId}</Text>
    </View>
  )
}

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'Kaydex',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff'
          }}
        />
        <Stack.Screen
          name='About'
          component={AboutScreen}
          options={{
            title: 'About',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    maxWidth: '100%',
    gap: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    backgroundColor: '#212121',
  },
  baseText: {
    color: 'white'
  },
  optionContainer: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
    borderRadius: 5,
  }
});