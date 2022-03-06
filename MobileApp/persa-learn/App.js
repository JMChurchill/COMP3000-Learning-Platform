// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import colors from "./app/config/colors";

import Navigation from "./app/navigation";
import HomeScreen from "./app/screens/HomeScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
      {/* <Text>React native!</Text>
      <StatusBar style="auto" /> */}
      {/* <HomeScreen /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: colors.mainBackground,
  },
});
