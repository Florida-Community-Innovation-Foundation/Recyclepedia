// Lightweight i18n for Recyclepedia — no extra native dependencies.
//
//   import { useTranslation } from "~/i18n";
//   const { t, locale, setLocale } = useTranslation();
//   <Text>{t("login.title")}</Text>
//   t("locations.count", { count: 3 })   // "{{count}}" placeholders
//
// The language is picked in this order: the user's saved choice in
// AsyncStorage, then the device language, then English. Spanish is the
// only translation today; unknown keys fall back to English, and unknown
// languages fall back to English, so a missing string can never crash a
// screen — it just shows the English text.

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import en from "./en";
import es from "./es";

export const SUPPORTED_LOCALES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

const DICTIONARIES = { en, es };
const STORAGE_KEY = "recyclepedia.locale";

// Device language via the Intl API (built into Hermes on iOS and Android),
// so we don't need expo-localization.
export function detectDeviceLocale() {
  try {
    const tag = Intl.DateTimeFormat().resolvedOptions().locale || "en";
    const lang = String(tag).toLowerCase().split(/[-_]/)[0];
    return DICTIONARIES[lang] ? lang : "en";
  } catch {
    return "en";
  }
}

function lookup(dict, key) {
  return key.split(".").reduce((node, part) => (node == null ? undefined : node[part]), dict);
}

function interpolate(str, params) {
  if (!params) return str;
  return str.replace(/\{\{(\w+)\}\}/g, (_, name) =>
    params[name] === undefined || params[name] === null ? "" : String(params[name]),
  );
}

export function translate(locale, key, params) {
  const value = lookup(DICTIONARIES[locale], key) ?? lookup(en, key);
  if (typeof value !== "string") {
    if (__DEV__) console.warn(`[i18n] missing key: ${key}`);
    return key;
  }
  return interpolate(value, params);
}

const I18nContext = createContext({
  locale: "en",
  setLocale: () => {},
  t: (key, params) => translate("en", key, params),
  isReady: false,
});

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(detectDeviceLocale());
  const [isReady, setIsReady] = useState(false);

  // restore the saved choice once on startup
  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (!cancelled && saved && DICTIONARIES[saved]) setLocaleState(saved);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setIsReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setLocale = useCallback((next) => {
    if (!DICTIONARIES[next]) return;
    setLocaleState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      isReady,
      t: (key, params) => translate(locale, key, params),
    }),
    [locale, setLocale, isReady],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  return useContext(I18nContext);
}

// Translates a recycling item / category name coming from data (the backend
// spreadsheet or CityRules lists). Falls back to the original English name
// when we don't have a translation, so unknown items still display.
export function useItemName() {
  const { locale } = useTranslation();
  return useCallback(
    (name) => {
      if (!name || locale === "en") return name;
      const table = DICTIONARIES[locale]?.items;
      return table?.[String(name).trim()] ?? name;
    },
    [locale],
  );
}
