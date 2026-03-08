import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useStatusBarStyle } from "~/utils/useStatusBarStyle";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { AboutCalendar } from "./calendar";
import { SafeAreaView } from "react-native-safe-area-context";
const baseDimension = { baseHeight: 675, baseWidth: 375 };

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const isLargeScreen = width > 400;
const textSizeFactor = isLargeScreen ? 1.1 : 1;

function calcHeight(size) {
  const scaleFactor = baseDimension.baseHeight / height;
  return size * scaleFactor;
}

function calcWidth(size) {
  const scaleFactor = baseDimension.baseWidth / width;
  return size * scaleFactor;
}

export default function About() {
  useStatusBarStyle("dark");

  const [num, setNum] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setNum((prevNum) => parseFloat((prevNum + 318.5).toFixed(1)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={nstyles.screen}>
      <SafeAreaView style={nstyles.saview}>
        <ScrollView contentContainerStyle={nstyles.scrollViewContent}>
          {/* About Our Story */}
          <View style={nstyles.sectionContainer}>
            <Text style={nstyles.sectionHeader}>
              Our Story
            </Text>
            <Text style={nstyles.sectionBody}>
              Since 2006, Dream in Green (DIG) has empowered individuals,
              particularly youth, to lead the response to climate change and
              environmental challenges in South Florida. Through partnerships with
              schools, households, local governments, and businesses, we focus on
              reducing environmental footprints. By developing and overseeing
              educational programs and workshops, we promote sustainable behaviors
              across all age groups, with a special emphasis on K-12 students.
            </Text>
            <View style={nstyles.socialIcons}>
              <Link href="https://www.linkedin.com/company/dream-in-green/">
                <Entypo
                  style={styles.socialIcons}
                  name="linkedin"
                  size={24}
                  color="#234E13"
                />
              </Link>
              <Link href="https://www.facebook.com/dreamingreen">
                <Entypo
                  style={styles.socialIcons}
                  name="facebook"
                  size={24}
                  color="#234E13"
                />
              </Link>
              <Link href="https://www.instagram.com/dreamingreenmia/">
                <Entypo
                  style={styles.socialIcons}
                  name="instagram"
                  size={24}
                  color="#234E13"
                />
              </Link>
              <Link href="https://www.youtube.com/channel/UCn5Z3T2ejG4dYEJhe9ezLww">
                <Entypo
                  style={styles.socialIcons}
                  name="youtube"
                  size={24}
                  color="#234E13"
                />
              </Link>
              <Link href="https://x.com/Dream_in_Green">
                <FontAwesome6 name="x-twitter" size={24} color="#234E13" />
              </Link>
            </View>
          </View>

          {/* About Our Mission */}
          <View style={nstyles.sectionContainer}>
            <Text style={nstyles.sectionHeader}>Our Mission</Text>
            <Text style={nstyles.sectionBody}>
              One of the major obstacles to effective recycling is
              contamination—when non-recyclable items are mistakenly placed into
              recycling systems. Our mission is to provide residents with clear,
              accessible, and up-to-date recycling information tailored to their
              specific community. By reducing contamination, we aim to improve
              recycling rates and help transform waste into valuable resources.
            </Text>

            <View style={nstyles.funFactRow}>
              <Text style={nstyles.funFactNumber}>{num}</Text>
              <Text style={nstyles.funFactText}>tons of waste</Text>
            </View>

            <Text style={nstyles.funFact}>
              Note: "Did you know the world generates over 2.01 billion tons of
              waste each year? That is 318.5 tons of waste every 5 seconds."
            </Text>
          </View>

         {/* About Our Solution */}
         <View style={nstyles.sectionContainer}>
           <Text style={nstyles.sectionHeader}>Our Solution</Text>
           <Text style={nstyles.sectionBody}>
             Recyclepedia is designed to simplify access to accurate recycling
             information for Miami-Dade County residents. By providing
             comprehensive guidance on what can and cannot be recycled,
             Recyclepedia helps reduce contamination and improve recycling success.
             The platform offers alternatives for disposing of non-recyclable
             items, directing users to appropriate drop-off locations. By
             increasing recycling rates, we can reduce pollution and enhance the
             overall health of our communities.
           </Text>
           <Link href="https://dreamingreen.org/about-us/">
             <Text style={nstyles.learnMore}>Learn More</Text>
           </Link>
         </View>

          {/* Event Calendar, same as calendar.jsx but able to be used in the about section */}
          <AboutCalendar />
        </ScrollView>
      </SafeAreaView>
    </View>
    
    // <SafeAreaView style={styles.saviewContainer}>
    //   <ScrollView contentContainerStyle={styles.scrollViewContent}>
    //     {/* About Our Story */}
    //     <View style={styles.boxTop}>
    //       <Text style={styles.textTop}>Our Story</Text>
    //       <Text style={styles.paragraphText}>
    //         Since 2006, Dream in Green (DIG) has empowered individuals,
    //         particularly youth, to lead the response to climate change and
    //         environmental challenges in South Florida. Through partnerships with
    //         schools, households, local governments, and businesses, we focus on
    //         reducing environmental footprints. By developing and overseeing
    //         educational programs and workshops, we promote sustainable behaviors
    //         across all age groups, with a special emphasis on K-12 students.
    //       </Text>
    //       <View style={styles.socialIconContainer}>
    //         <Link href="https://www.linkedin.com/company/dream-in-green/">
    //           <Entypo
    //             style={styles.socialIcons}
    //             name="linkedin"
    //             size={24}
    //             color="#234E13"
    //           />
    //         </Link>
    //         <Link href="https://www.facebook.com/dreamingreen">
    //           <Entypo
    //             style={styles.socialIcons}
    //             name="facebook"
    //             size={24}
    //             color="#234E13"
    //           />
    //         </Link>
    //         <Link href="https://www.instagram.com/dreamingreenmia/">
    //           <Entypo
    //             style={styles.socialIcons}
    //             name="instagram"
    //             size={24}
    //             color="#234E13"
    //           />
    //         </Link>
    //         <Link href="https://www.youtube.com/channel/UCn5Z3T2ejG4dYEJhe9ezLww">
    //           <Entypo
    //             style={styles.socialIcons}
    //             name="youtube"
    //             size={24}
    //             color="#234E13"
    //           />
    //         </Link>
    //         <Link href="https://x.com/Dream_in_Green">
    //           <FontAwesome6 name="x-twitter" size={24} color="#234E13" />
    //         </Link>
    //       </View>
    //     </View>

    //     {/* About Our Mission */}
    //     <View style={styles.boxMiddle}>
    //       <Text style={styles.textTop}>Our Mission</Text>
    //       <Text style={styles.paragraphText}>
    //         One of the major obstacles to effective recycling is
    //         contamination—when non-recyclable items are mistakenly placed into
    //         recycling systems. Our mission is to provide residents with clear,
    //         accessible, and up-to-date recycling information tailored to their
    //         specific community. By reducing contamination, we aim to improve
    //         recycling rates and help transform waste into valuable resources.
    //       </Text>

    //       <View style={styles.funFactRow}>
    //         <Text style={styles.funFactNum}>{num}</Text>
    //         <Text style={{ fontStyle: "italic" }}>tons of waste</Text>
    //       </View>

    //       <Text style={styles.funFact}>
    //         Note: "Did you know the world generates over 2.01 billion tons of
    //         waste each year? That is 318.5 tons of waste every 5 seconds."
    //       </Text>
    //     </View>

    //     {/* About Our Solution */}
    //     <View style={styles.boxMiddle}>
    //       <Text style={styles.textTop}>Our Solution</Text>
    //       <Text style={styles.paragraphText}>
    //         Recyclepedia is designed to simplify access to accurate recycling
    //         information for Miami-Dade County residents. By providing
    //         comprehensive guidance on what can and cannot be recycled,
    //         Recyclepedia helps reduce contamination and improve recycling success.
    //         The platform offers alternatives for disposing of non-recyclable
    //         items, directing users to appropriate drop-off locations. By
    //         increasing recycling rates, we can reduce pollution and enhance the
    //         overall health of our communities.
    //       </Text>
    //       <Link href="https://dreamingreen.org/about-us/">
    //         <Text style={styles.buttonText2}>Learn More</Text>
    //       </Link>
    //     </View>

    //     {/* Event Calendar, same as calendar.jsx but able to be used in the about section */}
    //     <AboutCalendar />

    //   </ScrollView>
    // </SafeAreaView>
  );
}

const nstyles = StyleSheet.create({
  // background
  screen: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  saview: {
    flex: 1,
    display: "flex",
  },
  scrollViewContent: {
    paddingBottom: "17%", // use this so the content isn't cut off by the tab bar, not sure about a better way
  },

  // sections
  sectionContainer: {
    padding: 20,
    gap: 10,
  },
  sectionHeader: {
    fontSize: 32,
    color: "#234E13",
    textAlign: "center",
  },
  sectionBody: {
    textAlign: "center",
    color: "#000000",
    fontSize: 16,
    lineHeight: 20,
  },
  socialIcons: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
  },
  funFactRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  funFactNumber: {
    color: "#234E13",
    fontWeight: "bold",
    fontSize: 20,
  },
  funFactText: {
    fontStyle: "italic",
    fontSize: 20,
  },
  funFact: {
    fontSize: 12,
    textAlign: "center",
  },
  learnMore: {
    textAlign: "center",
    fontSize: 16,
    color: "#234E13",
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
  saviewContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: "17%", // use this so the content isn't cut off by the tab bar, not sure about a better way
  },

  scrollContainer: {
    flexGrow: 1,
    flex: 1,
    paddingBottom: calcHeight(80),
    backgroundColor: "#FFFFFF",
  },
  socialIconContainer: {
    flexDirection: "row",
    //justifyContent: "center", // Centers the social icons horizontally
    marginTop: calcHeight(20),
  },
  socialIcons: {
    marginHorizontal: calcWidth(200),
  },
  boxTop: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: calcWidth(1),
    borderBottomColor: "#a9def9",
    paddingHorizontal: calcWidth(10),
    paddingTop: calcHeight(20),
    paddingBottom: calcHeight(20),
  },
  boxMiddle: {
    padding: calcHeight(20),
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: calcWidth(1),
    borderBottomColor: "#a9def9",
    paddingHorizontal: calcWidth(10),
    paddingBottom: calcHeight(30),
  },
  textTop: {
    fontSize: calcWidth(26) * textSizeFactor,
    color: "#234E13",
    textAlign: "center",
  },
  paragraphText: {
    fontSize: calcWidth(13) * textSizeFactor,
    color: "black",
    textAlign: "center",
    marginTop: calcHeight(15),
    marginHorizontal: calcWidth(10),
    lineHeight: calcHeight(25), // Small margin for readability
  },
  funFactRow: {
    flexDirection: "row",
    padding: calcHeight(15),
    alignItems: "center",
  },
  funFact: {
    marginTop: calcHeight(5),
    fontSize: calcWidth(12) * textSizeFactor,
  },
  funFactNum: {
    fontSize: calcWidth(20) * textSizeFactor,
    fontWeight: "bold",
    marginHorizontal: calcWidth(10),
    color: "#234E13",
  },
  button2: {
    backgroundColor: "#234E13",
    paddingVertical: calcHeight(10),
    paddingHorizontal: calcWidth(40),
    borderRadius: 5,
    marginTop: calcHeight(15),
  },
  buttonText2: {
    color: "white",
    textAlign: "center",
  },
  photoRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: calcHeight(15),
  },
  photo: {
    width: calcWidth(50),
    height: calcHeight(50),
    borderRadius: 5,
  },
});
