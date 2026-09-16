import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { normalize } from "~/utils/normalize";
import { useTranslation } from "~/i18n";

// How many sites to show before the "Show more" button. The full county list
// for a category can be hundreds of rows, which is useless on a phone.
const INITIAL_VISIBLE = 10;
const STEP = 10;


// List of drop-off sites for the chosen item type, nearest first.
// `searched` is the category the user submitted (null before the first search)
export default function LocationList({ locations, onSelectCity, searched }) {
  const [visible, setVisible] = useState(INITIAL_VISIBLE);
  const { t } = useTranslation();
  const formatDistance = (miles) => {
    if (!Number.isFinite(miles)) return null;
    if (miles < 0.1) return t("locations.lessThanTenth");
    return t("locations.miles", { miles: miles.toFixed(1) });
  };
  const all = locations ?? [];
  const shown = all.slice(0, visible);

  return (
    <View style={styles.container}>
      <Text style={styles.alternativeText}>
        {all.length === 0
          ? t("locations.header")
          : all.length === 1
            ? t("locations.countOne")
            : t("locations.count", { count: all.length })}
      </Text>

      {all.length === 0 && (
        <Text style={styles.emptyText}>
          {searched
            ? t("locations.emptySearched", { category: searched })
            : t("locations.emptyIdle")}
        </Text>
      )}

      {shown.map((location, index) => {
        const distance = formatDistance(location.distanceMiles);
        return (
          <TouchableOpacity
            key={`${location.name}_${location.street}_${index}`}
            style={styles.itemSection}
            onPress={() => onSelectCity(location.name)}
          >
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{location.name}</Text>
              {distance && <Text style={styles.itemDistance}>{distance}</Text>}
            </View>
            {location.street ? (
              <Text style={styles.itemDescription}>{location.street}</Text>
            ) : null}
          </TouchableOpacity>
        );
      })}

      {all.length > visible && (
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => setVisible((v) => v + STEP)}
        >
          <Text style={styles.moreButtonText}>
            {t("common.showMore", { count: Math.min(STEP, all.length - visible) })}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: normalize(15),
    padding: normalize(15),
    marginTop: normalize(15),
    alignItems: "center",
  },

  alternativeText: {
    fontSize: normalize(18),
    color: "#666",
    marginBottom: normalize(15),
    textAlign: "center",
  },

  emptyText: {
    fontSize: normalize(14),
    color: "#666",
    lineHeight: normalize(20),
    textAlign: "center",
    paddingHorizontal: normalize(5),
  },

  itemSection: {
    backgroundColor: "#f9f9f9",
    borderRadius: normalize(10),
    padding: normalize(15),
    marginBottom: normalize(10),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
    width: "100%",
  },

  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: normalize(5),
  },

  itemTitle: {
    flex: 1,
    fontSize: normalize(18),
    fontWeight: "bold",
    color: "#234E13",
  },

  itemDistance: {
    fontSize: normalize(14),
    fontWeight: "600",
    color: "#024935",
    marginLeft: normalize(10),
  },

  itemDescription: {
    fontSize: normalize(14),
    color: "#666",
    lineHeight: normalize(20),
  },

  moreButton: {
    marginTop: normalize(5),
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(10),
    backgroundColor: "#024935",
  },

  moreButtonText: {
    color: "white",
    fontSize: normalize(14),
    fontWeight: "600",
  },
});
