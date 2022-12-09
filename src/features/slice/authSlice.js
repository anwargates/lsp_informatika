import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { BASE_URL } from '../api/api'

let jwtTemp = ''

const initialState = {
  isLoginPending: false,
  isLoginSuccess: false,
  isLoginRejected: null,
  errorMessage: null,
  user: {
    id: null,
    username: null,
    email: null,
    role: null,
  },
  token: null,
}

const configLogin = {
  url: '/auth/local',
  method: 'post',
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}

const configFetchMe = {
  url: '/users/me?populate=*',
  method: 'get',
  baseURL: BASE_URL,
  headers: {},
}

// function callLoginApi(email, password) {
//   return new Promise(function (resolve, reject) {
//     let token = ""
//     setTimeout(() => {
//       token = ""
//       axios.post('https://fakestoreapi.com/auth/login', {
//         username: email,
//         password
//       }).then(res => {
//         console.log("LOGIN RESPONSE", res)
//         token = res.data.token
//         console.log("LOGIN TOKEN", token)
//         resolve({ email, role: "user", token })
//       }).catch(err => reject("Email/username atau password salah"))
//     }, 1000);
//   });
// }

const doLogin = ({ identifier, password }) => {
  return new Promise((resolve, reject) => {
    const loginRequest = {
      ...configLogin,
      data: {
        identifier,
        password,
      },
    }
    const loginResponse = axios.request(loginRequest)
    // const loginResponse = axios.post(BASE_URL + configLogin.url, {
    //   data: {
    //     identifier,
    //     password,
    //   },
    // })
    console.log('RESPONSE IN AUTH LOGIN', loginResponse)
    resolve(loginResponse)
  })
}

// const doFetchMe = (jwt) => {
//   return new Promise((resolve, reject) => {
//     const fetchMeRequest = {
//       ...configFetchMe,
//       headers: {
//         Authentication: jwt,
//       },
//     }
//     const userDataResponse = axios.get(
//       'http://192.168.10.106:1337/api/users/me?populate=role',
//       {
//         // credentials: 'include',
//         headers: {
//           // 'Content-Type': 'text/plain',
//           Authorization:
//             'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjcwMjU2MTA3LCJleHAiOjE2NzI4NDgxMDd9.iVc6j0vVZYTyg8OALHgT2UdFyDapOX8mZssM09lLegs',
//         },
//       }
//     )
//     console.log('RESPONSE IN AUTH LOGIN WITH FETCHME', userDataResponse)
//     resolve(userDataResponse)
//   })
// }

export const authLoginAPI = createAsyncThunk(
  'auth/login',
  async ({ identifier, password }) => {
    try {
      const response = await doLogin({ identifier, password }).then((res) => {
        const fetchMeRequest = {
          ...configFetchMe,
          headers: {
            Authorization: `Bearer ${res.data.jwt}`,
          },
        }
        const userDataResponse = axios.request(fetchMeRequest)
        console.log('RESPONSE IN AUTH LOGIN WITH FETCHME', userDataResponse)
        jwtTemp = res.data.jwt
        return userDataResponse
      })
      // const response = await doFetchMe('test').then((res) =>
      //   console.log('dofetchme response', res)
      // )
      return response
    } catch (err) {
      ToastAndroid.show('ERROR AUTH', ToastAndroid.SHORT)
      console.log('ERROR AUTH', err)
      throw err
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setJWT: (state, action) => {},
    logout: (state) => {
      // console.log("STATE IN LOGOUT",state)
      // console.log("STATE IN LOGOUT",state.isLoginSuccess)
      state.isLoginSuccess = false
      state.user = {
        id: null,
        username: null,
        email: null,
        role: null,
      }
      state.token = null
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authLoginAPI.pending, (state) => {
        ToastAndroid.show('Mohon Tunggu, Sedang Login', ToastAndroid.SHORT)
        state.isLoginSuccess = false
        state.isLoginPending = true
        state.isLoginRejected = false
        state.errorMessage = null
      })
      .addCase(authLoginAPI.fulfilled, (state, action) => {
        console.log('fulfilled payload', action.payload)
        ToastAndroid.show('Login Berhasil', ToastAndroid.SHORT)
        const data = action.payload.data
        state.isLoginPending = false
        state.isLoginSuccess = true
        state.isLoginRejected = false
        state.errorMessage = null
        state.user = data
        state.token = jwtTemp
      })
      .addCase(authLoginAPI.rejected, (state, action) => {
        // console.log('Login Rejected', action)
        ToastAndroid.show('Login Rejected', ToastAndroid.SHORT)

        state.isLoginPending = false
        state.isLoginSuccess = false
        state.isLoginRejected = true
        state.token = null
        state.errorMessage = action.error.message
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
