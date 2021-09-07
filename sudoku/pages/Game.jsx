import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { 
  cleanSugokuCreator, 
  getSugokuCreator, 
  solveSugokuCreator, 
  updateSugokuCreator, 
  validateSugokuCreator 
} from '../store/sugoku/action';

const sugokuURL = 'https://sugoku.herokuapp.com'

export default function Game({ navigation, route }){

  const { name, difficulty } = route.params;

  const dispatch = useDispatch();
  const { board, status } = useSelector(state => state.sugoku);

  const [playerBoard, setPlayerBoard] = useState([])

  useEffect(()=>{
    dispatch(getSugokuCreator(sugokuURL, difficulty));
    console.log('useeffect get init board')
  }, [])
  
  useEffect(()=>{
    setPlayerBoard(board);
  }, [board])

  function updateBoard(text, i, j){
    console.log('update', text, i, j);
    const newPlayerBoard = JSON.parse(JSON.stringify(playerBoard));
    newPlayerBoard[i][j] = text;
    setPlayerBoard(newPlayerBoard);
    console.log('diupdate',playerBoard)
  }

  const validateBoard = () => {
    dispatch(validateSugokuCreator(sugokuURL, playerBoard));
    console.log(status)
    if(status=='solved') {
      navigation.navigate('Finish', { name, difficulty });
    }
  }

  const solveBoard = async () => {
    const solutionBoard = await dispatch(solveSugokuCreator(sugokuURL));
    setPlayerBoard(solutionBoard);
  }

  const cell = (row, i) => {
    return (
      row?.map((col, j) => {
        return (
          <TextInput 
            key={j} style={col? styleCell(i, j, 'static').cell : styleCell(i, j, 'dynamic').cell} 
            keyboardType='numeric' maxLength={1}
            onChangeText={(text) => updateBoard(+text, i, j)}
            value={col? col : ''}
            editable={!board[i][j]? true : false}
          />
        )
      }
    )
    )
  }

  return (
    <View style={styles.container} >
      <Text style={styles.status}>
        {status=='unsolved'? 'Na-ah! not solved yet!' : ''}
      </Text>
      <View style={styles.board} >
        {
          playerBoard?.map((row, i) => {
            return (
              <View key={i} style={styles.row}>
                {cell(row, i)}
              </View>
            )
          })
        }
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
  status: {
    height: 30,
    fontSize: 20,
    fontWeight: '600',
    color: 'red',
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
    // TODO FIXME static text nya di pusat sel
    height: 40,
    width: 40,
    color: type=='static'? 'black' : 'hotpink',
    fontSize: 20,
    textAlign: 'center',
    borderColor: 'hotpink',
    borderWidth: 1,
    borderBottomWidth: i==2 || i==5 ? 3 : 0,
    borderRightWidth: j==2 || j==5 ? 3 : 0,
  },
})

const styleButton = (type) => StyleSheet.create({
  buttons: {
    width: (40*9)+6,
    height: (40*2)+40,
    marginTop: 40,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 40, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: type=='solve'? '#383539' : 'hotpink',
  },
  text: {
    fontSize: 20,
    color: type=='solve'? 'hotpink' : 'white',
    fontWeight: 'bold'
  }
})