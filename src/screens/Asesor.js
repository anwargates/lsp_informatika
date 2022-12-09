import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { GLOBAL_STYLE } from '../components/Styles/Styles'

let posts = []

for (let i = 1; i < 20; i++) {
    posts.push({
        nama: `asesor ${i}`,
        skema: `skema ${i}`,
    })
}

export default function Asesor({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is Asesor Page</Text>
            <FlatList
                data={posts}
                renderItem={({ item }) =>
                    <View style={styles.itemCard}>
                        <Text style={styles.item}>{item.nama}</Text>
                        <Text style={styles.item}>{item.skema}</Text>
                    </View>
                }
            >
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        // padding: 2,
        paddingTop: GLOBAL_STYLE.paddingTop,
        padding: 4,
        backgroundColor: "#187CC2",
        // alignItems: "center",
        // justifyContent: "center",
    },
    text: {
        color: "#ffffff",
        fontSize: 30,
    },
    item: {

    },
    itemCard: {
        flex: 1,
        width: "100%",
        backgroundColor: "#ffffff",
        marginVertical: 2,
        padding: 2,
    }
});