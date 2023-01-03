import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FormControl, Input, VStack, TextArea, Icon } from 'native-base'
import { useSelector } from 'react-redux'
import { COLORS } from '../Colors/Colors'
import { FORM_STYLES } from '../Styles/FormStyles'

export const InputCard = (props) => {
  const roleState = useSelector((state) => state.auth.user.role.name)
  const [formState, setFormState] = props.handle

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
      {props.name !== 'alamatRumah' ? (
        <Input
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
          // variant='rounded'
          value={formState[props.name]}
          placeholder={props.label}
          name={props.name}
          onChangeText={(value) => handleChange(props.name, value)}
          style={FORM_STYLES.input}
          isReadOnly={roleState === 'Asesi' || props.from === 'tambahUser' ? false : true}
        />
      ) : (
        <TextArea
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
          placeholder={props.label}
          value={formState}
          onChangeText={(value) => handleChange(props.name, value)}
          style={FORM_STYLES.input}
          isReadOnly={roleState === 'Asesi' ? false : true}
        />
      )}
    </VStack>
  )
}
