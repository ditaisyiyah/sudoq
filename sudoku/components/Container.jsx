import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function Container(props){
  return (
    <View style={styles.container}>
      {props.render()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})