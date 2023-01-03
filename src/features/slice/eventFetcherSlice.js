import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { BASE_URL, HEADER } from '../api/api'

const initialState = {
  isPending: false,
  isSuccess: false,
  isRejected: null,
  errorMessage: null,
  response: null,
}

const configFetchEvents = {
  url: '/events',
  method: 'get',
  baseURL: BASE_URL,
  headers: HEADER,
}

export const fetcherEvents = createAsyncThunk(
  'fetcher/Events',
  async () => {
    try {
      const response = await axios.request(configFetchEvents)
      return response
    } catch (err) {
      ToastAndroid.show('ERROR FETCH Events', ToastAndroid.SHORT)
      console.log('ERROR FETCH Events', err)
      throw err
    }
  }
)

export const eventFetcherSlice = createSlice({
  name: 'eventFetcher',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetcherEvents.pending, (state) => {
        state.isSuccess = false
        state.isPending = true
        state.isRejected = false
        state.errorMessage = null
      })
      .addCase(fetcherEvents.fulfilled, (state, action) => {
        const data = action.payload.data.data
        state.isPending = false
        state.isSuccess = true
        state.isRejected = false
        state.errorMessage = null
        state.response = data
      })
      .addCase(fetcherEvents.rejected, (state, action) => {
        state.isPending = false
        state.isSuccess = false
        state.isRejected = true
        state.errorMessage = action.error.message
      })
  },
})

export default eventFetcherSlice.reducer