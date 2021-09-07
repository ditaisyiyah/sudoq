import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function Finish({ navigation, route }){

  const { name, difficulty } = route.params;

  return (
    <View style={styles.container} >
      <Text style={styles.greet} >Congratulation, {name}!</Text>
      <Pressable 
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Play again</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 1,
  },
  greet: {
    color: 'hotpink',
    fontWeight: '800',
    fontSize: 50,
    marginBottom: 20,
  },
  button: {
    width: 150,
    height: 40, 
    backgroundColor: 'hotpink',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
})