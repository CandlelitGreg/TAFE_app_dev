import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// The settings the app starts with before anything has been saved
const defaultSettings = {
  darkMode: false,
  largeFonts: false,
  soundEffects: false,
};

const SettingsContext = createContext({
  settings: defaultSettings,
  updateSetting: () => {},
});

export function SettingsProvider({ children }) {
  // Settings live in React state, so changing them redraws the screen
  const [settings, setSettings] = useState(defaultSettings);

  // Load the saved settings once, when the app starts
  useEffect(() => {
    const loadSettings = async () => {
      const saved = {};
      for (const key of Object.keys(defaultSettings)) {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            saved[key] = JSON.parse(value); // "true" -> true, "3" -> 3
          }
        } catch (error) {
          console.warn("Couldn't load setting " + key, error);
        }
      }
      setSettings(current => ({ ...current, ...saved }));
    };
    loadSettings();
  }, []); // [] means "only run once"

  // Change one setting: update state (redraws the app) and save it
  const updateSetting = async (key, value) => {
    setSettings(current => ({ ...current, [key]: value }));
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.warn("Couldn't save setting " + key, error);
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

// Use this in any component: const { settings, updateSetting } = useSettings();
export function useSettings() {
  return useContext(SettingsContext);
}
 