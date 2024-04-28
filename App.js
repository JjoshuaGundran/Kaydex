import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import data from './idols.json'

const screenWidth = Dimensions.get('window').width;
const boxWidth = (screenWidth - 30) / 2;

function HomeScreen({ navigation }) {
  return (
    <ScrollView style={[styles.container, {padding: 10}]}>
      <View style={styles.optionsContainer}>
        {data.map((data, i) => (
          <TouchableOpacity 
            key={i} 
            style={[styles.boxOption, {width: boxWidth, height: boxWidth}]} 
            onPress={()=>navigation.navigate('Idol', {idolId: i})}
          >
            <Text style={styles.baseText}>{data.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  )
}

function IdolScreen({ route, navigation }) {
  const idolId = route.params.idolId+1
  const idolData = getItemById(idolId)
  const isSoloist = idolData.Solo

  return (
    <View style={styles.container}>
      <View style={styles.idolMainImageContainer}>
        <Image style={styles.idolMainImage} source={renderImages[idolData.image]} />
      </View>

      <ScrollView style={{paddingVertical: 20, paddingHorizontal: 10}}>
        <View style={styles.idolContentContainer}>
          <Text style={[styles.baseText, {fontSize: 25, marginBottom: 10}]}>{idolData.name}</Text>
          {isSoloist ? 
            <Text style={styles.baseText}>Soloist</Text>
          :
          <>
            <Text style={[styles.baseText, {marginBottom: 10}]}>Group: {idolData.Group}</Text>
            <ScrollView style={[styles.optionsContainer, {marginBottom: 10}]} horizontal={true}>
              {data.map((item, i) => (
                item.Group === idolData.Group ? (
                  <TouchableOpacity 
                    key={i}
                    style={[styles.boxOption, {width: boxWidth, height: boxWidth}]} 
                    onPress={()=>navigation.navigate('Idol', {idolId: i})}
                  >
                    <Text style={styles.baseText}>{item.name}</Text>
                  </TouchableOpacity>
                ) : null
              ))}
            </ScrollView>
          </>
          }
        </View>
      </ScrollView>
    </View>
  )
}

const getItemById = (id) => {
  return data.find(item => item.id === id);
}

const renderImages = {
  'chaewon': require('./assets/le-sserafim/chaewon.jpeg'),
  'kazuha': require('./assets/le-sserafim/kazuha.jpg'),
  'sakura': require('./assets/le-sserafim/sakura.jpg'),
  'yunjin': require('./assets/le-sserafim/yunjin.jpg'),
  'eunchae': require('./assets/le-sserafim/eunchae.jpg'),
  'karina': require('./assets/aespa/karina.jpg'),
  'ningning': require('./assets/aespa/ningning.jpg'),
  'winter': require('./assets/aespa/winter.jpg'),
  'giselle': require('./assets/aespa/giselle.jpg')
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
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: { // basic container
    flex: 1,
    backgroundColor: '#212121'
  },
  optionsContainer: { // container of all button options
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingBottom: 40
  },
  boxOption: { // styling for box options
    borderRadius: 8,
    backgroundColor: 'red',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  idolMainImageContainer: { // container for idol page image
    padding: 10,
    height: 250,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  idolMainImage: { // styling for idol page image
    flex: 1,
    width: 250,
    resizeMode: 'contain',
  },
  idolContentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  baseText: {
    color: 'white'
  }
});