import React, { useEffect, useState } from 'react';
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

  return (
    <>
      <View style={styles.container}>
      <Text style={styles.gameName} >SUDOQ</Text>
      <Text style={styles.status} >{status ? status: ''}</Text>
        {
          board?.map((row, i) => {
            return (
              <View key={i} style={styles.row}>
                {
                  row?.map((col, j) => {
                    return (
                      board[i][j] ? (
                        <Text key={j} style={styles.staticCell}>{col}</Text>
                      ) : (
                        <TextInput 
                          key={j} style={styles.dynamicCell} keyboardType='numeric'
                          onChangeText={(text) => dispatch(updateSugokuCreator(+text, i, j))} />
                      )
                    )
                  })
                }
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
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40*9,
    width: 40*9,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameName: {
    color: 'hotpink',
    fontWeight: 'bolder',
    fontSize: 50,
    marginBottom: 30,
  },
  status: {
    fontSize: 20,
  },
  row: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderColor: 'black',
    borderWidth: 1,
    margin: 1,
  },
  staticCell: {
    height: 40,
    width: 40,
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 1
  },
  dynamicCell: {
    height: 40,
    width: 40,
    textAlign: 'center',
    borderColor: 'black',
    borderWidth: 1
  },
  buttons: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  // buttonValidate: {
  //   color: 'hotpink',
  //   fontWeight: 'bold',
  // },
  // buttonSolve: {
  //   backgroundColor: 'hotpink',
  //   fontWeight: 'bold',
  // }
});