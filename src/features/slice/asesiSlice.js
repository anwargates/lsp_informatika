import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { BASE_URL, HEADER } from '../api/api'

const config = {
  // url: "/apl-01s?sort=createdAt%3Adesc",
  url: '/apl-01s?populate=%2A&sort=updatedAt%3Adesc',
  method: 'get',
  baseURL: BASE_URL,
  headers: HEADER,
}

const configSearch = {
  url: '/apl-01s?populate=%2A&sort=updatedAt%3Adesc&filters[namaLengkap][$containsi]=',
  method: 'get',
  baseURL: BASE_URL,
  headers: HEADER,
}

const initialState = {
  isPending: false,
  profiles: [],
}

export const fetchAsesi = createAsyncThunk('asesi/fetchAsesi', async () => {
  const response = await axios.request(config)
  // console.log('RESPONSE', response)
  return response
})

export const searchAsesi = createAsyncThunk(
  'asesi/searchAsesi',
  async (search) => {
    console.log('SEARCH PARAMS', search)
    const response = await axios
      .request({
        ...configSearch,
        url: configSearch.url + search,
      })
      // .catch((e) => console.log('SEARCH ERROR', e))
    console.log('SEARCH RESPONSE', response)
    return response
  }
)

export const Asesi = createSlice({
  name: 'asesi',
  initialState,
  reducers: {
    // changeProfile: (state, action) => {
    //   const { firstName, lastName, email, gender, language } = action.payload
    //   state.firstName = firstName
    //   state.lastName = lastName
    //   state.email = email
    //   state.gender = gender
    //   state.language = language
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAsesi.fulfilled, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.profiles = []
        state.profiles.push(...action.payload.data.data)
      })
      .addCase(fetchAsesi.rejected, (state, action) => {
        // log.info("PAYLOAD",action.payload)
        console.log('FETCH DATA ASESI FAILED', action.payload)
        ToastAndroid.show('FETCH DATA ASESI FAILED', ToastAndroid.SHORT)
      })
      .addCase(searchAsesi.pending, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.isPending = true
      })
      .addCase(searchAsesi.fulfilled, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.profiles = []
        state.profiles.push(...action.payload.data.data)
        state.isPending = false
      })
      .addCase(searchAsesi.rejected, (state, action) => {
        // log.info("PAYLOAD",action.payload)
        state.isPending = false
        console.log('SEARCH DATA ASESI FAILED', action.payload)
        ToastAndroid.show('SEARCH DATA ASESI FAILED', ToastAndroid.SHORT)
      })
  },
})

// console.log(Slicer)
// export const { changeProfile } = Profile.actions
export default Asesi.reducer
