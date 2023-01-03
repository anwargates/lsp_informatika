import { StyleSheet } from 'react-native'
import { COLORS } from '../Colors/Colors'
import { GLOBAL_STYLE } from './Styles'

export const FORM_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: GLOBAL_STYLE.paddingTop,
    // padding: 4,
    backgroundColor: COLORS.primary,
  },
  blurContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 998,
  },
  spinner: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    // zIndex: 999,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    borderWidth: 1,
    borderBottomColor: 'black',
  },
  inputCard: {
    flex: 1,
    marginVertical: 2,
    // borderBottomWidth: 1,
    // borderBottomColor: 'black',
    // shadowColor: '#000000',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    // elevation: 2,
  },
  inputCardFile: {
    flex: 1,
    marginVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  inputFile: {
    flex: 1,
    zIndex: -1,
    justifyContent: 'center',
    marginHorizontal: 8,
    marginTop: 12,
    marginBottom: 0,
    borderRadius: 8,
    padding: 16,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  inputLabel: {
    color: COLORS.third,
    fontSize: 16,
    // paddingLeft: 2,
  },
  input: {
    // backgroundColor: COLORS.secondary,
    fontSize: 16,
    // borderWidth: 1,
    // borderColor: 'black',
  },
  button: {
    flex: 1,
    padding: 8,
    borderRadius: 16,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.fourth,
    submit: {
      height: 50,
      borderRadius: 0,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    text: {
      color: 'white',
      textAlign: 'center',
    },
  },
  genderButton: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    marginVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    text: {
      color: COLORS.third,
      alignSelf: 'center',
    },
    male: {
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },
    female: {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    },
    enabled: {
      backgroundColor: COLORS.third,
      text: {
        color: COLORS.secondary,
        alignSelf: 'center',
      },
    },
  },
  approval: {
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  approvalButton: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50,
    marginVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    text: {
      color: COLORS.third,
      alignSelf: 'center',
    },
    left: {
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },
    right: {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    },
    enabled: {
      backgroundColor: COLORS.third,
      text: {
        color: COLORS.secondary,
        alignSelf: 'center',
      },
    },
  },
})
