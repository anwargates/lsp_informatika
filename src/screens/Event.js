import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Event({ navigation }) {
    return (
        <View>
            <Text style={styles.text}>This is Event Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
      color: "#ffffff",
      fontSize: 30,
    },
  });