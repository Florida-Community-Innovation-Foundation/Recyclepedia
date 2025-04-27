import { Picker } from "@react-native-picker/picker";
import dayjs from "dayjs";
import { BlurView } from "expo-blur";
import { Formik } from "formik";
import _ from "lodash";
import { useState } from "react";
import {
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as yup from "yup";
import SubmitEventCalendar from "../SubmitEventCalendar";
import SubmitEventInput from "../SubmitEventInput";

const { width, height } = Dimensions.get("window");

export default function SubmitEventModal({
  isEventModalVisible,
  setIsEventModalVisible,
  setCalendarEvents,
}) {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const inputFields = {
    text: {
      event: ["title", "description", "location"],
      person: ["name", "email"],
    },
    date: ["start", "end"],
    category: "category",
  };

  const eventCategories = [
    "Workshop",
    "Seminar",
    "Community Event",
    "Recycling Drive",
    "Educational Event",
    "Others",
  ];

  const getFormValidationSchema = () => {
    const textFieldValidationSchema = _.reduce(
      [
        ...inputFields.text.event,
        ...inputFields.text.person,
        inputFields.category,
      ],
      (obj, key) => {
        obj[key] =
          key === "email"
            ? yup.string().email().required()
            : yup.string().required();
        return obj;
      },
      {},
    );
    // Dates must be of form yyyy-mm-dd, hh:mm AM/PM
    const dateFieldValidationSchema = _.reduce(
      [...inputFields.date],
      (obj, key) => {
        obj[key] = yup
          .string()
          .matches(
            new RegExp(
              "[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}, [0-9]{2}:[0-9]{2} [AM|PM]",
            ),
            "Valid Format: mm/dd/yyyy, hh:mm [AM|PM]",
          )
          .test("is-valid-date", "Invalid date", (value) => {
            return !isNaN(new Date(value));
          });
        return obj;
      },
      {},
    );
    return yup.object().shape({
      ...textFieldValidationSchema,
      ...dateFieldValidationSchema,
    });
  };

  const getFormInitialValues = () => {
    const textFieldValues = _.reduce(
      [
        ...inputFields.text.event,
        ...inputFields.text.person,
        inputFields.category,
      ],
      (obj, key) => {
        obj[key] = "";
        return obj;
      },
      {},
    );
    const dateFieldValues = _.reduce(
      [...inputFields.date],
      (obj, key) => {
        obj[key] = dayjs().format("YYYY-MM-DD");
        return obj;
      },
      {},
    );
    return {
      ...textFieldValues,
      ...dateFieldValues,
    };
  };

  const renderInputs = (inputFields, inputFieldCategory, inputFieldProps) => {
    return _.map(inputFields, (inputField) => (
      <SubmitEventInput
        key={`${inputFieldCategory}${inputField}`}
        inputField={inputField}
        inputFieldCategory={inputFieldCategory}
        setIsCalendarVisible={setIsCalendarVisible}
      />
    ));
  };

  return (
    <View>
      <Modal
        visible={isEventModalVisible}
        transparent={true}
        animationType="slide"
      >
        <BlurView style={styles.blurView} blurType="light" blurAmount={30} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.CalendarmodalBackground}>
            <KeyboardAvoidingView style={styles.CalendareventModalContent}>
              {/* Wrap all text inside <Text> */}
              <Text style={styles.CalendarmodalTitle}>Add Event</Text>
              <ScrollView>
                <Formik
                  validationSchema={getFormValidationSchema()}
                  initialValues={getFormInitialValues()}
                  onSubmit={(values) => {
                    console.log(values);
                    setIsEventModalVisible(false);
                    setCalendarEvents((prevCalendarEvents) => [
                      ...prevCalendarEvents,
                      values,
                    ]);
                  }}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    setFieldValue,
                    errors,
                    touched,
                    isValid,
                  }) => {
                    const inputFieldProps = [
                      handleChange,
                      handleBlur,
                      values,
                      errors,
                      touched,
                    ];
                    return (
                      <View>
                        {renderInputs(
                          inputFields.text.event,
                          "Event",
                          inputFieldProps,
                        )}
                        <Picker
                          selectedValue={values.category}
                          onValueChange={(itemValue) =>
                            setFieldValue("category", itemValue)
                          }
                          style={styles.categoryPicker}
                        >
                          <Picker.Item label="Select a category" value="" />
                          {eventCategories.map((category) => (
                            <Picker.Item
                              key={category}
                              label={category}
                              value={category}
                            />
                          ))}
                        </Picker>
                        <View>
                          {renderInputs(
                            inputFields.date,
                            "Date",
                            inputFieldProps,
                          )}
                          <SubmitEventCalendar
                            isCalendarVisible={isCalendarVisible}
                          />
                          {renderInputs(
                            inputFields.text.person,
                            "Person",
                            inputFieldProps,
                          )}
                        </View>
                        <Button
                          onPress={handleSubmit}
                          disabled={!isValid}
                          color="#2F4F2F"
                          title="Save Event"
                        />
                      </View>
                    );
                  }}
                </Formik>
              </ScrollView>
              <TouchableOpacity
                style={styles.CalendarcloseButton}
                onPress={() => {
                  setIsEventModalVisible(false);
                  setIsCalendarVisible(false);
                }}
              >
                <Text style={styles.CalendarcloseButtonText}>X</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  greenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(47, 79, 47, 0.3)", // Green with transparency
  },
  modalContent: {
    width: width * 0.85,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignSelf: "center",
    marginTop: height * 0.3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#2F4F2F",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  skyContainer: {
    width: "100%",
    height: height * 0.3, // Sky section height
    backgroundColor: "#ADD8E6", // Green sky background
    position: "absolute",
    top: 0,
    zIndex: -1, // Behind main content
  },
  cloud: {
    position: "absolute",
    top: 50, // Adjust to your preference
    width: 150,
    height: 80,
    resizeMode: "contain",
  },
  diggy: {
    position: "absolute",
    top: 50, // Adjust to your preference
    width: 300 * 1.5,
    height: 160 * 1.5,
    resizeMode: "contain",
  },
  mountain: {
    position: "absolute",
    bottom: 20, // Position near the bottom of the sky container
    right: 50, // Float on the right side of the screen
    width: 200 * 2.7,
    height: 150 * 2.7,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    marginTop: height * 0.3, // Push content below the sky section
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  image: {
    width: width * 0.25,
    height: height * 0.125,
    alignSelf: "center",
    resizeMode: "contain",
  },
  bigTitle: {
    marginTop: -10,
    fontSize: 50,
    textAlign: "center",
    color: "#6ad04b",
  },
  MediumTitle: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 15,
    color: "black",
  },
  littleTitle: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 20,
    color: "black",
    top: -5,
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
    color: "blue",
  },
  dropdownBubble: {
    backgroundColor: "#2F4F2F",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center",
    maxWidth: "80%",
  },
  labelText: {
    marginLeft: 5,
    marginBottom: 5,
  },
  dropdownText: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
  },
  getStartedTitle: {
    marginTop: 20,
    fontSize: 30,
    textAlign: "center",
    marginBottom: 15,
  },
  takeActionContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  takeActionTitle: {
    fontSize: 30,
    color: "black",
    marginHorizontal: 10,
  },
  line: {
    flex: 3,
    height: 5,
  },
  greenBackground: {
    backgroundColor: "#2F4F2F",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  blueBubble: {
    backgroundColor: "#ADD8E6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    padding: 15,
    borderRadius: 25,
    marginVertical: 5,
  },
  whiteBubble: {
    backgroundColor: "white",
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 10,
  },
  bubbleText: {
    color: "black",
    fontSize: 16,
    flex: 1,
    textAlign: "left",
  },
  exploreBubble: {
    backgroundColor: "#2F4F2F",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  exploreText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  newsletterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2F4F2F",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  newsletterTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  newsletterText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  newsletterForm: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  emailLabel: {
    color: "white",
    fontSize: 14,
    marginRight: 5,
  },
  emailInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  signUpButton: {
    backgroundColor: "#ADD8E6",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  signUpText: {
    color: "white",
    fontSize: 14,
  },
  communitySectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  horizontalLine: {
    flex: 3,
    height: 5,
    backgroundColor: "#90EE90",
    marginHorizontal: 10,
  },
  communityTitle: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  communityContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  communityLeft: {
    flex: 1,
    paddingRight: 10,
  },
  communitySubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  communityParagraph: {
    fontSize: 14,
    color: "#333",
  },
  dateTimeNotLast: {
    flex: 1,
    marginRight: 5,
  },
  dateTimeLast: {
    flex: 1,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#2F4F2F",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  calendarButton: {
    padding: 15,
    backgroundColor: "#2F4F2F",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  calendarButtonText: {
    color: "white",
    fontSize: 16,
  },
  CalendarmodalBackground: {
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  CalendarmodalTitle: {
    textTransform: "uppercase",
    fontWeight: 500,
    paddingBottom: 10,
  },
  CalendarmodalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  CalendareventModalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  CalendartimeButton: {
    backgroundColor: "#ADD8E6",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  CalendartimeButtonText: {
    color: "white",
    fontSize: 14,
  },
  CalendarsaveButton: {
    backgroundColor: "#2F4F2F",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  CalendarsaveButtonText: {
    color: "white",
    fontSize: 16,
  },
  CalendarcloseButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#2F4F2F",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  CalendarcloseButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdown: {
    borderColor: "#888888",
    borderWidth: 1,
    borderRadius: 3,
  },

  eventDetailModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  eventDetailModal: {
    width: "80%",
    backgroundColor: "#fff", // White container
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  eventDetailCloseButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  eventDetailCloseButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  eventDetailTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
    textAlign: "center",
  },
  eventDetailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  eventCharacterImage: {
    width: 80,
    height: 80,
    marginTop: 10,
    resizeMode: "contain",
  },
  eventDetailDeleteButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "red",
    paddingVertical: 5, // Reduced padding
    paddingHorizontal: 5, // Reduced padding
    borderRadius: 8, // Slightly smaller radius for a compact button
    alignItems: "center",
  },
  eventDetailDeleteButtonText: {
    color: "#fff",
    fontSize: 14, // Reduced font size
    fontWeight: "bold",
  },
  placeholderStyle: {
    color: "#888888",
    fontSize: 13,
  },
  timePickerModalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  timePickerModal: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  categoryPicker: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  timePickerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    width: "100%",
  },
  timePickerLabel: {
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },
  timePicker: {
    height: 50,
    width: 100,
    color: "green", // Green text
  },
  timePickerSaveButton: {
    marginTop: 20,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  timePickerSaveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  timeInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
    width: 60, // Adjust width for input field
    textAlign: "center",
    color: "green",
    fontSize: 16,
  },
  timePickerDropdown: {
    width: 100,
    backgroundColor: "#f0f0f0",
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginLeft: 105, // Add space to move it more to the right
  },
});
