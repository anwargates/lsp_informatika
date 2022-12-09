import { MaterialIcons } from '@expo/vector-icons'
import { VStack, Text, Input, Icon } from 'native-base'
import React from 'react'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { Image, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS } from '../components/Colors/Colors'
import { FORM_STYLES } from '../components/Styles/FormStyles'
import { authLoginAPI } from '../features/slice/authSlice'
import LOGO from '../image/lspinformatika.png'

export const Login = ({ navigation }) => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  return (
    <>
      {/* {authState.isLoginSuccess && navigation.replace('Home')} */}
      <VStack
        space={2}
        style={styles.container}>
        <Image
          source={LOGO}
          style={{ alignSelf: 'center', marginBottom: 32 }}
        />
        <Input
          InputLeftElement={
            <Icon
              as={<MaterialIcons name='person' />}
              size={5}
              ml='2'
              color='black'
            />
          }
          name='email'
          variant='rounded'
          value={identifier}
          onChangeText={(value) => setIdentifier(value)}
          style={FORM_STYLES.input}
          placeholder='Masukkan Username atau Email'
        />
        <Input
          InputLeftElement={
            <Icon
              as={<MaterialIcons name='vpn-key' />}
              size={5}
              ml='2'
              color='black'
            />
          }
          name='password'
          type='password'
          variant='rounded'
          value={password}
          onChangeText={(value) => setPassword(value)}
          style={FORM_STYLES.input}
          placeholder='Masukkan Password'
        />
        <TouchableOpacity
          onPress={() => dispatch(authLoginAPI({ identifier, password }))}
          style={styles.button}
          disabled={authState.isLoginPending}>
          {authState.isLoginPending ? (
            <ActivityIndicator
              size='small'
              color='#ffffff'
            />
          ) : (
            <Text style={styles.text}>LOGIN</Text>
          )}
        </TouchableOpacity>
      </VStack>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    padding: 32,
  },
  button: {
    height: 42,
    position: 'absolute',
    bottom: 32,
    left: 32,
    right: 32,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 32,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
})
