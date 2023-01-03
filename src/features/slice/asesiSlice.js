import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { BASE_URL, HEADER } from '../api/api'

const config = {
  // url: "/apl-01s?sort=createdAt%3Adesc",
  // url: '/apl-01s?populate=%2A&sort=updatedAt%3Adesc',
  // url: '/users?populate=*&sort=updatedAt%3Adesc&filters[role][name][$eq]=Asesi',
  url: '/users?populate=deep&sort=updatedAt%3Adesc&filters[role][name][$eq]=Asesi&limit=25',
  method: 'get',
  baseURL: BASE_URL,
  headers: HEADER,
}

const configSearch = {
  // url: '/apl-01s?populate=%2A&sort=updatedAt%3Adesc&filters[namaLengkap][$containsi]=',
  url: '/users?populate=deep&limit=25&filters[role][name][$eq]=Asesi&filters[apl_01s][namaLengkap][$containsi]=',
  method: 'get',
  baseURL: BASE_URL,
  headers: HEADER,
}

const configForAsesor = {
  url: '/users?populate=deep&sort=updatedAt%3Aasc&limit=25&filters[apl_01s][asesor][id][$eq]=',
  method: 'get',
  baseURL: BASE_URL,
  headers: HEADER,
}

const initialState = {
  isPending: false,
  profiles: [],
}

export const fetchAsesi = createAsyncThunk('asesi/fetchAsesi', async () => {
  try {
    const response = await axios.request(config)
    console.log('fetchAsesi RESPONSE', response)
    return response
  } catch (e) {
    console.log('fetchAsesi Error', e)
  }
})

export const searchAsesi = createAsyncThunk(
  'asesi/searchAsesi',
  async (search) => {
    console.log('SEARCH PARAMS', search)
    const response = await axios.request({
      ...configSearch,
      url: configSearch.url + search,
    })
    // .catch((e) => console.log('SEARCH ERROR', e))
    console.log('SEARCH RESPONSE', response)
    return response
  }
)

export const fetchAsesiForAsesor = createAsyncThunk(
  'asesi/fetchAsesiForAsesor',
  async (asesorID) => {
    try {
      console.log('ASESOR ID', asesorID)
      const response = await axios.request({
        ...configForAsesor,
        url: configForAsesor.url + asesorID,
      })
      console.log('fetchAsesiForAsesor RESPONSE', response)
      return response
    } catch (e) {
      console.log('fetchAsesiForAsesor Error', e)
    }
  }
)

export const Asesi = createSlice({
  name: 'asesi',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // fetch all case
      .addCase(fetchAsesi.pending, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.isPending = true
      })
      .addCase(fetchAsesi.fulfilled, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.profiles = []
        state.profiles.push(...action.payload.data)
        state.isPending = false
      })
      .addCase(fetchAsesi.rejected, (state, action) => {
        // log.info("PAYLOAD",action.payload)
        state.isPending = false
        console.log('FETCH DATA ASESI FAILED', action.payload)
        ToastAndroid.show('FETCH DATA ASESI FAILED', ToastAndroid.SHORT)
      })

      // search case
      .addCase(searchAsesi.pending, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.isPending = true
      })
      .addCase(searchAsesi.fulfilled, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.profiles = []
        state.profiles.push(...action.payload.data)
        state.isPending = false
      })
      .addCase(searchAsesi.rejected, (state, action) => {
        // log.info("PAYLOAD",action.payload)
        state.isPending = false
        console.log('SEARCH DATA ASESI FAILED', action.payload)
        ToastAndroid.show('SEARCH DATA ASESI FAILED', ToastAndroid.SHORT)
      })

      // fetch all asesi for asesor case
      .addCase(fetchAsesiForAsesor.pending, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.isPending = true
      })
      .addCase(fetchAsesiForAsesor.fulfilled, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.profiles = []
        state.profiles.push(...action.payload.data)
        state.isPending = false
      })
      .addCase(fetchAsesiForAsesor.rejected, (state, action) => {
        // log.info("PAYLOAD",action.payload)
        state.isPending = false
        console.log('fetchAsesiForAsesor FAILED', action.payload)
        ToastAndroid.show('fetchAsesiForAsesor FAILED', ToastAndroid.SHORT)
      })
  },
})

// console.log(Slicer)
// export const { changeProfile } = Profile.actions
export default Asesi.reducer
