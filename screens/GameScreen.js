import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Button,
  FlatList,
} from "react-native";
import Title from "../components/Title";
import PrimaryButton from "../components/PrimaryButton";

function generateRandomBetween(min, max, exclude) {
  min = Math.ceil(min);
  max = Math.floor(max);

  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  }

  return randomNumber;
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen(props) {
  const initialGuess = generateRandomBetween(1, 100, props.userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === props.userNumber) {
      props.onGameOver(guessRounds);
    }
  }, [currentGuess, props.userNumber, props.onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < props.userNumber) ||
      (direction === "higher" && currentGuess > props.userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess;
    }

    const newGuess = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    setCurrentGuess(newGuess);
    setGuessRounds((guessRounds) => [newGuess, ...guessRounds]);
  }

  return (
    <View style={styles.screen}>
      <Title>Oponent's Guess</Title>
      <Text style={styles.userNumber}>{currentGuess}</Text>

      <View>
        <Text
          style={{
            color: "#fff",
            alignSelf: "center",
            marginBottom: 8,
            fontSize: 20,
          }}
        >
          Higher or lower?
        </Text>
        <View style={styles.plusMinusContainer}>
          <PrimaryButton
            onPress={() => nextGuessHandler("lower")}
            style={{ flex: 1 }}
          >
            -
          </PrimaryButton>
          <PrimaryButton
            onPress={() => nextGuessHandler("higher")}
            style={{ flex: 1 }}
          >
            +
          </PrimaryButton>
        </View>
      </View>

      <FlatList
        style={{ marginTop: 16 }}
        data={guessRounds}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: index % 2 === 0 ? "#fff" : "#eee",
              padding: 8,
              marginVertical: 4,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 16 }}>#{guessRounds.length - index}</Text>
            <Text style={{ fontSize: 16 }}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  userNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  plusMinusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
