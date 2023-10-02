import Title from "../components/Title";

import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../constants/colors";
import PrimaryButton from "../components/PrimaryButton";

export default function GameOverScreen(props) {
  return (
    <View style={styles.screen}>
      <Title>Game Over!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text>Your phone needed</Text>
      <Text>{props.roundsNumber} rounds</Text>
      <Text>to guess the number</Text>
      <Text>{props.userNumber}</Text>
      <PrimaryButton onPress={props.onStartNewGame}>NEW GAME</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
