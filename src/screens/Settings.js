import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function Settings({ navigation }) {

  return (
    <>
      {/* <NavBar title="Screen Title" /> */}
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.text}>This is Settings Page</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: "#187CC2",
    // alignItems: "center",
    // justifyContent: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 30,
  },
  row: {
    flexDirection: "row",
  },
  card: {
    width: "100%",
    margin: 5,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    // padding: 5,
    // alignItems: "center",
  },
});
