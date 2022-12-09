import React from 'react'
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native'

export default function CardComponent(props) {
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={props.onPress}>
      <View style={styles.card}>
        {/* {console.log(props)} */}
        <Image
          source={props.path}
          alt='img'
          style={{ width: 100, height: 100 }}
        />
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#ffffff',
    // width: "100%",
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    fontSize: 24,
  },
})
