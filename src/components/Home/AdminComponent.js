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

export const AdminComponent = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await dispatch(logout())
    // navigation.replace('Login')
    ToastAndroid.show('Logout Berhasil', ToastAndroid.SHORT)
  }

  return (
    <LinearGradient
      colors={COLORS.gradientMain}
      style={styles.container}>
      <View>
        {/* <Heading>Welcome, Admin LSP Informatika</Heading> */}
        <ScrollView>
          <View style={styles.row}>
            <CardComponent
              text='Event'
            //   onPress={() => navigation.navigate('Event')}
              path={PicEvent}
            />
            <CardComponent
              text='Rekap'
            //   onPress={() => navigation.navigate('Rekap')}
              path={PicRekap}
            />
          </View>
          <View style={styles.row}>
            <CardComponent
              text='Asesi'
              onPress={() => navigation.navigate('Asesi')}
              path={PicAsesi}
            />
            <CardComponent
              text='Asesor'
            //   onPress={() => navigation.navigate('Asesor')}
              path={PicAsesor}
            />
          </View>
          <View style={styles.row}>
            <CardComponent
              text='SKKNI'
              // onPress={() => navigation.navigate("Asesi")}
              path={PicSKKNI}
            />
            <CardComponent
              text='Settings'
              // onPress={() => navigation.navigate("Asesor")}
              path={PicSettings}
            />
          </View>
        </ScrollView>
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
    justifyContent: 'center',
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
