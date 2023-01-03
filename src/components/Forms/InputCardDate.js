import { FormControl, Input, VStack, TextArea, Icon } from 'native-base'
import { TouchableOpacity } from 'react-native'
import moment from 'moment/moment'
import DateTimePicker from '@react-native-community/datetimepicker'

import { FORM_STYLES } from '../Styles/FormStyles'
import { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS } from '../Colors/Colors'
import { useSelector } from 'react-redux'

export const InputCardDate = (props) => {
  const roleState = useSelector((state) => state.auth.user.role.name)
  const [birthDate, setBirthDate] = props.handle
  const [showBirthDate, setShowBirthDate] = useState(false)

  const onChangeStart = (event, selectedDate) => {
    setBirthDate(selectedDate)
    setShowBirthDate(false)
  }

  const handleChange = (name, value) => {
    // console.log('handleChange Name', name)
    // console.log('handleChange Value', value)
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  return (
    <VStack style={FORM_STYLES.inputCard}>
      <FormControl.Label _text={FORM_STYLES.inputLabel}>
        {props.label}
      </FormControl.Label>
      <TouchableOpacity
        style={FORM_STYLES.input}
        disabled={roleState === 'Asesi' ? false : true}
        onPress={() => {
          setShowBirthDate(true)
        }}>
        <Input
          name={props.name}
          // variant='rounded'
          InputLeftElement={
            <Icon
              as={<MaterialCommunityIcons name={props.icon} />}
              size={5}
              ml='2'
              color={COLORS.third}
            />
          }
          focusOutlineColor={COLORS.third}
          backgroundColor='white'
          borderColor='white'
          style={FORM_STYLES.input}
          isRequired={true}
          isReadOnly={true}
          value={moment(birthDate).format('YYYY-MM-DD')}
        />
      </TouchableOpacity>
      {showBirthDate && (
        <DateTimePicker
          testID='dateTimePicker'
          value={birthDate}
          mode='date'
          onChange={onChangeStart}
        />
      )}
    </VStack>
  )
}
