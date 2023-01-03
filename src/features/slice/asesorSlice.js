import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { BASE_URL, HEADER } from '../api/api'

const config = {
  // url: "/apl-01s?sort=createdAt%3Adesc",
  // url: '/apl-01s?populate=%2A&sort=updatedAt%3Adesc',
  // url: '/users?populate=*&sort=updatedAt%3Adesc&filters[role][name][$eq]=Asesor',
  url: '/users?populate=deep,2&limit=25&sort=updatedAt%3Adesc&filters[role][name][$eq]=Asesor',
  method: 'get',
  baseURL: BASE_URL,
  headers: HEADER,
}

const configSearch = {
  // url: '/apl-01s?populate=%2A&sort=updatedAt%3Adesc&filters[namaLengkap][$containsi]=',
  url: '/users?populate=deep,2&limit=25&filters[role][name][$eq]=Asesor&filters[asesorAccount][namaLengkap][$containsi]=',
  method: 'get',
  baseURL: BASE_URL,
  headers: HEADER,
}

const initialState = {
  isPending: false,
  profiles: [],
}

export const fetchAsesor = createAsyncThunk('asesor/fetchAsesor', async () => {
  try {
    const response = await axios.request(config)
    console.log('fetchAsesor RESPONSE', response)
    return response
  } catch (e) {
    console.log('fetchAsesor Error', e)
  }
})

export const searchAsesor = createAsyncThunk(
  'asesor/searchAsesor',
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

export const Asesor = createSlice({
  name: 'asesor',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // fetch all case
      .addCase(fetchAsesor.pending, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.isPending = true
      })
      .addCase(fetchAsesor.fulfilled, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.profiles = []
        state.profiles.push(...action.payload.data)
        state.isPending = false
      })
      .addCase(fetchAsesor.rejected, (state, action) => {
        // log.info("PAYLOAD",action.payload)
        state.isPending = false
        console.log('FETCH DATA ASESOR FAILED', action.payload)
        ToastAndroid.show('FETCH DATA ASESOR FAILED', ToastAndroid.SHORT)
      })
      
      // search case
      .addCase(searchAsesor.pending, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.isPending = true
      })
      .addCase(searchAsesor.fulfilled, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.profiles = []
        state.profiles.push(...action.payload.data)
        state.isPending = false
      })
      .addCase(searchAsesor.rejected, (state, action) => {
        // log.info("PAYLOAD",action.payload)
        state.isPending = false
        console.log('SEARCH DATA ASESOR FAILED', action.payload)
        ToastAndroid.show('SEARCH DATA ASESOR FAILED', ToastAndroid.SHORT)
      })
  },
})

// console.log(Slicer)
// export const { changeProfile } = Profile.actions
export default Asesor.reducer
