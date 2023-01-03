import React from 'react'
import { StyleSheet } from 'react-native'
import { GLOBAL_STYLE } from '../components/Styles/Styles'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { AdminComponent } from '../components/Home/AdminComponent'
import { AsesiComponent } from '../components/Home/AsesiComponent'
import { AsesorComponent } from '../components/Home/AsesorComponent'

export default function Home({ navigation }) {
  const authState = useSelector((state) => state.auth)

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused
  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //     }
  //   }, [])
  // )

  // if (authState.isLoginSuccess) navigation.replace('Login')
  return (
    <>
      {console.log('AUTH STATE', authState)}
      {/* <AdminComponent /> */}
      {authState.user.role?.name === 'Admin' && <AdminComponent />}
      {authState.user.role?.name === 'Asesi' && <AsesiComponent />}
      {authState.user.role?.name === 'Asesor' && <AsesorComponent />}
    </>
  )
}
