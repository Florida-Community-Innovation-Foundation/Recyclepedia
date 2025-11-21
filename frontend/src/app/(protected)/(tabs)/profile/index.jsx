import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Link } from "expo-router";
import Svg, { Path } from 'react-native-svg';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal
} from "react-native";
import naturePicture from "~/assets/naturePicture.jpg";
import diggy from "~/assets/diggy.png";
import toter from "~/assets/toter.png";
import mountain from "~/assets/Mountain.png";
import learnGameImageTwo from "~/assets/LearnGameImageTwo.png";
import cartons from "~/assets/cartons.png";
import { normalize } from "~/utils/normalize";
import { useNavigation } from "@react-navigation/native";
import { useRecycling } from "../../../../utils/recyclingContext";
import { Picker } from '@react-native-picker/picker';


export default function UserAccount() {
const{
  itemsRecycled,
  setItemsRecycled,
  carbonOffset,
  setCarbonOffset,
} = useRecycling();


  const [profilePicture, setProfilePicture] = useState(naturePicture);
  //const [itemsRecycled, setItemsRecycled] = useState(0);
  const [totalItemsToRecycle, setTotalItemsToRecycle] = useState(100);
  //const [carbonOffset, setCarbonOffset] = useState(0); //note that this is in kg CO2 saved
  const [num, setNum] = useState(0);
  const navigation = useNavigation();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState("WATER BOTTLE");

  const materials = [
    "ALUMINUM CANS",
    "ALUMINUM FOIL",
    "ALUMINUM PIE PANS",
    "BOOKS",
    "PLASTIC BOTTLES",
    "GLASS BOTTLES",
    "CANS",
    "CARDBOARD",
    "CEREAL BOXES",
    "CARTONS",
    "DETERGENT BOTTLES",
    "DOCUMENTS",
    "DRINK BOXES",
    "JUICE BOXES",
    "MAIL",
    "MAGAZINES",
    "MILK BOTTLES",
    "MILK CARTONS",
    "NEWSPAPERS",
    "PAPER",
    "PAPER EGG CARTONS",
    "PAPER SHOPPING BAGS",
    "PHONE BOOKS",
    "SHAMPOO BOTTLES",
    "STEEL CANS",
    "TOILET PAPER ROLLS",
    "PIZZA BOXES",
    "YOGURT CONTAINERS",
  ];

  const learningGames = [
    {
      image: toter,
      title: "Recycle Round Up",
      color: "#A9DEF9",
      url: "https://kids.nationalgeographic.com/games/action-adventure/article/recycle-roundup-new",
    },
    {
      image: cartons,
      title: "Litter Critter",
      color: "#234E13",
      url: "https://www.abcya.com/games/recycling_game",
    },
    {
      image: learnGameImageTwo,
      title: "Recycle or Not",
      color: "#A9DEF9",
      url: "https://www.recycleornot.org/",
    },
    {
      image: mountain,
      title: "Recycling Waste",
      color: "#DBF4D2",
      url: "https://www.turtlediary.com/game/recycling-waste.html",
    },
  ];



  const carbon_offsets = new Map([
    ["ALUMINUM CANS", 0.1],
    ["ALUMINUM FOIL", 1.72],
    ["ALUMINUM PIE PANS", 0.27],
    ["BOOKS", 1],
    ["PLASTIC BOTTLES", 1],
    ["GLASS BOTTLES", 0.5],
    ["CANS", 0.35],
    ["CARDBOARD", 1],
    ["CEREAL BOXES", 0.55],
    ["CARTONS", 0.0075],
    ["DETERGENT BOTTLES", 0.12],
    ["DOCUMENTS", 0.005],
    ["DRINK BOXES", 1.56],
    ["JUICE BOXES", 1.6],
    ["MAIL", 0.02],
    ["MAGAZINES", 0.8],
    ["MILK BOTTLES", 0.1],
    ["MILK CARTONS", 0.0075],
    ["NEWSPAPERS", 0.06],
    ["PAPER", 0.005],
    ["PAPER EGG CARTONS", 0.35],
    ["PAPER SHOPPING BAGS", 0.07],
    ["PHONE BOOKS", 2.68],
    ["SHAMPOO BOTTLES", 0.07],
    ["STEEL CANS", 0.075],
    ["TOILET PAPER ROLLS", 0.5],
    ["PIZZA BOXES", 0.5],
    ["YOGURT CONTAINERS",
      0.059],
  ]);


  const calculateTotalCarbonOffset = () => {
  return addedItems.reduce((total, item) => {
    const carbonPerItem = carbon_offsets.get(item.name) || 0;
    return total + (carbonPerItem * item.quantity);
  }, 0);
};

  const handleProfilePictureEdit = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Photo taken!!");
      setProfilePicture({ uri: result.assets[0].uri });
    }
  };


  const [addedItems, setAddedItems] = useState([]);

  const handleAddMaterial = () => {
  if (num > 0) {
    const existingItemIndex = addedItems.findIndex(item => item.name === selectedMaterial);
    
    if (existingItemIndex >= 0) {
      // Update existing item quantity
      const updatedItems = [...addedItems];
      updatedItems[existingItemIndex].quantity += num;
      setAddedItems(updatedItems);
    } else {
      // Add new item
      const newItem = {
        id: Date.now().toString(),
        name: selectedMaterial,
        quantity: num
      };
      setAddedItems([...addedItems, newItem]);
    }
    
    // Reset quantity to 1 after adding
    setNum(1);
  }
};


const handleEditItem = (itemId) => {
  
};

// Handle deleting item
const handleDeleteItem = (itemId) => {
  setAddedItems(prevItems => 
    prevItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity - 1;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(item => item !== null)
  );
};


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.containerContent}>

      <View style={styles.screen}>
        <View style={styles.profileBackground}>
          {/* settings icon */}
            {/* <Pressable style={styles.settings}>
              <Link href="/(tabs)/profile/settings">
                <Ionicons name="settings-sharp" size={24} color="#FFFFFF" />
              </Link>
            </Pressable> */}
          {/* Profile Picture */}
          <Image source={profilePicture} style={styles.profilePicture} />
          <Pressable
            style={styles.profilePictureEdit}
            onPress={handleProfilePictureEdit}
          >
            <MaterialIcons name="edit" size={24} color="#024935" />
          </Pressable>
          <Text style={styles.username}> HELI </Text>
        </View>
        <ScrollView style={styles.profileInfo}>
          {/* Recycling Goal */}
          <View style={styles.recyclingInfoContainer}>
            <View style={styles.recyclingHeader}>
              <Text style={styles.recyclingHeaderText}> RECYCLING GOAL </Text>
              <Text
                style={styles.recyclingGoalItemsNumber}
              >{`${addedItems.reduce((total, item) => total + item.quantity, 0)}/${totalItemsToRecycle} Items`}</Text>
            </View>
            {/* Recycling Goal Bar */}
            <View style={styles.recyclingGoalBar}>
              <View
                style={[
                  styles.recyclingGoalCompleted,
                  {
                    width: `${new Number((addedItems.reduce((total, item) => total + item.quantity, 0) * 100) / totalItemsToRecycle).toFixed(2)}%`,
                  },
                ]}
              />
            </View>
          </View>
          {/* Recycling Stats */}
          <View style={styles.recyclingInfoContainer}>
            <View style={styles.recyclingHeader}>
              <Text style={styles.recyclingHeaderText}> RECYCLING STATS </Text>
              {/*<Pressable style={styles.updateButton}>
                <Text style={styles.updateButtonText}> UPDATE </Text>
              </Pressable>*/}
            </View>
            <View
              style={[
                styles.recyclingStatsContainer,
                styles.recyclingStatsContainerShadow,
              ]}
            >
              <View style={styles.recyclingStatsTextContainer}>
                <View style={styles.recyclingStatsText}>
                  <Text style={styles.recyclingStatsLabel}>
                    Total Items Recycled:
                  </Text>
                  <Text style={styles.recyclingStatsInfo}>
                    {addedItems.reduce((total, item) => total + item.quantity, 0)}
                  </Text>
                </View>
              


<View style={styles.mainContainer}>
  {/* Main Container - Input and Items */}
  <View style={styles.itemAdderContainer}>
    {/* Item Adder - Top Row */}
    <View style={styles.itemAdderRow}>
      {/* Material Dropdown - Oval Shape */}
      <TouchableOpacity 
        style={styles.materialDropdown} 
        onPress={() => setIsDropdownVisible(true)}
      >
        <Text style={styles.materialLabel}>{selectedMaterial}</Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      {/* Quantity Selector */}
<View style={styles.quantitySelector}>
  <TouchableOpacity style={styles.quantityButton} onPress={() => setNum(num + 1)}>
    <Text style={styles.quantityButtonText}>+</Text>
  </TouchableOpacity>
  <View style={styles.quantityDisplay}>
    <Text style={styles.quantityText}>{num}</Text>
  </View>
  <TouchableOpacity style={styles.quantityButton} onPress={() => setNum(Math.max(num - 1, 1))}>
    <Text style={styles.quantityButtonText}>-</Text>
  </TouchableOpacity>
</View>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddMaterial}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
    </View>

    {/* Added Items List - Inside same container */}
    {addedItems.length > 0 && (
      <View style={styles.addedItemsContainer}>
        {addedItems.map((item) => (
          <View key={item.id} style={styles.addedItemRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>× {item.quantity}</Text>
            </View>
            <View style={styles.itemActions}>
              {/*<TouchableOpacity 
                style={styles.editButton}
                onPress={() => handleEditItem(item.id)}
              >
                <Text style={styles.editButtonText}>EDIT</Text>
              </TouchableOpacity>*/}
              <TouchableOpacity 
  style={styles.deleteButton}
  onPress={() => handleDeleteItem(item.id)}
>
  <Svg width="19" height="22" viewBox="0 0 19 22" fill="none">
    <Path d="M9.49017 1.82333C9.32242 1.82637 9.16256 1.90635 9.04568 2.04571C8.92879 2.18508 8.86444 2.37244 8.86673 2.56669V2.93336H5.3834C5.29951 2.93204 5.21622 2.95003 5.13839 2.9863C5.06055 3.02256 4.98971 3.07636 4.92998 3.14459C4.87025 3.21282 4.82282 3.29411 4.79045 3.38373C4.75808 3.47336 4.74141 3.56954 4.74141 3.66669H3.80007C3.71614 3.66532 3.63282 3.68327 3.55494 3.71951C3.47706 3.75574 3.40618 3.80954 3.34641 3.87777C3.28664 3.94601 3.23918 4.02731 3.20679 4.11697C3.1744 4.20662 3.15771 4.30284 3.15771 4.40002C3.15771 4.49721 3.1744 4.59343 3.20679 4.68308C3.23918 4.77274 3.28664 4.85404 3.34641 4.92228C3.40618 4.99051 3.47706 5.04431 3.55494 5.08054C3.63282 5.11678 3.71614 5.13473 3.80007 5.13336H15.2001C15.284 5.13473 15.3673 5.11678 15.4452 5.08054C15.5231 5.04431 15.594 4.99051 15.6537 4.92228C15.7135 4.85404 15.761 4.77274 15.7933 4.68308C15.8257 4.59343 15.8424 4.49721 15.8424 4.40002C15.8424 4.30284 15.8257 4.20662 15.7933 4.11697C15.761 4.02731 15.7135 3.94601 15.6537 3.87777C15.594 3.80954 15.5231 3.75574 15.4452 3.71951C15.3673 3.68327 15.284 3.66532 15.2001 3.66669H14.2587C14.2587 3.56954 14.2421 3.47336 14.2097 3.38373C14.1773 3.29411 14.1299 3.21282 14.0702 3.14459C14.0104 3.07636 13.9396 3.02256 13.8618 2.9863C13.7839 2.95003 13.7006 2.93204 13.6167 2.93336H10.1334V2.56669C10.1346 2.46858 10.1187 2.37119 10.0868 2.2803C10.0548 2.18942 10.0075 2.10687 9.94751 2.03755C9.88753 1.96824 9.81615 1.91356 9.7376 1.87677C9.65904 1.83997 9.5749 1.8218 9.49017 1.82333ZM3.80007 6.60002L4.93562 17.7719C5.01035 18.5104 5.55019 19.0667 6.19239 19.0667H12.8078C13.45 19.0667 13.9892 18.5104 14.0645 17.7719L15.2001 6.60002H3.80007Z" fill="#024935"/>
  </Svg>
</TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    )}
  </View>

  {/* Dropdown Modal */}
  <Modal
    visible={isDropdownVisible}
    transparent={true}
    animationType="fade"
    onRequestClose={() => setIsDropdownVisible(false)}
  >
    <TouchableOpacity 
      style={styles.modalOverlay}
      onPress={() => setIsDropdownVisible(false)}
    >
      <View style={styles.dropdownContainer}>
        <FlatList
          data={materials}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.dropdownItem,
                selectedMaterial === item && styles.selectedDropdownItem
              ]}
              onPress={() => {
                setSelectedMaterial(item);
                setIsDropdownVisible(false);
              }}
            >
              <Text style={[
                styles.dropdownItemText,
                selectedMaterial === item && styles.selectedDropdownItemText
              ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </TouchableOpacity>
  </Modal>
</View>







                
              </View>
            </View>
          </View>


{/* Carbon Offset Section */}
<View style={styles.recyclingInfoContainer}>
  <Text style={styles.recyclingHeaderText}>CARBON OFFSET</Text>
  <View style={[styles.carbonOffsetContainer, styles.recyclingStatsContainerShadow]}>
    <Text style={styles.carbonOffsetLabel}>Estimated CO2 Offset:</Text>
    <Text style={styles.carbonOffsetValue}>
      {calculateTotalCarbonOffset().toFixed(1)} kg
    </Text>
  </View>
</View>


          {/* Interactive Games */}
          <View style={styles.interactiveGamesContainer}>
            <Text style={styles.recyclingHeaderText}> INTERACTIVE GAMES </Text>
            <ScrollView
              horizontal
              style={styles.interactiveGamesContainerScroll}
              contentContainerStyle={styles.interactiveGamesContainerContent}
            >
              {/*Integrate Unity Game */}
              <Link style={styles.gameSlot} href="/unityGame">
                <Image source={diggy} style={styles.featuredGameImg}></Image>
              </Link>
              {/* <Link style={styles.gameSlot} href="/featuredGameScreen">
                <Image source={diggy} style={styles.featuredGameImg}></Image>
              </Link>
              {learningGames.map((game, index) => (
                <View key={index}>
                  <Link
                    style={styles.gameSlot}
                    href={`/learnGameScreen?image=${encodeURIComponent(game.image)}&title=${encodeURIComponent(game.title)}&color=${encodeURIComponent(game.color)}&url=${encodeURIComponent(game.url)}`}
                  >
                    <Image
                      source={game.image}
                      style={styles.learningGameImg}
                    ></Image>
                  </Link>
                </View>
              ))} */}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
    

  );
}

const styles = StyleSheet.create({
  carbonOffsetContainer: {
  backgroundColor: 'white',
  borderRadius: 15,
  padding: 20,
  marginTop: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
carbonOffsetLabel: {
  fontSize: 14,
  color: '#024935',
  fontWeight: '500',
},
carbonOffsetValue: {
  fontSize: 18,
  color: '#024935',
  fontWeight: 'bold',
},
  scrollContainer: {
  flex: 1,
  backgroundColor: '#f5f5f5',
},

scrollContent: {
  paddingBottom: 20,
},
   mainContainer: {
    backgroundColor: '#f5f5f5',
  
    paddingTop: 20,
  },

  totalItemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },

  totalItemsLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },

  totalItemsCount: {
    fontSize: 14,
    color: '#2d5a3d',
    fontWeight: 'bold',
  },

  itemAdderContainer: {
    backgroundColor: 'white',
    borderRadius: 25,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingBottom: 8,
  },

  itemAdderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  
  materialDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    flex: 1,
    marginRight: 8,
  },
  
  materialLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d5a3d',
    textTransform: 'uppercase',
  },
  
  dropdownArrow: {
    fontSize: 10,
    color: '#666',
    marginLeft: 8,
  },
  
quantitySelector: {
  flexDirection: 'column', 
  alignItems: 'center',
  backgroundColor: '#f8f8f8',
  borderRadius: 20,
  marginRight: 8,
  paddingHorizontal: 6,
  paddingVertical: 4,
},
  
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  
  quantityButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  
  quantityDisplay: {
    minWidth: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  
  addButton: {
    backgroundColor: '#2d5a3d',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
  },
  
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 13,
    textTransform: 'uppercase',
  },

  // Added items styles
  addedItemsContainer: {
    paddingTop: 8,
    paddingHorizontal: 16,
    maxHeight: 200,
  },

  addedItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },

  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d5a3d',
    textTransform: 'uppercase',
    marginRight: 8,
  },

  itemQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  editButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },

  editButtonText: {
    color: '#2d5a3d',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
  },

  deleteButton: {
    padding: 8,
  alignItems: 'center',
  justifyContent: 'center'
  },

  deleteIcon: {
    fontSize: 16,
    color: '#2d5a3d',
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  dropdownContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    maxHeight: 300,
    minWidth: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  
  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  selectedDropdownItem: {
    backgroundColor: '#f0f8f0',
  },
  
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

  selectedDropdownItemText: {
    color: '#2d5a3d',
    fontWeight: '600',
  },
  container: {
    flex: 1,
  },
  containerContent: {
    flexGrow: 1,
  },
  screen: {
    paddingBottom: normalize(100, "height"),
  },
  profileBackground: {
    paddingTop: normalize(80, "height"),
    backgroundColor: "#024935",
    borderBottomLeftRadius: normalize(15),
    borderBottomRightRadius: normalize(15),
  },
  settings: {
    alignItems: "flex-end",
    marginRight: normalize(15, "width"),
  },
  profilePicture: {
    height: normalize(125, "height"),
    width: normalize(125, "width"),
    backgroundColor: "#D9D9D9",
    borderRadius: 62.5,
    marginLeft: normalize(130, "width"),
  },
  profilePictureEdit: {
    width: normalize(35, "width"),
    height: normalize(35, "height"),
    borderRadius: normalize(17.5),
    backgroundColor: "#FFFFFF",
    marginLeft: normalize(220, "width"),
    marginTop: normalize(-30, "height"),
    paddingTop: normalize(5, "height"),
    alignItems: "center",
  },
  username: {
    color: "#FFFFFF",
    fontFamily: "BebasNeue_400Regular",
    fontWeight: 400,
    fontSize: 32,
    textAlign: "center",
    marginTop: normalize(10, "height"),
    paddingBottom: normalize(20, "height"),
  },
  profileInfo: {
    backgroundColor: "#FFFFFF",
    paddingLeft: normalize(16, "width"),
    paddingRight: normalize(16, "width"),
    paddingBottom: normalize(20, "height"),
    flex: 1,
  },
  recyclingInfoContainer: {
    marginTop: normalize(30, "height"),
  },
  recyclingHeader: {
flexDirection: "row",
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 5,
  },
  recyclingHeaderText: {
  color: "#024935",
  fontFamily: "Bebas Neue",
  fontWeight: 400,
  fontSize: 22,
  marginTop: 0, 
  },
  recyclingGoalItemsNumber: {
    color: "#024935",
    fontFamily: "Titillium Web",
    fontWeight: 700,
    fontSize: 15,
    textAlign: "center",
    marginLeft: normalize(165, "width"),
  },
  recyclingGoalBar: {
    backgroundColor: "#A5CCB7",
    height: normalize(8, "height"),
    borderRadius: normalize(10),
    marginLeft: normalize(5, "width"),
    marginTop: normalize(10, "height"),
  },
  recyclingGoalCompleted: {
    backgroundColor: "#024935",
    height: normalize(8, "height"),
    borderRadius: normalize(10),
  },
  recyclingStatsContainer: {
 backgroundColor: 'white',
  borderRadius: 20,
  padding: 20,
  marginTop: 10,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 4,
  },
  recyclingStatsContainerShadow: {
    elevation: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  recyclingStatsTextContainer: {
paddingBottom: 0,
  marginBottom: 20,
  },
  updateButton: {
 paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 12,
  backgroundColor: "#188038",
  },
  updateButtonText: {
  color: "#FFFFFF",
  fontFamily: "Bebas Neue",
  fontWeight: 400,
  fontSize: 14,
  textAlign: 'center',
  },
  recyclingStatsText: {
    display: "flex",
    flexDirection: "row",
  },
  recyclingStatsLabel: {
 fontFamily: "Titillium Web",
  fontWeight: '600',
  fontSize: 16, // Bigger font
  color: "#024935",
  },
  recyclingStatsInfo: {
fontFamily: "Titillium Web",
fontFamily: "Titillium Web",
  fontWeight: 'bold',
  fontSize: 16,
  color: "#024935",
  textAlign: 'right',
  flex: 1, // Add this to take up remaining space
  },
  gameSlot: {
    flex: 1,
    height: normalize(140, "height"),
    backgroundColor: "#fff",
    borderRadius: normalize(20),
    borderColor: "#D9D9D9",
    borderWidth: normalize(2),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  featuredGameImg: {
    width: normalize(130, "width"),
    height: normalize(130, "height"),
    resizeMode: "contain",
    borderColor: "red",
  },
  learningGameImg: {
    width: normalize(130, "width"),
    height: normalize(130, "height"),
    resizeMode: "contain",
  },
  gameSlotsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: normalize(10, "height"),
  },
  interactiveGamesContainer: {
    marginTop: normalize(20, "height"),
  },
  interactiveGamesContainerScroll: {
    marginTop: normalize(10, "height"),
  },
  interactiveGamesContainerContent: {
    flexGrow: 1,
    paddingBottom: normalize(100, "height"),
  },
});