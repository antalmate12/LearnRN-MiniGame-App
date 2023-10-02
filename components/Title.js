import { Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

export default function Title(props) {
  return <Text style={styles.title}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.accent500,
    borderColor: Colors.accent500,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    textAlign: "center",
    marginBottom: 16,
  },
});
