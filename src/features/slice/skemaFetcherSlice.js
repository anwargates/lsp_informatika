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

const configFetchSkema = {
  url: '/skemas',
  method: 'get',
  baseURL: BASE_URL,
  headers: HEADER,
}

export const fetcherSkema = createAsyncThunk(
  'fetcher/Skema',
  async () => {
    try {
      const response = await axios.request(configFetchSkema)
      return response
    } catch (err) {
      ToastAndroid.show('ERROR FETCH SKEMA', ToastAndroid.SHORT)
      console.log('ERROR FETCH SKEMA', err)
      throw err
    }
  }
)

export const skemaFetcherSlice = createSlice({
  name: 'skema',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // skema
      .addCase(fetcherSkema.pending, (state) => {
        state.isSuccess = false
        state.isPending = true
        state.isRejected = false
        state.errorMessage = null
      })
      .addCase(fetcherSkema.fulfilled, (state, action) => {
        const data = action.payload.data.data
        state.isPending = false
        state.isSuccess = true
        state.isRejected = false
        state.errorMessage = null
        state.response = data
      })
      .addCase(fetcherSkema.rejected, (state, action) => {
        state.isPending = false
        state.isSuccess = false
        state.isRejected = true
        state.errorMessage = action.error.message
      })
  },
})

export default skemaFetcherSlice.reducer