import Animated, { FadeIn } from "react-native-reanimated";

export default function CalendarModal() {
  return (
    <Animated.View
      visible={isTimePickerVisible}
      transparent={true}
      entering={FadeIn}
    >
      <View style={styles.timePickerModalOverlay}>
        <View style={styles.timePickerModal}>
          {/* Hours Input */}
          <View style={styles.timePickerRow}>
            <Text style={styles.timePickerLabel}>Hour:</Text>
            <TextInput
              style={styles.timeInput}
              keyboardType="numeric"
              maxLength={2} // Restrict input to 2 digits
              value={selectedHour?.toString() || ""} // Display current hour or empty
              onChangeText={(value) => {
                setSelectedHour(value); // Allow free input
              }}
              placeholder="HH"
              placeholderTextColor="gray"
            />
          </View>

          {/* Minutes Input */}
          <View style={styles.timePickerRow}>
            <Text style={styles.timePickerLabel}>Minutes:</Text>
            <TextInput
              style={styles.timeInput}
              keyboardType="numeric"
              maxLength={2} // Restrict input to 2 digits
              value={selectedMinute?.toString() || ""} // Display current minutes or empty
              onChangeText={(value) => {
                setSelectedMinute(value); // Allow free input
              }}
              placeholder="MM"
              placeholderTextColor="gray"
            />
          </View>

          <View style={styles.timePickerRow}>
            <Text style={styles.timePickerLabel}>AM/PM:</Text>
            <DropDownPicker
              open={isDropdownOpen}
              value={selectedPeriod} // Current value
              items={[
                { label: "AM", value: "AM" },
                { label: "PM", value: "PM" },
              ]}
              setOpen={setIsDropdownOpen}
              setValue={setSelectedPeriod}
              setItems={setDropdownItems}
              style={styles.timePickerDropdown}
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.timePickerSaveButton}
            onPress={() => handleSaveTime()}
          >
            <Text style={styles.timePickerSaveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
