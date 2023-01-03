import React, { useEffect, useState } from 'react'
import { Fab, Icon, Input } from 'native-base'
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Easing,
  TextInput,
} from 'react-native'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { ToastAndroid } from 'react-native'
import Modal from 'react-native-modalbox'
import { GLOBAL_STYLE } from '../components/Styles/Styles'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS } from '../components/Colors/Colors'
import { RefreshControl } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { FORM_STYLES } from '../components/Styles/FormStyles'
import { BlurView } from 'expo-blur'
import { useFocusEffect } from '@react-navigation/native'
import { fetchAsesor, searchAsesor } from '../features/slice/asesorSlice'

export default function Asesor({ navigation }) {
  const [refreshing, setRefreshing] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const asesorState = useSelector((state) => state.asesor)

  const dispatch = useDispatch()

  const loadData = () => {
    setRefreshing(true)
    dispatch(fetchAsesor())
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
      setRefreshing(false)
    )
  }

  const handleSelectItem = (item) => {
    setModalContent(item)
    setIsOpen(true)
  }

  const handleSearch = () => {
    dispatch(searchAsesor(search))
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <LinearGradient
      colors={COLORS.gradientMain}
      style={styles.container}>
      {console.log('ON HOME STATE', asesorState)}
      {/* {asesorState.isPending ? (
        <BlurView
          intensity={50}
          tint='dark'
          style={FORM_STYLES.blurContainer}>
          <ActivityIndicator
            color='black'
            size='large'
            style={FORM_STYLES.spinner}
          />
        </BlurView>
      ) : null} */}
      <Input
        InputRightElement={
          <TouchableOpacity
            onPress={handleSearch}>
            <Icon
              as={<MaterialCommunityIcons name='magnify' />}
              size={6}
              mx='2'
              color={COLORS.third}
            />
          </TouchableOpacity>
        }
        mx={2}
        focusOutlineColor={COLORS.third}
        backgroundColor='white'
        variant='rounded'
        borderColor='white'
        value={search}
        placeholder='Cari Asesor'
        onEndEditing={(e) => {
          handleSearch()
          setSearch(e)
        }}
        onChangeText={(e) => setSearch(e)}
        style={styles.searchBar}
      />
      <FlatList
        style={styles.flatlist}
        data={asesorState?.profiles}
        refreshControl={
          <RefreshControl
            // refreshing={refreshing}
            refreshing={asesorState.isPending}
            onRefresh={loadData}
          />
        }
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                style={styles.card}
                // onPress={() => handleSelectItem(item)}
                >
                <Text style={styles.card.text}>
                  {item?.asesorAccount?.namaLengkap}
                </Text>
                <Text>{item?.email}</Text>
              </TouchableOpacity>
            </>
          )
        }}></FlatList>
      <Modal
        style={styles.modal}
        swipeToClose={true}
        position={'bottom'}
        coverScreen={true}
        animationDuration={100}
        easing={Easing.elastic(0)}
        isOpen={isOpen}
        onClosed={() => setIsOpen(false)}>
        {console.log('SELECTED MODAL CONTENT', modalContent)}
        <Text style={styles.modal.heading}>
          {modalContent?.asesorAccount?.namaLengkap}
        </Text>
        <Text style={styles.modal.subHeading}>{modalContent?.email}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FormAPL01', {
              asesorID: modalContent.asesorAccount,
              role: 'Asesor',
              intent: 'Edit',
            })
            setIsOpen(false)
          }}
          style={styles.button}>
          <AntDesign
            style={styles.button.icon}
            name='form'
          />
          <Text style={styles.button.text}>APL-01</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button}>
          <AntDesign
            style={styles.button.icon}
            name='form'
          />
          <Text style={styles.button.text}>APL-02</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <AntDesign
            style={styles.button.icon}
            name='form'
          />
          <Text style={styles.button.text}>AK-01</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <AntDesign
            style={styles.button.icon}
            name='form'
          />
          <Text style={styles.button.text}>AK-02</Text>
        </TouchableOpacity> */}
      </Modal>
      {/* <Fab
        renderInPortal={false}
        zIndex={1}
        shadow={2}
        size='lg'
        color='white'
        label='Tambah Data'
        onPress={() =>
          navigation.navigate('FormAPL01', {
            role: 'Admin',
            intent: 'Add',
          })
        }
        icon={
          <Icon
            color='white'
            as={AntDesign}
            name='plus'
            size='md'
          />
        }
      /> */}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: GLOBAL_STYLE.paddingTop,
    // padding: 16,
    // alignItems: "center",
    // justifyContent: "center",
  },
  searchBar: {
    // width: '98%',
    // alignSelf: 'center',
    left: 16,
    right: 16,
    height: 40,
    // padding: 8,
    // borderRadius: 32,
    // flexDirection: 'row',
    // backgroundColor: '#ffffff',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,

    // elevation: 4,

    zIndex: 2,
  },
  text: {
    color: '#ffffff',
    fontSize: 30,
  },
  flatlist: {
    // paddingBottom: 32
  },
  card: {
    flex: 1,
    width: '90%',
    // marginHorizontal: 16,
    alignSelf: 'center',
    padding: 8,
    borderRadius: 8,
    marginVertical: 2,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,

    text: {
      fontSize: 16,
      //   color: "#00ff00",
    },
  },
  modal: {
    // flex: 1,
    width: '100%',
    height: null,
    padding: 16,
    justifyContent: 'center',
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    // alignItems: 'center',
    heading: {
      fontSize: 32,
      textAlign: 'left',
    },
    subHeading: {
      fontSize: 16,
      textAlign: 'left',
      marginBottom: 8,
    },
  },
  button: {
    // flex: 1,
    width: '100%',
    flexDirection: 'row',
    marginHorizontal: 1,
    // borderWidth: 1,
    // backgroundColor: "#3B5998",
    // borderRadius: 8,
    padding: 16,
    icon: {
      fontSize: 28,
    },
    text: {
      fontSize: 20,
      marginLeft: 16,
      color: 'black',
    },
  },
})
