import { StatusBar } from 'expo-status-bar'
import { Provider as PaperProvider } from 'react-native-paper'
import { NativeBaseProvider } from 'native-base'
import { Provider } from 'react-redux'
import { store } from './src/app/store'

import Stacks from './src/routers/Stacks'

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NativeBaseProvider>
          <StatusBar style='auto' />
          <Stacks/>
        </NativeBaseProvider>
      </PaperProvider>
    </Provider>
  )
}