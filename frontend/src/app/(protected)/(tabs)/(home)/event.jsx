import Animated, { FadeIn } from "react-native-reanimated";

export default function EventModal() {
  return (
    <Animated.View entering={FadeIn}>
      <View style={styles.eventDetailModalOverlay}>
        <View style={styles.eventDetailModal}>
          {/* Close Button in Top-Right */}
          <TouchableOpacity
            style={styles.eventDetailCloseButton}
            onPress={() => setIsEventDetailModalVisible(false)}
          >
            <Text style={styles.eventDetailCloseButtonText}>X</Text>
          </TouchableOpacity>

          {/* Event Title */}
          <Text style={styles.eventDetailTitle}>
            {selectedEventDetails?.title || "No Title"}
          </Text>

          {/* Event Details */}
          <Text style={styles.eventDetailText}>
            Description: {selectedEventDetails?.description || "No Description"}
          </Text>
          <Text style={styles.eventDetailText}>
            Place: {selectedEventDetails?.place || "No Place"}
          </Text>
          <Text style={styles.eventDetailText}>
            Date: {selectedDate || "No Date Selected"}
          </Text>
          <Text style={styles.eventDetailText}>
            Time: {selectedEventDetails?.time || "No Time Selected"}
          </Text>

          {/* Event Image */}
          <Image style={styles.eventCharacterImage} />

          {/* Delete Button in Bottom-Right */}
          <TouchableOpacity
            style={styles.eventDetailDeleteButton}
            onPress={() =>
              handleDeleteEvent(selectedDate, selectedEventDetails)
            }
          >
            <Text style={styles.eventDetailDeleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}
