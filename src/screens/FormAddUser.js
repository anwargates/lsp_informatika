import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import {
  Container,
  FormControl,
  HStack,
  Input,
  Radio,
  ScrollView,
  VStack,
  Text,
  TextArea,
  Stack,
  Icon,
  Select,
  CheckIcon,
} from 'native-base'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
  Image,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native'

import { COLORS } from '../components/Colors/Colors'
import {
  editAPL01,
  postAPL01,
  setDefaultState,
  uploadFile,
} from '../features/slice/apl01Slice'
import { IMAGE_BASE_URL } from '../features/api/api'
import { FileUploader } from '../components/Forms/ImageUploader'
import { FORM_STYLES } from '../components/Styles/FormStyles'
import { GLOBAL_STYLE } from '../components/Styles/Styles'
import { InputCard } from '../components/Forms/InputCard'
import { InputCardDate } from '../components/Forms/InputCardDate'
import { ActivityIndicator } from 'react-native'
import { BlurView } from 'expo-blur'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { createUser } from '../features/slice/userSlice'
import { fetcherAsesor } from '../features/slice/asesorFetcherSlice'
import { fetcherSkema } from '../features/slice/skemaFetcherSlice'
import { fetcherEvents } from '../features/slice/eventFetcherSlice'
import { SelectCard } from '../components/Forms/SelectCard'
import { fetcherRole } from '../features/slice/roleFetcherSlice'

export default function FormAddUser({ navigation }) {
  const initialFormState = {
    // data for user
    username: '',
    email: '',
    password: '123456',
    role: '',
    confirmed: 'TRUE',
    // data for apl01
    namaLengkap: '',
    skema: '',
    event: '',
    asesor: '',
  }

  // const status = route.params.?:
  // const submitCheck = useSelector((state) => state.APL01)
  const event = useSelector((state) => state.eventFetch)
  const skema = useSelector((state) => state.skemaFetch)
  const asesor = useSelector((state) => state.asesorFetch)
  const roles = useSelector((state) => state.roleFetch)
  const dispatch = useDispatch()
  const [formState, setFormState] = useState(initialFormState)
  const [selectAsesor, setSelectAsesor] = useState(initialFormState.asesor)
  const [selectEvent, setSelectEvent] = useState(initialFormState.event)
  const [selectSkema, setSelectSkema] = useState(initialFormState.skema)
  const [selectRole, setSelectRole] = useState(initialFormState.role)

  const handleSubmit = () => {
    const formData = {
      ...formState,
      asesor: selectAsesor,
      event: selectEvent,
      skema: selectSkema,
      role: selectRole,
    }
    dispatch(createUser(formData))
    // console.log(disp)
  }

  useEffect(() => {
    dispatch(fetcherAsesor())
    dispatch(fetcherSkema())
    dispatch(fetcherEvents())
    dispatch(fetcherRole())
  }, [])

  return (
    <>
      {console.log('FORM STATE', formState)}
      {console.log('ASESOR STATE', asesor)}
      {console.log('EVENTS STATE', event)}
      {console.log('SKEMA STATE', skema)}
      {console.log('ROLE STATE', roles)}
      {/* {submitCheck.isSuccess && navigation.navigate('Asesi')} */}
      {/* {(
        <BlurView
          intensity={100}
          tint='dark'
          style={FORM_STYLES.blurContainer}>
          <ActivityIndicator
            color='black'
            size='large'
            style={FORM_STYLES.spinner}
          />
        </BlurView>
      )} */}
      <LinearGradient
        colors={COLORS.gradientMain}
        style={FORM_STYLES.container}>
        <ScrollView style={FORM_STYLES.scrollView}>
          <FormControl>
            <Text style={FORM_STYLES.headerText}>Tambah Akun</Text>
            <View style={FORM_STYLES.line} />
            <InputCard
              name='username'
              label='Username'
              icon='identifier'
              from='tambahUser'
              handle={[formState, setFormState]}
            />
            <InputCard
              name='email'
              label='Email'
              icon='at'
              from='tambahUser'
              handle={[formState, setFormState]}
            />
            <InputCard
              name='password'
              label='Password'
              icon='key'
              from='tambahUser'
              handle={[formState, setFormState]}
            />
            <InputCard
              name='namaLengkap'
              label='Nama Lengkap'
              icon='format-letter-case'
              from='tambahUser'
              handle={[formState, setFormState]}
            />
            {/* dropdowns */}
            <SelectCard
              name='roles'
              label='Pilih Role'
              icon='security'
              keyName='name'
              content={roles.response}
              handle={[selectRole, setSelectRole]}
            />
            <SelectCard
              name='event'
              label='Pilih Event'
              icon='calendar'
              keyName='namaEvent'
              content={event.response}
              handle={[selectEvent, setSelectEvent]}
            />
            <SelectCard
              name='skema'
              label='Pilih Skema'
              icon='application-brackets-outline'
              keyName='namaSkema'
              content={skema.response}
              handle={[selectSkema, setSelectSkema]}
            />
            <SelectCard
              name='asesor'
              label='Pilih Asesor'
              icon='account-tie'
              keyName='namaLengkap'
              content={asesor.response}
              handle={[selectAsesor, setSelectAsesor]}
            />
          </FormControl>
          <View style={{ height: 64 }} />
        </ScrollView>
        <KeyboardAvoidingView
          behaviour='padding'
          enabled={false}>
          <TouchableOpacity
            style={[FORM_STYLES.button, FORM_STYLES.button.submit]}
            onPress={() => handleSubmit()}>
            <Text style={FORM_STYLES.button.text}>BUAT AKUN</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  )
}
