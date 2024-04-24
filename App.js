import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import data from './idols.json'

function HomeScreen({ navigation }) {
  const screenWidth = Dimensions.get('window').width;
  const boxWidth = (screenWidth - 30) / 2;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.optionsContainer}>
        {data.map((data, i) => (
          <TouchableOpacity key={i} style={[styles.boxOption, {width: boxWidth, height: boxWidth}]} onPress={()=>navigation.navigate('Idol', {idolId: i})}>
            <Text style={styles.baseText}>{data.firstName}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

function IdolScreen({ route }) {
  const idolId = route.params.idolId+1

  const getItemById = (id) => {
    return data.find(item => item.id === id);
  }

  const idolData = getItemById(idolId)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.idolContainer}>
      </View>
      <Text style={styles.baseText}>{idolData.firstName}</Text>
    </ScrollView>
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
          name='Idol'
          component={IdolScreen}
          options={{
            title: 'Idol',
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
    backgroundColor: '#212121'
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingBottom: 40
  },
  boxOption: {
    borderRadius: 8,
    backgroundColor: 'blue',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  idolContainer: {
    backgroundColor: 'red'
  },
  baseText: {
    color: 'white'
  }
});