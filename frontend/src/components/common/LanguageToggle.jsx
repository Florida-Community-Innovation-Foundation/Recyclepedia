import { Pressable, StyleSheet, Text, View } from "react-native";
import { SUPPORTED_LOCALES, useTranslation } from "~/i18n";

// Small EN | ES pill. `light` renders for dark-green backgrounds.
export default function LanguageToggle({ light = false, style }) {
  const { locale, setLocale } = useTranslation();
  const fg = light ? "#FFFFFF" : "#024935";
  return (
    <View style={[styles.row, { borderColor: fg }, style]} accessibilityRole="radiogroup">
      {SUPPORTED_LOCALES.map((option) => {
        const active = option.code === locale;
        return (
          <Pressable
            key={option.code}
            onPress={() => setLocale(option.code)}
            accessibilityRole="radio"
            accessibilityState={{ selected: active }}
            accessibilityLabel={option.label}
            style={[styles.pill, active && { backgroundColor: fg }]}
          >
            <Text style={[styles.text, { color: active ? (light ? "#024935" : "#FFFFFF") : fg }]}>
              {option.code.toUpperCase()}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
    alignSelf: "flex-end",
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  text: {
    fontFamily: "Bebas Neue",
    fontSize: 14,
    letterSpacing: 1,
  },
});
