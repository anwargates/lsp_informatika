import { combineReducers, configureStore } from '@reduxjs/toolkit'
import apl01Slice from '../features/slice/apl01Slice'
import asesiSlice from '../features/slice/asesiSlice'
import asesorFetcherSlice from '../features/slice/asesorFetcherSlice'
import asesorSlice from '../features/slice/asesorSlice'
import authSlice from '../features/slice/authSlice'
import eventFetcherSlice from '../features/slice/eventFetcherSlice'
import eventSlice from '../features/slice/eventSlice'
import roleFetcherSlice from '../features/slice/roleFetcherSlice'
import skemaFetcherSlice from '../features/slice/skemaFetcherSlice'

// kombinasi beberapa reducer
const rootReducer = combineReducers({
  asesi: asesiSlice,
  APL01: apl01Slice,
  auth: authSlice,
  asesor: asesorSlice,
  event: eventSlice,
  eventFetch: eventFetcherSlice,
  asesorFetch: asesorFetcherSlice,
  skemaFetch: skemaFetcherSlice,
  roleFetch: roleFetcherSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

// subscribe untuk menyimpan state ke local storage di setiap ada perubahan
store.subscribe(() => {
  // console.log("STORE STATE", store.getState())
})
