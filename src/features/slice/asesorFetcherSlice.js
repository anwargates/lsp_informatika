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

const configFetchAsesor = {
  url: '/asesors',
  method: 'get',
  baseURL: BASE_URL,
  headers: HEADER,
}
export const fetcherAsesor = createAsyncThunk(
  'fetcher/Asesor',
  async () => {
    try {
      const response = await axios.request(configFetchAsesor)
      return response
    } catch (err) {
      ToastAndroid.show('ERROR FETCH Asesor', ToastAndroid.SHORT)
      console.log('ERROR FETCH Asesor', err)
      throw err
    }
  }
)

export const asesorFetcherSlice = createSlice({
  name: 'roleFetcher',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // asesor
      .addCase(fetcherAsesor.pending, (state) => {
        state.isSuccess = false
        state.isPending = true
        state.isRejected = false
        state.errorMessage = null
      })
      .addCase(fetcherAsesor.fulfilled, (state, action) => {
        const data = action.payload.data.data
        state.isPending = false
        state.isSuccess = true
        state.isRejected = false
        state.errorMessage = null
        state.response = data
      })
      .addCase(fetcherAsesor.rejected, (state, action) => {
        state.isPending = false
        state.isSuccess = false
        state.isRejected = true
        state.errorMessage = action.error.message
      })
  },
})

export default asesorFetcherSlice.reducer