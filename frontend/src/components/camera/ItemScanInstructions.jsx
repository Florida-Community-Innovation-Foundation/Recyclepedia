import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";

// [NOTE]: this should take in the image, this is what will check whether the image is accepted or not

// don't use
// export default function ItemScanInstructions({ itemChecked, itemAccepted }) {
//   const navigation = useNavigation();
//   const [text, setText] = useState("Hello");

//   const itemAcceptedButtonPress = () => {
//     navigation.navigate("Curbside Dropoff");
//   };

//   // useEffect(() => {
//   //   const fetchText = async () => {
//   //     fetch('https://www.nyckel.com/v1/functions/recycling-identifier/invoke', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJpc3MiOiJodHRwczovL3d3dy5ueWNrZWwuY29tIiwibmJmIjoxNzUzNzMwNzI0LCJpYXQiOjE3NTM3MzA3MjQsImV4cCI6MTc1MzczNDMyNCwic2NvcGUiOlsiYXBpIl0sImNsaWVudF9pZCI6Im5ydmltazdsemZ4cXVoZno4MmdhcjV6cm10aGJxbTM5IiwianRpIjoiMDZGMDk4M0YxQUE2RTQxMkY3QzhCN0ZFODI2RjRCQzIifQ.Zyalh8b5OK9Uq5LpO9v1gr15p5wcEKo-Qh4rbVeUQYXmXX3nN7lbDq_dGiXpPBlojC-LUMxX-ZwpMLjpbAoY34keDMaY43ZdydFb3tQocQmDFq_oByd_P7nmXlr-hkAiYL8oc2a8Tu5uVQVt8mI_VKWwlZxBmlyXn7uv05OMtOV-Fkdv5DwMRLte6PBJ47AKRaO7z13q01op9QBRLPQ9Cq7cplMVNhrAAklxGammxXc8XFxd4GK2-CLLm76qe-QMdDONnORAAfYrpgWAKxuia1o5f7Z6TEU3I40yWYKaeW4at5gTqce6vYZI0yzXCAGO4ZI5yM6HVJUrUY4NICVqng',
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify(
//   //         { "data": "https://www.nyckel.com/assets/example.jpg" }
//   //       )
//   //     })
//   //     .then(response => response.json())
//   //     .then(console.log(data));

//   //     return "lolz";
//   //   };

//   //   setText(fetchText);
//   //   //setText("t");
//   // }, [itemChecked]);

//   // useEffect(() => {
//   //   const fetchText = async () => {
//   //     fetch('https://www.nyckel.com/v1/functions/recycling-identifier/invoke', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Authorization': 'Bearer ' + 'eyJhbGciOiJSUzI1NiIsInR5cCI6ImF0K2p3dCJ9.eyJpc3MiOiJodHRwczovL3d3dy5ueWNrZWwuY29tIiwibmJmIjoxNzUzNzMwNzI0LCJpYXQiOjE3NTM3MzA3MjQsImV4cCI6MTc1MzczNDMyNCwic2NvcGUiOlsiYXBpIl0sImNsaWVudF9pZCI6Im5ydmltazdsemZ4cXVoZno4MmdhcjV6cm10aGJxbTM5IiwianRpIjoiMDZGMDk4M0YxQUE2RTQxMkY3QzhCN0ZFODI2RjRCQzIifQ.Zyalh8b5OK9Uq5LpO9v1gr15p5wcEKo-Qh4rbVeUQYXmXX3nN7lbDq_dGiXpPBlojC-LUMxX-ZwpMLjpbAoY34keDMaY43ZdydFb3tQocQmDFq_oByd_P7nmXlr-hkAiYL8oc2a8Tu5uVQVt8mI_VKWwlZxBmlyXn7uv05OMtOV-Fkdv5DwMRLte6PBJ47AKRaO7z13q01op9QBRLPQ9Cq7cplMVNhrAAklxGammxXc8XFxd4GK2-CLLm76qe-QMdDONnORAAfYrpgWAKxuia1o5f7Z6TEU3I40yWYKaeW4at5gTqce6vYZI0yzXCAGO4ZI5yM6HVJUrUY4NICVqng',
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify(
//   //         { "data": "https://www.nyckel.com/assets/example.jpg" }
//   //       )
//   //     })
//   //       .then(response => response.json())
//   //       .then(data => {
//   //         console.log(data);
//   //         //return data;
//   //         //return data.labelName;
//   //         //setText(data);
//   //       });
//   //       //.then(data => console.log(data));
//   //       //.then(setText(data.labelName));
//   //       //.then()
//   //       //return response
//   //   };

//   //   //setText(fetchText);
//   //   fetchText();
//   //   //fetchText();
//   // }, [itemChecked]);

//   return (
//     <View>
//       <Text>{text}</Text>
//     </View>
//   );
// }

//export default function ItemScanInstructions({ })

// old itemscan instructions
export default function ItemScanInstructions({ itemChecked, itemAccepted, exampleText }) {
  const navigation = useNavigation();

  const itemAcceptedButtonPress = () => {
    navigation.navigate("Curbside Dropoff");
  };

  useEffect(() => {
    if (itemChecked) {
      setItemsRecycled(itemsRecycled + 1);
      }
      }, [itemChecked]);

  return (
    <View style={ styles.container }>
      <Text>
        {exampleText}
      </Text>
    </View>
    // <View
    //   style={
    //     !itemChecked ? styles.container : { ...styles.container, height: 150 }
    //   }
    // >
    //   {!itemChecked && (
    //     <View style={styles.instructionContainer}>
    //       <Entypo name="warning" size={24} color="#024935" />
    //       <Text style={styles.instructionText}>
    //         SCAN AN ITEM TO VIEW RECYCLING INFORMATION.
    //       </Text>
    //     </View>
    //   )}
    //   {itemChecked && (
    //     <>
    //       <Text style={styles.instructionHeader}> Next Steps: </Text>
    //       {itemAccepted && (
    //         <Text style={styles.itemAcceptanceStatus}>
    //           This item is accepted in your area! It should be rinsed off and
    //           placed in your recycling bin.
    //         </Text>
    //       )}
    //       {!itemAccepted && (
    //         <>
    //           <Text style={styles.itemAcceptanceStatus}>
    //             This item cannot go in your curbside bin. It must be disposed of
    //             in a special drop-off center.
    //           </Text>
    //           <Pressable
    //             style={styles.button}
    //             onPress={itemAcceptedButtonPress}
    //           >
    //             <Text style={styles.buttonText}>FIND ONE HERE!</Text>
    //           </Pressable>
    //         </>
    //       )}
    //     </>
    //   )}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 310,
    height: 90,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    marginTop: 20,
  },
  instructionContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 16,
    fontWeight: 400,
    width: 270,
    marginTop: 10,
    marginLeft: 10,
    color: "#024935",
    fontFamily: "Bebas Neue",
  },
  instructionHeader: {
    fontFamily: "Titillium Web",
    fontWeight: 600,
    fontSize: 12,
    color: "#024935",
    padding: 15,
  },
  itemAcceptanceStatus: {
    fontFamily: "Titillium Web",
    fontWeight: 400,
    fontSize: 12,
    color: "#024935",
    width: 280,
    marginLeft: 15,
  },
  button: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#828282",
    marginLeft: 75,
    width: 155,
    backgroundColor: "#FFFFFF",
    height: 30,
    marginTop: 5,
  },
  buttonText: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 15,
    fontFamily: "Bebas Neue",
    color: "#024935",
  },
});
