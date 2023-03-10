import React from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { ToastAndroid } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'

import { logout } from '../../features/slice/authSlice'
import CardComponent from '../Cards/CardComponent'
import { COLORS } from '../Colors/Colors'
import PicAsesi from '../../image/ic_baseline-groups.png'
import PicAsesor from '../../image/ic_baseline-co-present.png'
import PicEvent from '../../image/bi_calendar-event.png'
import PicRekap from '../../image/ic_baseline-assignment-turned-in.png'
import PicSettings from '../../image/ic_baseline-miscellaneous-services.png'
import PicSKKNI from '../../image/ic_baseline-dvr.png'
import { StyleSheet } from 'react-native'
import { GLOBAL_STYLE } from '../Styles/Styles'
import { useNavigation } from '@react-navigation/native'
import { VStack } from 'native-base'

export const AdminComponent = () => {
  const authState = useSelector((state) => state.auth)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  return (
    <LinearGradient
      colors={COLORS.gradientMain}
      style={styles.container}>
      <View>
        <VStack style={styles.header}>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 16 }}>Selamat Datang</Text>
            <Text style={{ color: 'white', fontSize: 32 }}>
              {authState.user.namaLengkap}
            </Text>
            <View
              style={{
                marginVertical: 16,
                borderBottomColor: 'white',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text style={{ color: 'white', fontSize: 14 }}>Event Terbaru</Text>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>
              VSGA Malang 2022
            </Text>
          </TouchableOpacity>
        </VStack>
        {/* <Heading>Welcome, Admin LSP Informatika</Heading> */}
        <VStack style={styles.menuBox}>
          <ScrollView>
            <View style={styles.row}>
              <CardComponent
                text='Event'
                onPress={() => navigation.navigate('Event')}
                path='calendar'
              />
              <CardComponent
                text='Tambah User'
                onPress={() => navigation.navigate('FormAddUser')}
                path='account-plus'
              />
            </View>
            <View style={styles.row}>
              <CardComponent
                text='Asesi'
                onPress={() => navigation.navigate('Asesi')}
                path='account-multiple-check'
              />
              <CardComponent
                text='Asesor'
                onPress={() => navigation.navigate('Asesor')}
                path='account-tie'
              />
            </View>
            <View style={styles.row}>
              <CardComponent
                text='SKKNI'
                // onPress={() => navigation.navigate("Asesi")}
                path='book-open-page-variant'
              />
              <CardComponent
                text='Settings'
                // onPress={() => navigation.navigate("Asesor")}
                path='cog'
              />
            </View>
          </ScrollView>
        </VStack>
        {/* <StatusBar style="auto" /> */}
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // padding: 2,
    paddingTop: GLOBAL_STYLE.paddingTop,
    paddingHorizontal: 16,
    // backgroundColor: "#E9FFE5",
    // alignItems: "center",
    // justifyContent: 'center',
  },
  header: {
    backgroundColor: COLORS.third,
    // height: 200,
    padding: 16,
    borderRadius: 8,
    margin: 6,
  },
  menuBox: {
    // flex: 2,
  },
  // text: {
  //   color: "#ffffff",
  //   fontSize: 30,
  // },
  row: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
})
