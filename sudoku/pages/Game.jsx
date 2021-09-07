import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getSugokuCreator, solveSugokuCreator, validateSugokuCreator } from '../store/sugoku/action';

const sugokuURL = 'https://sugoku.herokuapp.com'

export default function Game({ navigation, route }) {

  const { name, difficulty } = route.params;

  const dispatch = useDispatch();
  const { board } = useSelector(state => state.sugoku);

  const [playerBoard, setPlayerBoard] = useState([]);

  useEffect(() => {
    dispatch(getSugokuCreator(sugokuURL, difficulty));
  }, [])
  useEffect(() => {
    setPlayerBoard(board);
  }, [board])

  function updateBoard(text, i, j) {
    // console.log('update', text, i, j);
    const newPlayerBoard = JSON.parse(JSON.stringify(playerBoard));
    newPlayerBoard[i][j] = text;
    setPlayerBoard(newPlayerBoard);
  }
  const validateBoard = async () => {
    const statusBoard = await dispatch(validateSugokuCreator(sugokuURL, playerBoard));
    if (statusBoard == 'solved') navigation.navigate('Finish', { name, difficulty });
    else alert('Na-ah! Not solved yet!');
  }
  const solveBoard = async () => {
    const solutionBoard = await dispatch(solveSugokuCreator(sugokuURL));
    setPlayerBoard(solutionBoard);
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
      <View style={styles.board} >
        {playerBoard?.map((row, i) => <View key={i} style={styles.row}>{cell(row, i)}</View>)}
      </View>
      <View style={styleButton().buttons} >
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
  board: {
    backgroundColor: 'hotpink',
    padding: 4,
  },
  row: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});

const styleCell = (i, j, type) => StyleSheet.create({
  cell: {
    height: 40,
    width: 40,
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
  buttons: {
    width: (40 * 9) + 6,
    height: (40 * 2) + 40,
    marginTop: 40,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 40,
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