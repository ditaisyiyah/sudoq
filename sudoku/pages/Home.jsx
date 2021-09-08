import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home({ navigation }) {

  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [valError, setValError] = useState('');

  const goPlay = () => {
    if (!name || !difficulty)
      setValError('Please input your name and/or choose the difficulty');
    if (name && difficulty) {
      navigation.navigate('Game', { name, difficulty });
      setName('');
      setDifficulty('');
      setValError('');
    }
  }

  return (
    <View style={styles.container} >
      <View style={styles.texts}>
        <Text style={styles.gameName} >SUDOQ</Text>
        <Text style={styles.power} >powered by SUGOKU</Text>
      </View>
      <View style={styles.userInput}>
        <TextInput
          value={name} style={styles.userName}
          placeholder="Your Name" placeholderTextColor='gray'
          maxLength={10}
          onChangeText={(text) => setName(text)} />
        <Picker
          selectedValue={difficulty}
          style={styles.options} mode="dialog"
          onValueChange={(value) => setDifficulty(value)}>
          <Picker.Item style={styles.selected} label="Select Difficulty" enabled={false} />
          <Picker.Item style={styles.option} label="Easy" value="easy" />
          <Picker.Item style={styles.option} label="Middle" value="medium" />
          <Picker.Item style={styles.option} label="Hard" value="hard" />
        </Picker>
        <Pressable
          style={styles.button}
          onPress={() => goPlay()}>
          <Text style={styles.buttonText}>PLAY</Text>
        </Pressable>
      </View>
      <Text style={styles.error} >{valError}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  texts: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInput: {
    flex: 2,
    paddingTop: '15%',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '5%'
  },
  error: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center'
  },
  gameName: {
    color: 'hotpink',
    fontWeight: 'bold',
    fontSize: 70,
  },
  power: {
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center'
  },
  userName: {
    width: '45%',
    height: 40,
    fontSize: 24,
    backgroundColor: '#383539',
    color: 'hotpink',
    textAlign: 'center',
  },
  options: {
    width: '45%',
    height: 40,
    marginTop: '2%',
    backgroundColor: '#383539',
    color: 'hotpink',
    textAlign: 'center'
  },
  selected: {
    fontSize: 24,
    color: 'hotpink',
  },
  option: {
    // BUG: doesn't work
    backgroundColor: 'hotpink',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 30,
  },
  button: {
    width: '45%',
    height: 40,
    backgroundColor: 'hotpink',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '8%',
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
})