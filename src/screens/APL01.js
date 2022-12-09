import React from 'react'
import { Container, Fab, Icon, ScrollView, Text, View } from 'native-base'
import { GLOBAL_STYLE } from '../components/Styles/Styles'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../components/Colors/Colors'
import { Image } from 'react-native'
import { BASE_URL, IMAGE_BASE_URL } from '../features/api/api'
import { AntDesign } from '@expo/vector-icons'

export default function APL01({ navigation, route }) {
  //TODO masih perlu fix
  const item =
    route.params.role === 'Asesi'
      ? route.params.authState.user.apl_01s[0]
      : route.params.modalContent.attributes
  console.log('route params', item)
  return (
    <LinearGradient
      colors={COLORS.gradientMain}
      style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>{item?.namaLengkap}</Text>
        <Text>{item?.NIK}</Text>
        <Text>{item?.kotaDomisili}</Text>
        <Text>{item?.tempatLahir}</Text>
        <Text>{item?.tanggalLahir}</Text>
        <Text>{item?.jenisKelamin}</Text>
        <Text>{item?.kebangsaan}</Text>
        <Text>{item?.alamat}</Text>
        <Text>{item?.kodePos}</Text>
        <Text>{item?.nomorTelepon}</Text>
        <Text>{item?.email}</Text>
        <Text>{item?.pendidikanTerakhir}</Text>
        <Text>{item?.skemaSertifikasi}</Text>
        <Text>{item?.tujuanAsesmen}</Text>

        {/* kalau local diganti jadi IMAGE_BASE_URL + item.ijazah?.data?.attributes.url */}
        <Image
          style={styles.image}
          source={{ uri: item?.ijazah?.data?.attributes.url }}
        />
        <Image
          style={styles.image}
          source={{ uri: item?.pasFoto?.data?.attributes.url }}
        />
        <Image
          style={styles.image}
          source={{ uri: item?.identitas?.data?.attributes.url }}
        />
        <Image
          style={styles.image}
          source={{ uri: item?.transkrip?.data?.attributes.url }}
        />
        {/* {console.log(IMAGE_BASE_URL + item.ijazah?.data?.attributes.url)} */}
      </ScrollView>
      <Fab
        renderInPortal={false}
        zIndex={1}
        shadow={2}
        size='lg'
        label="Edit"
        onPress={() => navigation.navigate('FormAPL01')}
        icon={
          <Icon
            color='white'
            as={AntDesign}
            name='edit'
            size='md'
          />
        }
      />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: GLOBAL_STYLE.paddingTop,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  image: {
    width: '80%',
    height: 250,
  },
})
