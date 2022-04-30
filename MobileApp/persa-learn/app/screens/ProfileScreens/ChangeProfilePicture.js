import { StyleSheet, View, ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import fonts from "../../config/fonts";
import Item from "../../components/Profile/ChangeProfPic/Item";
import {
  getPurchasedProfilePictures,
  updateProfilePicture,
} from "../../httpRequests/itemRequests";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ChangeProfilePicture = () => {
  const [profilePictures, setProfilePictures] = useState([]);
  const [selectedPic, setSelectedPic] = useState({ id: null, image: null });

  const navigation = useNavigation();

  const getProfPics = async () => {
    const data = await getPurchasedProfilePictures();
    if (data.status === "success") {
      setProfilePictures(data.data);
    }
  };
  useEffect(async () => {
    await getProfPics();
  }, []);
  const change = async () => {
    if (selectedPic != null) {
      const data = await updateProfilePicture({
        ProfilePicture: selectedPic.image,
      });
      if (data.status === "success") {
        navigation.navigate("ProfileScreen");
      } else {
        alert("Something went wrong unable to profile picture");
      }
    } else alert("Select a profile picture");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={fonts.title}>Select a profile picture</Text>
        <View style={styles.profileContainer}>
          {profilePictures.map((pic) => {
            let selected = false;
            if (pic.ProfilePictureID == selectedPic.id) selected = true;
            return (
              <Item
                key={pic.ProfilePictureID}
                id={pic.ProfilePictureID}
                image={pic.Image}
                name={pic.Name}
                isSelected={selected}
                setSelectedPic={setSelectedPic}
              />
            );
          })}
        </View>
        <CustomButton text={"Change"} onPress={change} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    // alignItems: "center",
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 10,
    width: "100%",
  },
  profileContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    display: "flex",
  },
});
export default ChangeProfilePicture;
