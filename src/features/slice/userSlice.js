import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { BASE_URL, HEADER } from '../api/api'

const initialState = {
  isCreateUserPending: false,
  isCreateUserSuccess: false,
  isCreateUserRejected: null,
  errorMessage: null,
  response: '',
}

const configCreateUser = {
  url: '/users',
  method: 'post',
  baseURL: BASE_URL,
  headers: HEADER,
}

const configCreateAPL01 = {
  url: '/apl-01s',
  method: 'post',
  baseURL: BASE_URL,
  headers: HEADER,
}

const configCreateAsesor = {
  url: '/apl-01s',
  method: 'post',
  baseURL: BASE_URL,
  headers: HEADER,
}

const doCreateUser = (apl01, formData) => {
  return new Promise((resolve, reject) => {
    try {
      const { namaLengkap, skema, event, asesor, ...rest } = formData
      const req = {
        ...configCreateUser,
        data: { ...rest, apl_01s: apl01 },
      }
      const createUser = axios.request(req)
      console.log('RESPONSE IN CREATE USER', createUser)
      resolve(createUser)
    } catch (err) {
      reject(err)
    }
  })
}

const doCreateAPL01 = (formData) => {
  return new Promise((resolve, reject) => {
    try {
      const { namaLengkap, skema, event, asesor } = formData
      const req = {
        ...configCreateAPL01,
        data: {
          data: {
            namaLengkap,
            skema,
            event,
            asesor,
          },
        },
      }
      const createAPL01 = axios.request(req)
      console.log('RESPONSE IN CREATE APL01', createAPL01)
      resolve(createAPL01)
    } catch (err) {
      reject(err)
    }
  })
}

const doCreateAsesor = (formData) => {
  return new Promise((resolve, reject) => {
    try {
      const { namaLengkap } = formData
      const req = {
        ...configCreateAPL01,
        data: {
          data: {
            namaLengkap,
          },
        },
      }
      const createAPL01 = axios.request(req)
      console.log('RESPONSE IN CREATE APL01', createAPL01)
      resolve(createAPL01)
    } catch (err) {
      reject(err)
    }
  })
}

export const createUser = createAsyncThunk(
  'user/createUser',
  async (formData) => {
    try {
      const response =
      formData.role==='Asesor'
      ?await doCreateAsesor()
      :await doCreateAPL01(formData).then((res) => {
        console.log('APL01 PROMISE RESPONSE', res)
        return doCreateUser(res.data.data.id, formData)
      })
      return response
    } catch (err) {
      ToastAndroid.show('ERROR CREATE USER', ToastAndroid.SHORT)
      console.log('ERROR CREATE USER', err)
      throw err
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // login
      .addCase(createUser.pending, (state) => {
        state.isCreateUserSuccess = false
        state.isCreateUserPending = true
        state.isCreateUserRejected = false
        state.errorMessage = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        ToastAndroid.show('Tambah User Berhasil', ToastAndroid.SHORT)
        const data = action.payload.data
        state.isCreateUserPending = false
        state.isCreateUserSuccess = true
        state.isCreateUserRejected = false
        state.errorMessage = null
        state.response = data
      })
      .addCase(createUser.rejected, (state, action) => {
        ToastAndroid.show('Tambah User Gagal', ToastAndroid.SHORT)
        state.isCreateUserPending = false
        state.isCreateUserSuccess = false
        state.isCreateUserRejected = true
        state.errorMessage = action.error.message
      })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
