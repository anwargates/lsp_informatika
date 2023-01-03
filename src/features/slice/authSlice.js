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

// init state for login bypass
// const initialState = {
//   isLoginPending: false,
//   isLoginSuccess: true,
//   isLoginRejected: false,
//   errorMessage: null,
//   user: {
//     id: 1,
//     username: 'admin1',
//     email: 'admin1@gmail.com',
//     role: {
//       name: 'Admin',
//     },
//   },
//   token: null,
// }

const configLogin = {
  url: '/auth/local',
  method: 'post',
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}

const configFetchMe = {
  url: '/users/me?populate=deep',
  method: 'get',
  baseURL: BASE_URL,
  headers: {},
}

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

const doFetchMe = (jwt) => {
  return new Promise((resolve, reject) => {
    const fetchMeRequest = {
      ...configFetchMe,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const userDataResponse = axios.request(fetchMeRequest)
    console.log('RESPONSE IN AUTH LOGIN WITH FETCHME', userDataResponse)
    resolve(userDataResponse)
  })
}

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
  try {
    const response = await doFetchMe(jwtTemp)
    console.log('RESPONSE FETCH ME', response)
    return response
  } catch (err) {
    ToastAndroid.show('ERROR FETCH ME', ToastAndroid.SHORT)
    console.log('ERROR FETCH ME', err)
    throw err
  }
})

export const authLoginAPI = createAsyncThunk(
  'auth/login',
  async ({ identifier, password }) => {
    try {
      const response = await doLogin({ identifier, password }).then((res) => {
        const userDataResponse = doFetchMe(res.data.jwt)
        // console.log('RESPONSE IN AUTH LOGIN WITH FETCHME', userDataResponse)
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
    // login
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

      // fetchme
      .addCase(fetchMe.pending, (state) => {
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        const data = action.payload.data
        state.user = data
      })
      .addCase(fetchMe.rejected, (state, action) => {
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
