import * as ImagePicker from 'expo-image-picker'
import { Image } from 'react-native'
import ImageView from 'react-native-image-viewing'
import { IMAGE_BASE_URL } from '../../features/api/api'
import { FormControl, HStack, VStack, Text, Icon, Switch } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { FORM_STYLES } from '../Styles/FormStyles'
import { COLORS } from '../Colors/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const FileUploader = (props) => {
  const roleState = useSelector((state) => state.auth.user.role.name)
  const [showImage, setShowImage] = props.handleShow
  const [formData, setFormData] = props.handleFormData
  const [status, setStatus] = props.handleApproval
  // props.checked
  const [visible, setIsVisible] = useState(false)

  const deletePhoto = () => {
    setShowImage(null)
    setFormData(null)
  }

  const pickFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    })
    // console.log('result', result)

    if (result.canceled) {
      return
    }

    let localUri = result.assets[0].uri
    setShowImage(localUri)
    // console.log('localuri', localUri)
    let filename = localUri.split('/').pop()

    let match = /\.(\w+)$/.exec(filename)
    let type = match ? `image/${match[1]}` : `image`

    let formData = new FormData()
    formData.append('files', { uri: localUri, name: filename, type })
    console.log('formData', formData)
    setFormData(formData)
  }

  return (
    <>
      <FormControl.Label _text={FORM_STYLES.inputLabel}>
        {props.type}
      </FormControl.Label>
      <VStack style={FORM_STYLES.inputCardFile}>
        {roleState === 'Asesi' && showImage && (
          <TouchableOpacity
            // zIndex={2}
            // position='absolute'
            // right={6}
            // top={6}
            onPress={deletePhoto}>
            <Icon
              as={<MaterialCommunityIcons name='close-circle' />}
              zIndex={2}
              position='absolute'
              right={6}
              top={6}
              size={6}
              color='red.500'
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          // disabled={showImage ? true : false}
          onPress={() => (showImage ? setIsVisible(true) : pickFile())}
          style={FORM_STYLES.inputFile}
          disabled={roleState === 'Asesi' || showImage ? false : true}>
          {showImage ? (
            <Image
              style={{ width: 200, height: 200, alignSelf: 'center' }}
              alt='Pilih File'
              // source={{ uri: IMAGE_BASE_URL + photo?.url }}
              source={{ uri: showImage }}
            />
          ) : (
            <>
              <VStack
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  as={<MaterialCommunityIcons name='cloud-upload-outline' />}
                  size={100}
                  alignSelf='center'
                  color={COLORS.primary}
                />
                <Text
                  textAlign='center'
                  fontSize={26}>
                  Upload your file
                </Text>
              </VStack>
            </>
          )}
        </TouchableOpacity>
        <VStack style={FORM_STYLES.approval}>
          <Text fontSize={20}>Memenuhi Syarat</Text>
          <HStack>
            <TouchableOpacity
              style={[
                FORM_STYLES.genderButton,
                FORM_STYLES.genderButton.male,
                status === null ? FORM_STYLES.genderButton.enabled : '',
              ]}
              disabled={roleState === 'Asesi' ? true : false}
              onPress={() => setStatus(null)}>
              <Icon
                as={<MaterialCommunityIcons name='null' />}
                size={5}
                mx={2}
                alignSelf='center'
                color={status === null ? COLORS.secondary : COLORS.third}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                FORM_STYLES.genderButton,
                status === false
                  ? { borderColor: 'red', backgroundColor: 'red' }
                  : '',
              ]}
              disabled={roleState === 'Asesi' ? true : false}
              onPress={() => setStatus(false)}>
              <Icon
                as={<MaterialCommunityIcons name='close' />}
                size={5}
                mx={2}
                alignSelf='center'
                color={status === false ? COLORS.secondary : 'red.500'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                FORM_STYLES.genderButton,
                FORM_STYLES.genderButton.female,
                status === true
                  ? { borderColor: 'green', backgroundColor: 'green' }
                  : '',
              ]}
              disabled={roleState === 'Asesi' ? true : false}
              onPress={() => setStatus(true)}>
              <Icon
                as={<MaterialCommunityIcons name='check' />}
                size={5}
                mx={2}
                alignSelf='center'
                color={status === 'true' ? COLORS.secondary : 'green.500'}
              />
            </TouchableOpacity>
          </HStack>
          {/* <Switch
            size='lg'
            isChecked={checked}
            onToggle={() => setChecked(!checked)}
          /> */}
        </VStack>
        <ImageView
          images={[{ uri: showImage }]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </VStack>
    </>
  )
}
