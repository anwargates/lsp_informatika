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
import { HStack, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'

export const AsesorComponent = () => {
  const authState = useSelector((state) => state.auth)
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
        <VStack style={styles.header}>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 16 }}>Selamat Datang</Text>
            <Text style={{ color: 'white', fontSize: 32 }}>
              {authState.user.asesorAccount?.namaLengkap}
            </Text>
            <View
              style={{
                marginVertical: 16,
                borderBottomColor: 'white',
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <Text style={{ color: 'white', fontSize: 14 }}>Skema saat ini</Text>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>
              Junior Web Developer
            </Text>
          </TouchableOpacity>
        </VStack>
        <ScrollView>
          <View style={styles.row}>
            <CardComponent
              text='Event'
              onPress={() => navigation.navigate('Event')}
              path='calendar'
            />
            <CardComponent
              text='Asesi'
              onPress={() => navigation.navigate('Asesi')}
              path='account-multiple-check'
            />
          </View>
        </ScrollView>
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
