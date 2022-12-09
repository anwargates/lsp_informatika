import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useDispatch, useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import { Login } from '../screens/Login'
import APL01 from '../screens/APL01'
import Home from '../screens/Home'
import Asesi from '../screens/Asesi'
import FormAPL01 from '../screens/FormAPL01'
import Asesor from '../screens/Asesor'
import Event from '../screens/Event'
import Rekap from '../screens/Rekap'
import { COLORS } from '../components/Colors/Colors'
import { Icon } from 'native-base'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { logout } from '../features/slice/authSlice'
import { ToastAndroid } from 'react-native'

const Stack = createStackNavigator()

export default function Stacks() {
  const authState = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await dispatch(logout())
    // navigation.replace('Login')
    ToastAndroid.show('Logout Berhasil', ToastAndroid.SHORT)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // headerStyle: {
          //   backgroundColor: 'transparent',
          // },
          headerTransparent: 'true',
          headerTintColor: '#000000',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {authState.isLoginSuccess ? (
          <>
            <Stack.Screen
              name='Home'
              component={Home}
              options={{
                title: 'Welcome',
                headerTintColor: '#000000',
                headerRight: () => (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      // backgroundColor: 'white',
                      width: 48,
                    }}
                    onPress={handleLogout}>
                    <Icon
                      as={<MaterialCommunityIcons name='logout' />}
                      size={6}
                      color={COLORS.third}
                    />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name='Asesi'
              component={Asesi}
              options={{ title: 'Asesi' }}
            />
            <Stack.Screen
              name='Asesor'
              component={Asesor}
              options={{ title: 'Asesor' }}
            />
            <Stack.Screen
              name='Event'
              component={Event}
              options={{ title: 'Event' }}
            />
            <Stack.Screen
              name='Rekap'
              component={Rekap}
              options={{ title: 'Rekap' }}
            />
            <Stack.Screen
              name='FormAPL01'
              component={FormAPL01}
              options={{ title: 'Form APL-01' }}
            />
            <Stack.Screen
              name='APL01'
              component={APL01}
              options={{ title: 'APL-01' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name='Login'
              component={Login}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
