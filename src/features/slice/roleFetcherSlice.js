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

const configFetchRoles = {
  url: '/users-permissions/roles',
  method: 'get',
  baseURL: BASE_URL,
  headers: HEADER,
}
export const fetcherRole = createAsyncThunk(
  'fetcher/Role',
  async () => {
    try {
      const response = await axios.request(configFetchRoles)
      return response
    } catch (err) {
      ToastAndroid.show('ERROR FETCH ROLES', ToastAndroid.SHORT)
      console.log('ERROR FETCH ROLES', err)
      throw err
    }
  }
)

export const roleFetcherSlice = createSlice({
  name: 'roleFetcher',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // roles
      .addCase(fetcherRole.pending, (state) => {
        state.isSuccess = false
        state.isPending = true
        state.isRejected = false
        state.errorMessage = null
      })
      .addCase(fetcherRole.fulfilled, (state, action) => {
        const data = action.payload.data.roles
        state.isPending = false
        state.isSuccess = true
        state.isRejected = false
        state.errorMessage = null
        state.response = data
      })
      .addCase(fetcherRole.rejected, (state, action) => {
        state.isPending = false
        state.isSuccess = false
        state.isRejected = true
        state.errorMessage = action.error.message
      })
  },
})

export default roleFetcherSlice.reducer