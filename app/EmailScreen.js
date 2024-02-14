import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  SectionList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "./components/Colors";
import { Dimensions } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";

const screenWidth = Dimensions.get("window").width;

const EmailScreen = () => {
  const [files, setFiles] = useState(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [attachments, setAttachments] = useState([]);

  const selectFile = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        type: "text/comma-separated-values",
      });
      setFiles(doc.assets[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const selectAttachments = async () => {
    try {
      const doc = await DocumentPicker.getDocumentAsync({
        multiple: "true",
      });
      setAttachments(attachments.push(...doc.assets));
      console.log(attachments);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {files && (
        <Modal visible={modalVisible}>
          <View
            style={[
              styles.csvSel,
              {
                margin: 0,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text
              style={[
                styles.csvSelText,
                {
                  fontSize: screenWidth > 600 ? 22 : 16,
                  alignSelf: "center",
                  fontSize: 22,
                },
              ]}
            >
              {files.name}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Feather
                name="x"
                size={screenWidth > 600 ? 24 : 18}
                color={Colors.placeholder}
                style={styles.close}
              />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <ScrollView horizontal>
              <Text style={styles.modalText}>
                {atob(files.uri.split(",")[1])}
              </Text>
            </ScrollView>
          </ScrollView>
        </Modal>
      )}
      <Image
        style={[
          styles.logo,
          {
            width: screenWidth * 0.6,
          },
        ]}
        source={{ uri: "https://www.myfavdesigners.com/images/myfav-logo.svg" }}
      ></Image>
      <View
        style={[
          styles.container2,
          { paddingHorizontal: screenWidth > 600 ? "10%" : 20 },
        ]}
      >
        <View style={styles.conCon}>
          <Text
            style={[
              styles.text,
              {
                fontSize: screenWidth > 600 ? 22 : 16,
              },
            ]}
          >
            To:
          </Text>
          {files == null ? (
            <TouchableOpacity onPress={selectFile}>
              <View
                style={[
                  styles.csvSel,
                  {
                    width: screenWidth * 0.6,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.csvSelText,
                    {
                      fontSize: screenWidth > 600 ? 22 : 16,
                    },
                  ]}
                >
                  Select CSV file
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <View
                style={[
                  styles.csvSel,
                  {
                    width: screenWidth * 0.6,
                    flexDirection: "row",
                    justifyContent: "space-around",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.csvSelText,
                    {
                      fontSize: screenWidth > 600 ? 22 : 16,
                      alignSelf: "center",
                    },
                  ]}
                >
                  {files.name}
                </Text>
                <TouchableOpacity onPress={() => setFiles(null)}>
                  <Feather
                    name="x"
                    size={screenWidth > 600 ? 24 : 18}
                    color={Colors.placeholder}
                    style={styles.close}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.conCon}>
          <Text
            style={[
              styles.text,
              {
                fontSize: screenWidth > 600 ? 22 : 16,
              },
            ]}
          >
            Subject:
          </Text>
          <TextInput
            style={[
              styles.sub,
              {
                fontSize: screenWidth > 600 ? 22 : 16,
                width: screenWidth * 0.6,
              },
            ]}
            value={subject}
            onChangeText={setSubject}
            placeholder="Enter your Subject here ..."
            placeholderTextColor={Colors.placeholder}
          ></TextInput>
        </View>
        <View style={styles.conCon}>
          <Text
            style={[
              styles.text,
              {
                fontSize: screenWidth > 600 ? 22 : 16,
              },
            ]}
          >
            Body:
          </Text>
          <TextInput
            style={[
              styles.body,
              {
                fontSize: screenWidth > 600 ? 22 : 16,
                width: screenWidth * 0.6,
                height: 100 + (body.split("\n").length - 1) * 22,
              },
            ]}
            multiline
            value={body}
            onChangeText={setBody}
            placeholder="Enter the body of Email here"
            placeholderTextColor={Colors.placeholder}
          ></TextInput>
        </View>
        <View style={styles.conCon}>
          {screenWidth > 600 ? (
            <Text
              style={[
                styles.text,
                {
                  fontSize: screenWidth > 600 ? 22 : 16,
                },
              ]}
            >
              Attachments:
            </Text>
          ) : (
            <View></View>
          )}
          <View>
            <TouchableOpacity
              onPress={selectAttachments}
              style={[
                styles.selAtt,
                {
                  width: screenWidth * 0.6,
                },
              ]}
            >
              <Text
                style={[
                  styles.selAttText,
                  {
                    fontSize: screenWidth > 600 ? 22 : 16,
                  },
                ]}
              >
                Select Attachments
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {attachments.length}
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
      </View>
    </View>
  );
};

export default EmailScreen;

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
  conCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  text: {
    color: Colors.text,
    alignSelf: "center",
  },
  container2: {},
  csvSel: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.input,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginHorizontal: 10,
    marginLeft: 30,
  },
  csvSelText: {
    color: Colors.placeholder,
  },
  sub: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.input,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginHorizontal: 10,
    marginLeft: 30,
  },
  body: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.input,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginHorizontal: 10,
    marginLeft: 30,
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
  modalText: {
    fontSize: 22,
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignSelf: "center",
  },
  selAtt: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.input,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: "flex-end",
    marginHorizontal: 10,
    marginLeft: 30,
  },
  selAttText: {
    color: Colors.placeholder,
    alignSelf: "center",
  },
});
