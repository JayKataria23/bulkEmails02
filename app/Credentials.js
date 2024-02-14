import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { Colors } from "./components/Colors";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";

const screenWidth = Dimensions.get("window").width;

const Credentials = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sec, setSec] = useState(false);
  return (
    <View style={styles.container}>
      <Image
        style={[
          styles.logo,
          {
            width: screenWidth * 0.6,
          },
        ]}
        source={{ uri: "https://www.myfavdesigners.com/images/myfav-logo.svg" }}
      ></Image>
      <ScrollView>
        <Text
          style={[
            styles.headline,
            {
              fontSize: screenWidth > 600 ? 22 : 16,
            },
          ]}
        >
          Enter your credentials.
        </Text>
        <TextInput
          placeholder="Email or Phone"
          value={email}
          onChangeText={setEmail}
          style={[
            styles.input,
            { fontSize: screenWidth > 600 ? 22 : 16, width: screenWidth * 0.8 },
          ]}
        ></TextInput>
        <View
          style={[
            styles.input,
            styles.passwordContainer,
            {
              fontSize: screenWidth > 600 ? 22 : 16,
              width: screenWidth * 0.8,
            },
          ]}
        >
          <TextInput
            style={[
              styles.password,
              {
                fontSize: screenWidth > 600 ? 22 : 16,
              },
            ]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={sec}
          ></TextInput>
          <TouchableOpacity onPress={() => setSec(!sec)}>
            <Feather
              name={sec ? "eye" : "eye-off"}
              size={screenWidth > 600 ? 28 : 22}
              color={Colors.placeholder}
            />
          </TouchableOpacity>
        </View>
        <Link href="/EmailScreen" asChild>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.button}>
              <Text
                style={[
                  styles.buttonText,
                  {
                    fontSize: screenWidth > 600 ? 22 : 16,

                  },
                ]}
              >
                Submit
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </View>
  );
};

export default Credentials;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg,
  },
  logo: {
    aspectRatio: 3 / 1,

    alignSelf: "center",
    margin: 20,
    resizeMode: "contain",
  },
  headline: {
    alignSelf: "center",
    color: Colors.text,
    marginTop: 50,
    marginBottom: 30,
  },
  input: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#F1F1F1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    color: Colors.placeholder,
    maxWidth: 400,
  },
  password: {
    color: Colors.placeholder,
    width: "100%",
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: Colors.button,
    alignSelf: "center",
    margin: 40,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.bg,
    fontWeight: 500,
  },
});
