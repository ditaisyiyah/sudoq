import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Finish({ navigation, route }) {

  const { name, statusBoard } = route.params;

  const { players } = useSelector(state => state.players);

  function sortedPlayers() {
    for (let i = 0; i < players.length - 1; i++) {
      let min = i;
      for (var j = i + 1; j < players.length; j++) {
        if (players[j].duration < players[min].duration)
          min = j;
      }
      if (min != i) {
        let target = players[i];
        players[i] = players[min];
        players[min] = target;
      }
    }
    return players
  }

  return (
    <View style={styles.container} >
      <Text style={styles.greet} >
        {statusBoard == 'solved' ? 'You win,' : 'You lose,'} {name}!
      </Text>
      <Text style={styles.title} >Leaderboard</Text>
      {
        sortedPlayers().map((player, i) => {
          return (
            <View key={i} style={styles.leaderboard} >
              <Text style={styles.name}>{player.name}</Text>
              <Text style={styles.duration}>{player.duration} s</Text>
            </View>
          )
        })
      }
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Play Again</Text>
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
    borderColor: 'red',
    borderWidth: 1,
  },
  title: {
    fontSize: 28,
    color: 'hotpink',
    fontWeight: 'bold',
    marginBottom: 10
  },
  leaderboard: {
    width: '50%',
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: '#383539',
    flexDirection: 'row'
  },
  name: {
    paddingHorizontal: '5%',
    textAlign: 'center',
    color: 'hotpink',
    width: '50%',
    fontSize: 28,
  },
  duration: {
    paddingHorizontal: '5%',
    textAlign: 'center',
    color: 'hotpink',
    width: '50%',
    alignItems: 'flex-start',
    fontSize: 28,
  },
  greet: {
    color: '#383539',
    fontWeight: '800',
    fontSize: 50,
    marginBottom: 50,
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