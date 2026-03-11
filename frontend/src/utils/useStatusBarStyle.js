import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { setStatusBarStyle } from "expo-status-bar";

export function useStatusBarStyle(style) {
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle(style);
    }, [style])
  );
}
