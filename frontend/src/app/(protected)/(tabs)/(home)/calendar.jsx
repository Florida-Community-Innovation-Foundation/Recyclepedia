import Animated, { SlideInRight } from "react-native-reanimated";

export default function CalendarModal() {
  return (
    <Animated.View entering={Fade}>
      {/* Blur Effect */}
      <BlurView
        style={styles.blurView}
        blurType="light"
        blurAmount={isEventModalVisible ? 20 : 10} // Increase blur if Add Event modal is active
      />

      {/* Green Overlay */}
      <View style={styles.greenOverlay} />

      {/* Modal Content */}
      <View style={styles.modalContentCalendar}>
        <Text style={styles.modalTitleCalendar}>Community Calendar</Text>

        {/* Calendar Component */}
        <Calendar
          markedDates={Object.keys(displayEvents).reduce((acc, date) => {
            acc[date] = { marked: true };
            return acc;
          }, {})}
          onDayPress={(day) => {
            const events = displayEvents[day.dateString] || [];
            if (events.length > 0) {
              setSelectedEventDetails(events[0]); // Set the first event (assuming one per day)
              setIsEventDetailModalVisible(true); // Trigger the modal to open
            } else {
              Alert.alert("No Events", "No events on this day.");
            }
          }}
        />

        {/* Close Button */}
        <TouchableOpacity
          style={styles.CalendarcloseButton}
          onPress={toggleCalendar}
        >
          <Text style={styles.CalendarcloseButtonText}>X</Text>
        </TouchableOpacity>

        {/* Add Event Button */}
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => setIsEventModalVisible(true)} // Open Add Event Modal
        >
          <Text style={styles.calendarButtonText}>Add Event</Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        entering={SlideInRight}
        visible={isEventModalVisible}
        transparent={true}
      >
        <BlurView style={styles.blurView} blurType="light" blurAmount={30} />

        <View style={styles.CalendarmodalBackground}>
          <View style={styles.CalendareventModalContent}>
            {/* Wrap all text inside <Text> */}
            <Text style={styles.CalendarmodalTitle}>Add Event</Text>
            <TextInput
              style={styles.Calendarinput}
              placeholder="Event Title"
              placeholderTextColor="#888888" // Set the desired placeholder color
              value={eventTitle}
              onChangeText={setEventTitle}
            />
            <TextInput
              style={styles.Calendarinput}
              placeholder="Event Description"
              placeholderTextColor="#888888" // Set the desired placeholder color
              value={eventDescription}
              onChangeText={setEventDescription}
              multiline
            />
            <TextInput
              style={styles.Calendarinput}
              placeholder="Event Place"
              placeholderTextColor="#888888" // Set the desired placeholder color
              value={eventPlace}
              onChangeText={setEventPlace}
            />

            {/* Calendar for Day Selection */}
            <Calendar
              onDayPress={handleDayPress} // Save selected day
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: "blue",
                },
              }}
            />

            {/* Display Selected Date */}
            <Text style={[styles.dateText, { marginBottom: 10 }]}>
              Selected Date: {selectedDate || "None"}
            </Text>

            <Text style={[styles.inputlabel, { marginBottom: 10 }]}>
              Event Date: {selectedDate || "None"}
            </Text>
            <TouchableOpacity
              style={styles.CalendartimeButton}
              onPress={() => setIsTimePickerVisible(true)}
            >
              <Text style={styles.CalendartimeButtonText}>
                Select Time:{" "}
                {eventTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </Text>
            </TouchableOpacity>

            {/* Time Picker */}
            {isTimePickerVisible && (
              <DateTimePicker
                value={eventTime}
                mode="time" // Time picker mode
                is24Hour={false} // Set to true for 24-hour format
                display="default"
                onChange={handleTimeChange} // Handle time selection
              />
            )}

            <TouchableOpacity
              style={styles.CalendarsaveButton}
              onPress={saveEvent}
            >
              <Text style={styles.CalendarsaveButtonText}>Save Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.CalendarcloseButton}
              onPress={() => setIsEventModalVisible(false)}
            >
              <Text style={styles.CalendarcloseButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}
