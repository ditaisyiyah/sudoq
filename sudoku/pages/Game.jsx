import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getSugokuCreator, solveSugokuCreator, updateSugokuCreator, validateSugokuCreator } from '../store/sugoku/action';

const sugokuURL = 'https://sugoku.herokuapp.com'

export default function Game(){

  const dispatch = useDispatch();
  const { board, status} = useSelector(state => state.sugoku);

  useEffect(()=>{
    dispatch(getSugokuCreator(sugokuURL));
  }, [])

  const cell = (row, i) => {
    return (
      row?.map((col, j) => {
        return (
          col ? (
            <Text key={j} style={styleCell(i, j, 'static').cell}>{col}</Text>
          ) : (
            <TextInput 
              key={j} style={styleCell(i, j, 'dynamic').cell} keyboardType='numeric'
              onChangeText={(text) => dispatch(updateSugokuCreator(+text, i, j))} />
          )
        )
      }
    )
    )
  }

  return (
    <>
      <Text style={styles.gameName} >SUDOQ</Text>
      <Text style={styleStatus(status).status} >{status.toUpperCase()}</Text>
        {
          board?.map((row, i) => {
            return (
              <View key={i} style={styles.row}>
                {cell(row, i)}
              </View>
              )
            })
          }
        <View style={styles.buttons} >
          <Button 
            title="Validate" style={styles.buttonValidate}
            onPress={() => dispatch(validateSugokuCreator(sugokuURL))}
            />
          <Button 
            title="Solve" style={styles.buttonSolve}
            onPress={() => dispatch(solveSugokuCreator(sugokuURL))}
            />
        </View>
    </>
  )
}

const styleStatus = (status) => StyleSheet.create({
  status: {
    height: 30,
    fontSize: 20,
    fontWeight: '600',
    color: status=='unsolved'? 'red' : 'green'
  },
})

const styleCell = (i, j, type) => StyleSheet.create({
  cell: {
    height: 40,
    width: 40,
    color: type=='static'? 'black' : 'hotpink',
    fontSize: 20,
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: i==2 || i == 5 ? 3 : 0,
    marginRight: j==2 || j == 5 ? 3 : 0,
  },
})

const styles = StyleSheet.create({
  gameName: {
    color: 'hotpink',
    fontWeight: '800',
    fontSize: 50,
    marginBottom: 20,
  },
  row: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  buttons: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  buttonValidate: {
    color: 'hotpink',
    fontWeight: '500',
  },
});