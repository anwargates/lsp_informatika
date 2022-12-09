import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Rekap({ navigation }) {
    return (
        <View>
            <Text style={styles.text}>This is Rekap Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
      color: "#ffffff",
      fontSize: 30,
    },
  });