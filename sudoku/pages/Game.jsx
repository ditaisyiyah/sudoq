import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions } from 'react-native';
import CountDown from 'react-native-countdown-component';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSugokuCreator, solveSugokuCreator, validateSugokuCreator } from '../store/sugoku/action';
import { setPlayer } from '../store/players/action';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const sugokuURL = 'https://sugoku.herokuapp.com'

export default function Game({ navigation, route }) {

  const { name, difficulty } = route.params;

  const dispatch = useDispatch();
  const { board } = useSelector(state => state.sugoku);

  const [playerBoard, setPlayerBoard] = useState([]);
  const [cheat, setCheat] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    dispatch(getSugokuCreator(sugokuURL, difficulty));
  }, [])
  useEffect(() => {
    setPlayerBoard(board);
  }, [board])

  async function forceFinish() {
    alert("TIME'S UP!!");
    const statusBoard = await dispatch(validateSugokuCreator(sugokuURL, playerBoard));
    dispatch(setPlayer({ name, difficulty, cheat, duration, statusBoard }));
    navigation.navigate('Finish', { name, statusBoard });
    setCheat(false);
  }
  function updateBoard(text, i, j) {
    // console.log('update', text, i, j);
    const newPlayerBoard = JSON.parse(JSON.stringify(playerBoard));
    newPlayerBoard[i][j] = text;
    setPlayerBoard(newPlayerBoard);
  }
  const validateBoard = async () => {
    const statusBoard = await dispatch(validateSugokuCreator(sugokuURL, playerBoard));
    if (statusBoard == 'solved') {
      dispatch(setPlayer({ name, difficulty, cheat, duration, statusBoard }));
      navigation.navigate('Finish', { name, statusBoard });
      setCheat(false);
    }
    else alert('Na-ah! Not solved yet!');
  }
  const solveBoard = async () => {
    const solutionBoard = await dispatch(solveSugokuCreator(sugokuURL));
    setPlayerBoard(solutionBoard);
    setCheat(true)
  }

  const cell = (row, i) => {
    return row?.map((col, j) => (
      <TextInput
        key={j}
        keyboardType='numeric' maxLength={1}
        onChangeText={(text) => updateBoard(+text, i, j)}
        style={board[i][j] ? styleCell(i, j, 'static').cell : styleCell(i, j, 'dynamic').cell}
        editable={!board[i][j] ? true : false}
        value={col ? `${col}` : ''}
      />
    ))
  }
  return (
    <View style={styles.container} >
      <CountDown
        until={
          difficulty === "easy" ? 15 * 60 :
            difficulty === "medium" ? 45 * 60 :
              75 * 60
        }
        onChange={(time) => {
          console.log(time)
          setDuration(duration + 1)
        }}
        onFinish={() => forceFinish()}
        size={windowWidth / 20}
        style={{ marginVertical: '5%' }}
        timeToShow={['H', 'M', 'S']}
        timeLabels={{ h: null, m: null, s: null }}
        digitStyle={{ backgroundColor: '#fac000' }}
        digitTxtStyle={{ color: '#383539' }}
      />
      <View style={styles.board} >
        {playerBoard?.map((row, i) => <View key={i} style={styles.row}>{cell(row, i)}</View>)}
      </View>
      <Pressable
        style={styleButton('validate').button}
        onPress={() => validateBoard()}>
        <Text style={styleButton('validate').text}>VALIDATE</Text>
      </Pressable>
      <Pressable
        style={styleButton('solve').button}
        onPress={() => solveBoard()}>
        <Text style={styleButton('solve').text}>SOLVE ?</Text>
      </Pressable>
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
    justifyContent: 'center',
  },
  board: {
    backgroundColor: 'hotpink',
    padding: '1%',
  },
  row: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});

const styleCell = (i, j, type) => StyleSheet.create({
  cell: {
    height: windowWidth / 10,
    width: windowWidth / 10,
    color: type == 'static' ? 'black' : 'hotpink',
    fontSize: 20,
    textAlign: 'center',
    borderColor: 'hotpink',
    borderWidth: 1,
    borderBottomWidth: i == 2 || i == 5 ? 3 : 0,
    borderRightWidth: j == 2 || j == 5 ? 3 : 0,
  },
})

const styleButton = (type) => StyleSheet.create({
  button: {
    width: '33%',
    height: windowWidth / 10,
    marginBottom: '5%',
    marginTop: type == 'validate' ? '5%' : 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: type == 'solve' ? '#383539' : 'hotpink',
  },
  text: {
    fontSize: 20,
    color: type == 'solve' ? 'hotpink' : 'white',
    fontWeight: 'bold'
  }
})