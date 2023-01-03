import React from 'react'
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Icon } from 'native-base'
import { COLORS } from '../Colors/Colors'

export default function CardComponent(props) {
  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={props.onPress}>
      <View style={styles.card}>
        {/* {console.log(props)} */}
        <Icon
          as={<MaterialCommunityIcons name={props.path} />}
          size={20}
          // style={{ width: 100, height: 100 }}
          alignSelf='center'
          color={COLORS.primary}
        />
        {/* <Image
          source={props.path}
          alt='img'
          style={{ width: 100, height: 100 }}
        /> */}
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: COLORS.secondary,
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
    color: COLORS.third,
    fontSize: 24,
    // fontWeight: '400'
  },
})
