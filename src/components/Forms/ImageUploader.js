import * as ImagePicker from 'expo-image-picker'
import { Image } from 'react-native'
import { IMAGE_BASE_URL } from '../../features/api/api'
import { FormControl, HStack, VStack, Text, Icon } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { FORM_STYLES } from '../Styles/FormStyles'
import { COLORS } from '../Colors/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export const FileUploader = (props) => {
  const [showImage, setShowImage] = props.handleShow
  const [formData, setFormData] = props.handleFormData

  const deletePhoto = async () => {
    setShowImage(null)
  }

  const takePhotoAndUpload = async () => {
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
      {/* <VStack style={FORM_STYLES.inputCardFile}>
        <HStack style={{ padding: 16 }}>
          <Image
            style={{ width: 200, height: 200 }}
            alt='Pilih File'
            // source={{ uri: IMAGE_BASE_URL + photo?.url }}
            source={{ uri: showImage }}
          />
          <VStack style={{ flex: 1 }}>
            <TouchableOpacity
              style={[
                FORM_STYLES.button,
                { margin: 16, backgroundColor: COLORS.third },
              ]}
              onPress={deletePhoto}>
              <Text style={FORM_STYLES.button.text}>Hapus File</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                FORM_STYLES.button,
                ,
                { margin: 16, backgroundColor: COLORS.third },
              ]}
              onPress={takePhotoAndUpload}>
              <Text style={FORM_STYLES.button.text}>Upload File</Text>
            </TouchableOpacity>
          </VStack>
        </HStack>
      </VStack> */}
      <VStack style={FORM_STYLES.inputCardFile}>
        {showImage && (
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
              color='red.200'
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          disabled={showImage ? true : false}
          onPress={takePhotoAndUpload}
          style={FORM_STYLES.inputFile}>
          {showImage ? (
            <Image
              style={{ width: 200, height: 200, alignSelf: 'center' }}
              alt='Pilih File'
              // source={{ uri: IMAGE_BASE_URL + photo?.url }}
              source={{ uri: showImage }}
            />
          ) : (
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
              <Text textAlign='center' fontSize={26}>Upload your file</Text>
            </VStack>
          )}
          {/* <HStack style={{ flex: 1 }}>
            <TouchableOpacity
              style={[
                FORM_STYLES.button,
                { margin: 16, backgroundColor: COLORS.third },
              ]}
              onPress={deletePhoto}>
              <Text style={FORM_STYLES.button.text}>Hapus File</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                FORM_STYLES.button,
                ,
                { margin: 16, backgroundColor: COLORS.third },
              ]}
              onPress={takePhotoAndUpload}>
              <Text style={FORM_STYLES.button.text}>Upload File</Text>
            </TouchableOpacity>
          </HStack> */}
        </TouchableOpacity>
      </VStack>
    </>
  )
}
