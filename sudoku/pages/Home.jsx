import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Home({ navigation }){

  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [valError, setValError] = useState([]);

  const goPlay = () => {
    const errors = [];
    if(name && difficulty){
      navigation.navigate('Game', { name, difficulty });
      setName('');
      setDifficulty('');
      setValError([]);
    }else{
      if(!name) errors.push(`Input you name`);
      if(!difficulty) errors.push(`Choose difficulty`);
      setValError(errors);
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
          onChangeText={(text) => setName(text)}/>
        <Picker
          selectedValue={difficulty}
          style={styles.options} mode="dialog"
          onValueChange={(value) => setDifficulty(value)}>
          <Picker.Item style={styles.selected} label="LEVEL" enabled={false} />
          <Picker.Item style={styles.option} label="EASY" value="easy" />
          <Picker.Item style={styles.option} label="MIDDLE" value="medium" />
          <Picker.Item style={styles.option} label="HARD" value="hard" />
        </Picker>
        <Pressable 
          style={styles.button} 
          onPress={() => goPlay()}>
          <Text style={styles.buttonText}>PLAY</Text>
        </Pressable>
        {
          valError.length > 0 && valError.map((err, i) => {
            return <Text key={i} style={styles.error} >{err}</Text>
          })
        }
      </View>
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
  texts: {
    paddingTop: 80,
    paddingBottom: 60,
    flex: 1
  },
  userInput: {
    flex: 3
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
    width: 180,
    height: 45,
    fontSize: 27,
    backgroundColor: '#383539',
    color: 'hotpink',
    textAlign: 'center',
  },
  options: {
    width: 180,
    height: 45, 
    marginTop: 10,
    backgroundColor: '#383539',
    color: 'hotpink',
    textAlign: 'center'
  },
  selected: {
    fontSize: 22,
  },
  option: {
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: 'hotpink',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 22,
  },
  button: {
    width: 180,
    height: 45, 
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
  error: {
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
    // color: '#383539',
    color: 'red',
  }
})