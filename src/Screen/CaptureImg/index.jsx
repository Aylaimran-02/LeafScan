import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { Photo } from "@mui/icons-material";
import { ActivityIndicator } from "react-native-web";

const CaptureImg = ({ navigation }) => {
  const [loading, setLoading] = useState(null);
  const [flashToggle, setFlashToggle] = useState(false);
  const cameraRef = useRef(Camera);
  const [camView, setCamView] = useState("back");
  const [torch, setTorch] = useState("off");
  const devices = useCameraDevices("dual-camera");
  const device = camView === "back" ? devices.back : devices.front;

  const cameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === "denied") {
      await Linking.openSettings();
    }
    setLoading(devices);
  }, [devices]);

  useEffect(() => {
    cameraPermission();
  }, [cameraPermission, devices]);

  const takePhoto = async () => {
    setLoading(true);
    try {
      if (cameraRef.current == null) {
        throw new Error("Camera Ref is Null");
      }
      console.log("photo taking...");
      const Photo = await cameraRef.current.takePhoto({
        qualityPrioritization: "quality",
        flash: `${torch}`,
        enableAutoRedEyeReduction: true,
      });
      console.log(Photo);
    } catch (error) {
      console.log(error, " ERROR");
    }
  };

  if (device == null) {
    return <ActivityIndicator style={{ flex: 1 }} size={50} color="red" />;
  }

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        photo={true}
        isActive={true}
        ref={cameraRef}
      />

      <View style={styles.shutterContainer}>
        <TouchableOpacity
          style={styles.cameraFlashBtn}
          onPress={() => {
            setFlashToggle(!flashToggle);
            torch === "off" ? setTorch("on") : setTorch("off");
          }}
        >
          <Image source={require("../../assets/flash.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            takePhoto();
          }}
        >
          <View style={styles.shutter}>
            <View style={styles.shutterBtn} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cameraFlipBtn}
          onPress={() => {
            camView === "back" ? setCamView("front") : setCamView("back");
          }}
        >
          <Image source={require("../../assets/Flip.png")} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});

export default CaptureImg;
