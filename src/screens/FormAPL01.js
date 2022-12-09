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

export default function FormAPL01({ navigation }) {
  const submitCheck = useSelector((state) => state.APL01)
  const dispatch = useDispatch()
  const [formState, setFormState] = useState({
    namaLengkap: '',
    NIK: '',
    kotaDomisili: '',
    tempatLahir: '',
    tanggalLahir: '',
    kebangsaan: '',
    alamatRumah: '',
    kodePos: '',
    nomorTelepon: '',
    email: '',
    pendidikanTerakhir: '',
  })
  // state show image from local uri
  const [showIjazah, setShowIjazah] = useState(null)
  const [showKTP, setShowKTP] = useState(null)
  const [showTranskrip, setShowTranskrip] = useState(null)
  const [showPhoto, setShowPhoto] = useState(null)

  // state formdata
  const [ijazah, setIjazah] = useState(null)
  const [KTP, setKTP] = useState(null)
  const [transkrip, setTranskrip] = useState(null)
  const [photo, setPhoto] = useState(null)

  // state radio
  const [jenisKelamin, setJenisKelamin] = useState('L')
  const [skemaSertifikasi, setSkemaSertifikasi] = useState(null)
  const [tujuanAsesmen, setTujuanAsesmen] = useState(null)

  // state tanggal lahir
  const [birthDate, setBirthDate] = useState(new Date())

  // const [fileID, setFileID] = useState({
  //   ijazah: null,
  //   KTP: null,
  //   transkrip: null,
  //   photo: null,
  // })

  useEffect(() => {
    dispatch(setDefaultState())
  }, [])

  useEffect(() => {
    // console.log('formState', formState)
  }, [formState])

  // const handleFileUpload = () => {
  //   const disp1 = dispatch(uploadFile(ijazah))
  //   const disp2 = dispatch(uploadFile(KTP))
  //   const disp3 = dispatch(uploadFile(transkrip))
  //   const disp4 = dispatch(uploadFile(photo))
  //   Promise.all([disp1, disp2, disp3, disp4]).then((v) =>
  //     console.log('PROMISE RESPONSE', v)
  //   )
  //   // console.log('DISPATCH RETURN IJAZAH', disp1)
  //   // console.log('DISPATCH RETURN KTP', disp2)
  //   // console.log('DISPATCH RETURN TRANSKRIP', disp3)
  //   // console.log('DISPATCH RETURN PHOTO', disp4)
  // }

  const handleSubmit = () => {
    let submitReady = {
      inputData: {
        ...formState,
        jenisKelamin: jenisKelamin,
        tujuanAsesmen: tujuanAsesmen,
        skemaSertifikasi: skemaSertifikasi,
        tanggalLahir: birthDate,
      },
      fileData: {
        ijazah: ijazah,
        KTP: KTP,
        transkrip: transkrip,
        photo: photo,
      },
    }
    console.log('submit ready', submitReady)
    dispatch(postAPL01(submitReady))
    // console.log(disp)
  }

  return (
    <>
      {submitCheck.isSuccess && navigation.navigate('Asesi')}
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
            <InputCard
              name='kotaDomisili'
              label='Kota Domisili'
              icon='home-city'
              handle={[formState, setFormState]}
            />
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
            <HStack>
              <TouchableOpacity
                style={[
                  FORM_STYLES.genderButton,
                  FORM_STYLES.genderButton.male,
                  jenisKelamin === 'L' ? FORM_STYLES.genderButton.enabled : '',
                ]}
                onPress={() => setJenisKelamin('L')}>
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
                onPress={() => setJenisKelamin('P')}>
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
            <InputCard
              name='kebangsaan'
              label='Kebangsaan'
              icon='flag'
              handle={[formState, setFormState]}
            />
            <InputCard
              name='alamatRumah'
              label='Alamat Rumah'
              icon='home'
              handle={[formState, setFormState]}
            />
            <InputCard
              name='kodePos'
              label='Kode Pos'
              icon='mailbox'
              handle={[formState, setFormState]}
            />
            <InputCard
              name='nomorTelepon'
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
                  }}>
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
                  }}>
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
            />
            <FileUploader
              type='KTP'
              handleShow={[showKTP, setShowKTP]}
              handleFormData={[KTP, setKTP]}
            />
            <FileUploader
              type='Transkrip'
              handleShow={[showTranskrip, setShowTranskrip]}
              handleFormData={[transkrip, setTranskrip]}
            />
            <FileUploader
              type='Foto'
              handleShow={[showPhoto, setShowPhoto]}
              handleFormData={[photo, setPhoto]}
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
            <Text style={FORM_STYLES.button.text}>Submit</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  )
}
