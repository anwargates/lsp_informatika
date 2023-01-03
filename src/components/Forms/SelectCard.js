import { MaterialCommunityIcons } from '@expo/vector-icons'
import {
  FormControl,
  Input,
  VStack,
  TextArea,
  Icon,
  Select,
  CheckIcon,
} from 'native-base'
import { COLORS } from '../Colors/Colors'
import { FORM_STYLES } from '../Styles/FormStyles'

export const SelectCard = (props) => {
  const [formState, setFormState] = props.handle
  const selectItem = props.content
  const keyName = props.keyName

  return (
    <VStack style={FORM_STYLES.inputCard}>
      <FormControl.Label _text={FORM_STYLES.inputLabel}>
        {props.label}
      </FormControl.Label>
      <Select
        selectedValue={formState}
        minWidth='200'
        placeholder={props.label}
        _selectedItem={{
          bg: COLORS.primary,
          borderRadius: '16',
          color: 'white', // i don't know why it doesn't work
          endIcon: (
            <CheckIcon
              size='5'
              color='white'
            />
          ),
        }}
        onValueChange={(itemValue) => setFormState(itemValue)}
        focusOutlineColor={COLORS.third}
        backgroundColor='white'
        borderColor='white'
        InputLeftElement={
          <Icon
            as={<MaterialCommunityIcons name={props.icon} />}
            size={5}
            ml='2'
            color={COLORS.third}
          />
        }
        style={FORM_STYLES.input}>
        {selectItem?.map((item) => (
          <Select.Item
            key={item.id}
            label={props.name !== 'roles' ? item.attributes[keyName] : item.name}
            value={item.id}
          />
        ))}
      </Select>
    </VStack>
  )
}
