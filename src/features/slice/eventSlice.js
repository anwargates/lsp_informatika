import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { BASE_URL, HEADER } from '../api/api'

const config = {
  // url: "/apl-01s?sort=createdAt%3Adesc",
  // url: '/apl-01s?populate=%2A&sort=updatedAt%3Adesc',
  // url: '/users?populate=*&sort=updatedAt%3Adesc&filters[role][name][$eq]=Event',
  url: '/events?populate=deep,1&sort=updatedAt%3Adesc',
  method: 'get',
  baseURL: BASE_URL,
  headers: HEADER,
}

const configSearch = {
  // url: '/apl-01s?populate=%2A&sort=updatedAt%3Adesc&filters[namaLengkap][$containsi]=',
  url: '/events?populate=deep,1&sort=updatedAt%3Adesc&filters[namaEvent][$containsi]=',
  method: 'get',
  baseURL: BASE_URL,
  headers: HEADER,
}

const initialState = {
  isPending: false,
  profiles: [],
}

export const fetchEvent = createAsyncThunk('event/fetchEvent', async () => {
  try {
    const response = await axios.request(config)
    console.log('fetchEvent RESPONSE', response)
    return response
  } catch (e) {
    console.log('fetchEvent Error', e)
  }
})

export const searchEvent = createAsyncThunk(
  'event/searchEvent',
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

export const Event = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // fetch all case
      .addCase(fetchEvent.pending, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.isPending = true
      })
      .addCase(fetchEvent.fulfilled, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.profiles = []
        state.profiles.push(...action.payload.data.data)
        state.isPending = false
      })
      .addCase(fetchEvent.rejected, (state, action) => {
        // log.info("PAYLOAD",action.payload)
        state.isPending = false
        console.log('FETCH DATA EVENT FAILED', action.payload)
        ToastAndroid.show('FETCH DATA EVENT FAILED', ToastAndroid.SHORT)
      })
      
      // search case
      .addCase(searchEvent.pending, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.isPending = true
      })
      .addCase(searchEvent.fulfilled, (state, action) => {
        // console.log("PAYLOAD", action.payload)
        state.profiles = []
        state.profiles.push(...action.payload.data.data)
        state.isPending = false
      })
      .addCase(searchEvent.rejected, (state, action) => {
        // log.info("PAYLOAD",action.payload)
        state.isPending = false
        console.log('SEARCH DATA EVENT FAILED', action.payload)
        ToastAndroid.show('SEARCH DATA EVENT FAILED', ToastAndroid.SHORT)
      })
  },
})

// console.log(Slicer)
// export const { changeProfile } = Profile.actions
export default Event.reducer
