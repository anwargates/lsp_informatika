import { combineReducers, configureStore } from '@reduxjs/toolkit'
import apl01Slice from '../features/slice/apl01Slice'
import asesiSlice from '../features/slice/asesiSlice'
import authSlice from '../features/slice/authSlice'

// kombinasi beberapa reducer
const rootReducer = combineReducers({
  asesi: asesiSlice,
  APL01: apl01Slice,
  auth: authSlice,
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
