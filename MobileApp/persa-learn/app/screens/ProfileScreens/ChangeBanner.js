import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import fonts from "../../config/fonts";
import CustomButton from "../../components/CustomButton/CustomButton";
import Item from "../../components/Profile/ChangeBanner/Item";
import {
  getPurchasedBanners,
  updateBanner,
} from "../../httpRequests/itemRequests";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../components/context";

const ChangeBanner = () => {
  const { signOut } = useContext(AuthContext);

  const [banners, setBanners] = useState([]);
  const [selectedPic, setSelectedPic] = useState({ id: null, image: null });

  const navigation = useNavigation();

  const change = async () => {
    try {
      if (selectedPic != null) {
        const data = await updateBanner({
          Banner: selectedPic.image,
        });
        if (data.status === "success") {
          navigation.navigate("ProfileScreen");
        } else {
          alert("Something went wrong unable to banner");
        }
        if ((await SecureStore.getItemAsync("userToken")) === null) {
          signOut();
        }
      } else alert("Select a banner");
    } catch (e) {}
  };
  const getBanners = async () => {
    try {
      const data = await getPurchasedBanners();
      if (data.status === "success") {
        setBanners(data.data);
      }
    } catch (e) {}
  };
  useEffect(async () => {
    await getBanners();
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={fonts.title}>Select a banner</Text>
        <View style={styles.profileContainer}>
          {banners.map((banner) => {
            let selected = false;
            if (banner.BannerID == selectedPic.id) selected = true;
            return (
              <Item
                key={banner.BannerID}
                id={banner.BannerID}
                image={banner.Image}
                name={banner.Name}
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

export default ChangeBanner;

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
