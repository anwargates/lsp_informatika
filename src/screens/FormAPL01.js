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
import { fetchMe } from '../features/slice/authSlice'

export default function FormAPL01({ navigation, route }) {
  // console.log("ROUTE", route)
  const item = route.params?.content?.apl_01s[0]
  // const modalContent= route.params?.modalContent
  //const item = route.params.role === 'Asesi'
  //   ? route.params.authState.user.apl_01s[0]
  //   : route.params.modalContent.attributes

  console.log('ITEM CONTENT', item)
  // console.log('MODAL CONTENT', modalContent)

  const initialFormState = {
    namaLengkap: '',
    NIK: '',
    tempatLahir: '',
    tanggalLahir: '',
    kebangsaan: '',
    alamat: '',
    kodePos: '',
    nomorTelpon: '',
    email: '',
    pendidikanTerakhir: '',
  }

  const presistFormState = () => {
    const { user, skema, event, asesor, ...rest } = item
    return rest
  }

  // const status = route.params.?:
  const roleState = useSelector((state) => state.auth.user.role.name)
  const submitCheck = useSelector((state) => state.APL01)
  const dispatch = useDispatch()
  const [formState, setFormState] = useState(() => {
    if (route.params.intent === 'Add') {
      return initialFormState
    } else {
      return presistFormState()
    }
  })

  // TO CHANGE
  // state show image from local uri
  // kalau local diganti jadi formState.ijazah?.url ? IMAGE_BASE_URL + formState.ijazah?.url : null
  // kalau deployment hanya url
  const [showIjazah, setShowIjazah] = useState(
    formState.ijazah?.url ? IMAGE_BASE_URL + formState.ijazah?.url : null
  )
  const [showKTP, setShowKTP] = useState(
    formState.identitas?.url ? IMAGE_BASE_URL + formState.identitas?.url : null
  )
  const [showTranskrip, setShowTranskrip] = useState(
    formState.transkrip?.url ? IMAGE_BASE_URL + formState.transkrip?.url : null
  )
  const [showPhoto, setShowPhoto] = useState(
    formState.pasFoto?.url ? IMAGE_BASE_URL + formState.pasFoto?.url : null
  )

  // state formdata
  const [ijazah, setIjazah] = useState(formState.ijazah?.id ?? null)
  const [KTP, setKTP] = useState(formState.identitas?.id ?? null)
  const [transkrip, setTranskrip] = useState(formState.transkrip?.id ?? null)
  const [photo, setPhoto] = useState(formState.pasFoto?.id ?? null)

  // state radio
  const [jenisKelamin, setJenisKelamin] = useState(formState?.jenisKelamin)
  const [skemaSertifikasi, setSkemaSertifikasi] = useState(
    formState?.skemaSertifikasi
  )
  const [tujuanAsesmen, setTujuanAsesmen] = useState(formState?.tujuanAsesmen)

  // state tanggal lahir
  const [birthDate, setBirthDate] = useState(
    formState.tanggalLahir !== '' ? formState.tanggalLahir : new Date()
  )

  // state status approval
  const [ijazahApprovalState, setIjazahApprovalState] = useState(
    formState.ijazahApproval
  )
  const [identitasApprovalState, setIdentitasApprovalState] = useState(
    formState?.identitasApproval
  )
  const [transkripApprovalState, setTranskripApprovalState] = useState(
    formState?.transkripApproval
  )
  const [pasFotoApprovalState, setPasFotoApprovalState] = useState(
    formState?.pasFotoApproval
  )

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      dispatch(setDefaultState())
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        dispatch(fetchMe())
      }
    }, [])
  )

  const handleSubmit = async () => {
    let submitReady = {
      id: item?.id ?? '',
      inputData: {
        ...formState,
        jenisKelamin: jenisKelamin,
        tujuanAsesmen: tujuanAsesmen,
        skemaSertifikasi: skemaSertifikasi,
        tanggalLahir: birthDate,
        ijazahApproval: ijazahApprovalState,
        identitasApproval: identitasApprovalState,
        transkripApproval: transkripApprovalState,
        pasFotoApproval: pasFotoApprovalState,
      },
      fileData: {
        ijazah: ijazah,
        KTP: KTP,
        transkrip: transkrip,
        photo: photo,
      },
    }
    console.log('submit ready', submitReady)
    route.params.intent === 'Edit'
      ? await dispatch(editAPL01(submitReady))
      : await dispatch(postAPL01(submitReady))
    // console.log(disp)
  }

  return (
    <>
      {/* {console.log("FORM STATE", formState)} */}
      {/* {console.log("IJAZAH APPROVAL STATE", formState.ijazahApproval)}
      {console.log("IJAZAH APPROVAL STATE", ijazahApprovalState)} */}
      {/* {submitCheck.isSuccess && navigation.navigate('Asesi')} */}
      {submitCheck.isPending && (
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
      )}
      <LinearGradient
        colors={COLORS.gradientMain}
        style={FORM_STYLES.container}>
        <ScrollView style={FORM_STYLES.scrollView}>
          <FormControl>
            <Text style={FORM_STYLES.headerText}>Data Diri</Text>
            <View style={FORM_STYLES.line} />
            <InputCard
              name='namaLengkap'
              label='Nama Lengkap'
              icon='format-letter-case'
              handle={[formState, setFormState]}
            />
            <InputCard
              name='NIK'
              label='NIK'
              icon='identifier'
              handle={[formState, setFormState]}
            />
            {/* <InputCard
              name='kotaDomisili'
              label='Kota Domisili'
              icon='home-city'
              handle={[formState, setFormState]}
            /> */}
            <HStack space={2}>
              <InputCard
                name='tempatLahir'
                label='Tempat Lahir'
                icon='city'
                handle={[formState, setFormState]}
              />
              <InputCardDate
                name='tanggalLahir'
                label='Tanggal Lahir'
                icon='calendar'
                handle={[birthDate, setBirthDate]}
              />
            </HStack>
            <FormControl.Label _text={FORM_STYLES.inputLabel}>
              Jenis Kelamin
            </FormControl.Label>
            <HStack>
              <TouchableOpacity
                style={[
                  FORM_STYLES.genderButton,
                  FORM_STYLES.genderButton.male,
                  jenisKelamin === 'L' ? FORM_STYLES.genderButton.enabled : '',
                ]}
                onPress={() => setJenisKelamin('L')}
                disabled={roleState === 'Asesi' ? false : true}>
                <Icon
                  as={<MaterialCommunityIcons name='gender-male' />}
                  size={5}
                  mx={2}
                  alignSelf='center'
                  color={jenisKelamin === 'L' ? COLORS.secondary : COLORS.third}
                />
                <Text
                  style={[
                    jenisKelamin === 'L'
                      ? FORM_STYLES.genderButton.enabled.text
                      : FORM_STYLES.genderButton.text,
                  ]}>
                  Laki-Laki
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  FORM_STYLES.genderButton,
                  FORM_STYLES.genderButton.female,
                  jenisKelamin === 'P' ? FORM_STYLES.genderButton.enabled : '',
                ]}
                onPress={() => setJenisKelamin('P')}
                disabled={roleState === 'Asesi' ? false : true}>
                <Icon
                  as={<MaterialCommunityIcons name='gender-female' />}
                  size={5}
                  mx={2}
                  alignSelf='center'
                  color={jenisKelamin === 'P' ? COLORS.secondary : COLORS.third}
                />
                <Text
                  style={[
                    jenisKelamin === 'P'
                      ? FORM_STYLES.genderButton.enabled.text
                      : FORM_STYLES.genderButton.text,
                  ]}>
                  Perempuan
                </Text>
              </TouchableOpacity>
            </HStack>
            {/* <InputCard
              name='kebangsaan'
              label='Kebangsaan'
              icon='flag'
              handle={[formState, setFormState]}
            /> */}
            <InputCard
              name='alamat'
              label='Alamat Rumah'
              icon='home'
              handle={[formState, setFormState]}
            />
            {/* <InputCard
              name='kodePos'
              label='Kode Pos'
              icon='mailbox'
              handle={[formState, setFormState]}
            /> */}
            <InputCard
              name='nomorTelpon'
              label='Nomor Telepon'
              icon='whatsapp'
              handle={[formState, setFormState]}
            />
            <InputCard
              name='email'
              label='Email'
              icon='email'
              handle={[formState, setFormState]}
            />
            <InputCard
              name='pendidikanTerakhir'
              label='Pendidikan Terakhir'
              icon='book-education'
              handle={[formState, setFormState]}
            />
            <HStack style={{ justifyContent: 'space-between' }}>
              <VStack style={{ marginVertical: 8 }}>
                <FormControl.Label _text={FORM_STYLES.inputLabel}>
                  Skema Sertifikasi
                </FormControl.Label>
                <Radio.Group
                  name='skemaSertifikasi'
                  value={skemaSertifikasi}
                  onChange={(v) => {
                    setSkemaSertifikasi(v)
                  }}
                  isReadOnly={roleState === 'Asesi' ? false : true}>
                  <Radio
                    value='KKNI'
                    my={1}>
                    KKNI
                  </Radio>
                  <Radio
                    value='Okupasi'
                    my={1}>
                    Okupasi
                  </Radio>
                  <Radio
                    value='Klaster'
                    my={1}>
                    Klaster
                  </Radio>
                </Radio.Group>
              </VStack>
              <VStack style={{ marginVertical: 8 }}>
                <FormControl.Label _text={FORM_STYLES.inputLabel}>
                  Tujuan Assesment
                </FormControl.Label>
                <Radio.Group
                  name='tujuanAsesmen'
                  value={tujuanAsesmen}
                  onChange={(v) => {
                    setTujuanAsesmen(v)
                  }}
                  isReadOnly={roleState === 'Asesi' ? false : true}>
                  <Radio
                    value='Sertifikat Baru'
                    my={1}>
                    Sertifikat Baru
                  </Radio>
                  <Radio
                    value='Sertifikasi Ulang'
                    my={1}>
                    Sertifikasi Ulang
                  </Radio>
                </Radio.Group>
              </VStack>
            </HStack>
            <Text style={FORM_STYLES.headerText}>Upload File</Text>
            <View style={FORM_STYLES.line} />
            <FileUploader
              type='Ijazah'
              handleShow={[showIjazah, setShowIjazah]}
              handleFormData={[ijazah, setIjazah]}
              handleApproval={[ijazahApprovalState, setIjazahApprovalState]}
            />
            <FileUploader
              type='KTP'
              handleShow={[showKTP, setShowKTP]}
              handleFormData={[KTP, setKTP]}
              handleApproval={[
                identitasApprovalState,
                setIdentitasApprovalState,
              ]}
            />
            <FileUploader
              type='Transkrip'
              handleShow={[showTranskrip, setShowTranskrip]}
              handleFormData={[transkrip, setTranskrip]}
              handleApproval={[
                transkripApprovalState,
                setTranskripApprovalState,
              ]}
            />
            <FileUploader
              type='Foto'
              handleShow={[showPhoto, setShowPhoto]}
              handleFormData={[photo, setPhoto]}
              handleApproval={[pasFotoApprovalState, setPasFotoApprovalState]}
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
            <Text style={FORM_STYLES.button.text}>SIMPAN</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  )
}
