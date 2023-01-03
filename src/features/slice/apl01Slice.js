import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { BASE_URL, HEADER } from '../api/api'

const config = {
  url: '/apl-01s',
  method: 'post',
  baseURL: BASE_URL,
  headers: HEADER,
}

const configEdit = {
  url: '/apl-01s/',
  method: 'put',
  baseURL: BASE_URL,
  headers: HEADER,
}

const initialState = {
  isPending: false,
  isSuccess: false,
  isFailed: false,
  message: '',
  data: '',
}

export const postAPL01 = createAsyncThunk('asesi/postAPL01', async (body) => {
  try {
    const ijazahResponse = await uploadFile(body.fileData.ijazah)
    const KTPResponse = await uploadFile(body.fileData.KTP)
    const transkripResponse = await uploadFile(body.fileData.transkrip)
    const photoResponse = await uploadFile(body.fileData.photo)

    // console.log('RESPONSE IJAZAH', ijazahResponse)
    // console.log('RESPONSE KTP', KTPResponse)
    // console.log('RESPONSE TRANSKRIP', transkripResponse)
    // console.log('RESPONSE PHOTO', photoResponse)

    const req = {
      ...config,
      data: {
        data: {
          ...body.inputData,
          ijazah: ijazahResponse.id,
          identitas: KTPResponse.id,
          transkrip: transkripResponse.id,
          pasFoto: photoResponse.id,
        },
      },
    }
    // console.log('AXIOS REQUEST', req)
    const response = await axios.request(req)
    return response
  } catch (e) {
    ToastAndroid.show(e.response.data.error.name, ToastAndroid.SHORT)
    console.log('POST ERROR', e)
    throw e
  }
})

export const editAPL01 = createAsyncThunk('asesi/editAPL01', async (body) => {
  try {
    // console.log('BODY', body)
    const ijazahResponse =
      typeof body.fileData.ijazah == 'number'
        ? { id: body.fileData.ijazah }
        : await uploadFile(body.fileData.ijazah)
    const KTPResponse =
      typeof body.fileData.KTP == 'number'
        ? { id: body.fileData.KTP }
        : await uploadFile(body.fileData.KTP)
    const transkripResponse =
      typeof body.fileData.transkrip == 'number'
        ? { id: body.fileData.transkrip }
        : await uploadFile(body.fileData.transkrip)
    const photoResponse =
      typeof body.fileData.photo == 'number'
        ? { id: body.fileData.photo }
        : await uploadFile(body.fileData.photo)

    // console.log('RESPONSE IJAZAH', ijazahResponse)
    // console.log('RESPONSE KTP', KTPResponse)
    // console.log('RESPONSE TRANSKRIP', transkripResponse)
    // console.log('RESPONSE PHOTO', photoResponse)

    const req = {
      ...configEdit,
      url: configEdit.url + body.id,
      data: {
        data: {
          ...body.inputData,
          ijazah: ijazahResponse.id,
          identitas: KTPResponse.id,
          transkrip: transkripResponse.id,
          pasFoto: photoResponse.id,
        },
      },
    }
    const response = await axios.request(req)
    console.log('AXIOS RESPONSE', response)
    return response
  } catch (e) {
    ToastAndroid.show(e.response.data.error.name, ToastAndroid.SHORT)
    console.log('POST ERROR', e)
    throw e
  }
})

export const approvalAPL01 = createAsyncThunk(
  'asesi/approvalAPL01',
  async (body) => {
    try {
      const req = {
        ...configEdit,
        url: configEdit.url + body.id,
        data: {
          data: {
            ijazahApproval: body.inputData.ijazahApproval,
            identitasApproval: body.inputData.identitasApproval,
            transkripApproval: body.inputData.transkripApproval,
            pasFotoApproval: body.inputData.pasFotoApproval,
          },
        },
      }
      const response = await axios.request(req)
      console.log('AXIOS APPROVAL RESPONSE', response)
      return response
    } catch (e) {
      ToastAndroid.show(e.response.data.error.name, ToastAndroid.SHORT)
      console.log('POST APPROVAL ERROR', e)
      throw e
    }
  }
)

const uploadFile = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/upload`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: HEADER.Authorization,
        },
      })
      .then((res) => {
        console.log('IMAGE UPLOAD RESPONSE', res)
        resolve(res.data[0])
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

// export const uploadFile = createAsyncThunk('asesi/uploadFile', async (body) => {
//   await axios
//     .post('http://192.168.10.106:1337/api/upload', body, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: HEADER.Authorization,
//       },
//     })
//     .then((res) => {
//       console.log('IMAGE UPLOAD RESPONSE', res)
//       return res.data[0]
//     })
//     .catch((err) => {
//       console.log(err)
//       return
//     })
// })

export const APL01 = createSlice({
  name: 'apl01',
  initialState,
  reducers: {
    setDefaultState: (state, action) => {
      state.isPending = false
      state.isSuccess = false
      state.isFailed = false
    },
  },
  extraReducers(builder) {
    builder
      // post
      .addCase(postAPL01.pending, (state, action) => {
        state.message = 'Mohon Tunggu'
        state.isPending = true
        state.isSuccess = false
        state.isFailed = false
      })
      .addCase(postAPL01.fulfilled, (state, action) => {
        ToastAndroid.show('POST APL-01 SUCCESS ', ToastAndroid.SHORT)
        state.message = 'APL01 Berhasil dipost'
        state.data = action.payload?.data?.data
        state.isPending = false
        state.isSuccess = true
        state.isFailed = false
      })
      .addCase(postAPL01.rejected, (state, action) => {
        ToastAndroid.show('POST APL-01 FAILED ', ToastAndroid.SHORT)
        console.log('POST APL-01 FAILED', action)
        state.message = action.error.message
        state.isPending = false
        state.isSuccess = false
        state.isFailed = true
      })

      // edit
      .addCase(editAPL01.pending, (state, action) => {
        state.message = 'Mohon Tunggu'
        state.isPending = true
        state.isSuccess = false
        state.isFailed = false
      })
      .addCase(editAPL01.fulfilled, (state, action) => {
        ToastAndroid.show('POST APL-01 SUCCESS ', ToastAndroid.SHORT)
        state.message = 'APL01 Berhasil dipost'
        state.data = action.payload?.data?.data
        state.isPending = false
        state.isSuccess = true
        state.isFailed = false
      })
      .addCase(editAPL01.rejected, (state, action) => {
        ToastAndroid.show('POST APL-01 FAILED ', ToastAndroid.SHORT)
        console.log('POST APL-01 FAILED', action)
        state.message = action.error.message
        state.isPending = false
        state.isSuccess = false
        state.isFailed = true
      })

      // approval
      .addCase(approvalAPL01.pending, (state, action) => {
        state.message = 'Mohon Tunggu'
        state.isPending = true
        state.isSuccess = false
        state.isFailed = false
      })
      .addCase(approvalAPL01.fulfilled, (state, action) => {
        ToastAndroid.show('Approval SUCCESS ', ToastAndroid.SHORT)
        state.message = 'Approval Berhasil'
        state.data = action.payload?.data?.data
        state.isPending = false
        state.isSuccess = true
        state.isFailed = false
      })
      .addCase(approvalAPL01.rejected, (state, action) => {
        ToastAndroid.show('Approval FAILED ', ToastAndroid.SHORT)
        console.log('Approval FAILED', action)
        state.message = action.error.message
        state.isPending = false
        state.isSuccess = false
        state.isFailed = true
      })
  },
})

export const { setDefaultState } = APL01.actions
export default APL01.reducer
