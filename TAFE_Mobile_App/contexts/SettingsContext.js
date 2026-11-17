import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

//STYLES or Other anchor/hooks
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#F5F5F5'
    },
    settingsContainer: {
        padding: 24,
        backgroundColor: '#F5F5F5'
    },
    title: {
        marginBottom: 12,
        marginRight: 20,
        fontWeight: 'bold',
        color: '#010c31',
        fontSize: 27
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 24,
        color: '#ffffff'
    },
    button: {
        marginTop: 8,
        backgroundColor: '#3CA6E5',
        borderColor: '#000000',
        borderWidth: 2
    },
    buttonText: {
        color: '#F5F5F5', 
        fontWeight: 'bold'
    },
    searchFiltered: {
        fontWeight: 'bold', 
        color: '#000', 
        fontSize: 16
    },
    card: {
        marginBottom: 10,
        marginRight: 8,
        elevation: 3,
        backgroundColor: '#ffffff',
        borderColor: '#DDAB5E',
        borderWidth: 1.5
    },
    smallCardTitle: {
        fontWeight: 'bold', 
        fontSize: 26, 
        color: '#424754'
    },
    cardTitle: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 20,
        paddingBottom: 5
    },
    cardHeading: {
        flex: 1,
        fontWeight: 'bold',
        color: '#000000',
        paddingVertical: 5
    },
    cardHeaders: {
        // display: flex,
        // justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    cardDetails: {
        padding: 5, 
        fontSize: 15, 
        color: '#000000', 
        fontWeight: 'bold'
    },
    registerCardDetails: {
        textAlign: 'right', 
        padding: 5, 
        fontSize: 15, 
        color: '#000000', 
        fontWeight: 'bold'
    },
    cardText: {
        color: '#424754'
    },
    innerCard: {
        fontSize: 12,
        color: '#000'
    },
    chipView: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: '5px'
    },
    chipSelected: {
        marginTop: 3,
        backgroundColor: '#3CA6E5'
    },
    chipUnselected: {
        marginTop: 3,
        backgroundColor: '#ffffff',
        borderColor: '#DDAB5E'
    },
    chipSelectedText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    chipUnselectedText: {
        color: '#000000',
        fontWeight: 'bold'
    },
    eventsSearch: {
        flex: 1,
        fontSize: 'small',
        marginTop: 5,
        backgroundColor: '#fff',
        color: '#000',
        borderColor: '#DDAB5E',
        borderWidth: 1.5,
        paddingHorizontal: 10
    },
    headerView: {
        display: 'flex',
        flexDirection: 'horizontal'

    },
    label: {
        paddingTop: 2,
        fontWeight: 'bold',
        color: '#F5F5F5'
    },
    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
    },
    timeText: {
        paddingTop: 6,
        color: '#7e8390'
    },
    settingsContent: {
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        padding: 25,
    },
    label: {
        paddingTop: 2,
        fontWeight: 'bold',
        color: '#010c31'
    },
    underTextInputText: {
        color: '#424754',
        fontSize: 10,
        marginLeft: 15,
        marginTop: 5
    },
    overTextInputText: {
        color: '#7e8390',
        position: 'absolute',
        top: 5,
        left: -6,
        fontSize: 10,
        marginLeft: 23,
        marginTop: 8
    },
    registerInput: {
        flex: 1,
        fontSize: 'small',
        marginTop: 5,
        backgroundColor: '#fff',
        color: '#000',
        borderColor: '#DDAB5E',
        borderWidth: 1.5,
        padding: 15,
        paddingTop: 22
    },
    registrationResult: {
        marginBottom: 12,
        justifyContent: 'centre',
        color: '#010c31',
        fontSize: 18
    }
})

const stylesFont = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#F5F5F5'
    },
    settingsContainer: {
        padding: 24,
        backgroundColor: '#F5F5F5'
    },
    title: {
        marginBottom: 12,
        marginRight: 20,
        fontWeight: 'bold',
        color: '#010c31',
        fontSize: 32
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 24,
        color: '#ffffff'
    },
    button: {
        marginTop: 8,
        backgroundColor: '#3CA6E5',
        borderColor: '#000000',
        borderWidth: 2
    },
    buttonText: {
        color: '#F5F5F5', 
        fontWeight: 'bold',
        fontSize: 16
    },
    searchFiltered: {
        fontWeight: 'bold', 
        color: '#000', 
        fontSize: 19
    },
    card: {
        marginBottom: 10,
        marginRight: 8,
        elevation: 3,
        backgroundColor: '#ffffff',
        borderColor: '#DDAB5E',
        borderWidth: 1.5
    },
    smallCardTitle: {
        fontWeight: 'bold', 
        fontSize: 29, 
        color: '#424754'
    },
    cardTitle: {
        fontWeight: 'bold',
        color: '#000000',
        fontSize: 24,
        paddingBottom: 5
    },
    cardHeading: {
        flex: 1,
        fontWeight: 'bold',
        color: '#000000',
        paddingVertical: 5
    },
    cardHeaders: {
        flexDirection: 'row'
    },
    cardDetails: {
        padding: 5, 
        fontSize: 20, 
        color: '#000000', 
        fontWeight: 'bold'
    },
    registerCardDetails: {
        textAlign: 'right', 
        padding: 5, 
        fontSize: 20, 
        color: '#000000', 
        fontWeight: 'bold'
    },
    cardText: {
        color: '#424754',
        fontSize: 18
    },
    innerCard: {
        fontSize: 18,
        color: '#000'
    },
    chipView: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: '5px'
    },
    chipSelected: {
        marginTop: 3,
        backgroundColor: '#3CA6E5'
    },
    chipUnselected: {
        marginTop: 3,
        backgroundColor: '#ffffff',
        borderColor: '#DDAB5E'
    },
    chipSelectedText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    chipUnselectedText: {
        color: '#000000',
        fontWeight: 'bold'
    },
    eventsSearch: {
        flex: 1,
        fontSize: 'medium',
        marginTop: 5,
        backgroundColor: '#fff',
        color: '#000',
        borderColor: '#DDAB5E',
        borderWidth: 1.5,
        paddingHorizontal: 10
    },
    headerView: {
        display: 'flex',
        flexDirection: 'horizontal'

    },
    label: {
        paddingTop: 2,
        fontWeight: 'bold',
        color: '#F5F5F5'
    },
    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
    },
    timeText: {
        paddingTop: 6,
        color: '#7e8390',
        fontSize: 16
    },
    settingsContent: {
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        padding: 25,
    },
    label: {
        paddingTop: 2,
        fontWeight: 'bold',
        color: '#010c31',
        fontSize: 17
    },
    underTextInputText: {
        color: '#424754',
        fontSize: 15,
        marginLeft: 15,
        marginTop: 5
    },
    overTextInputText: {
        color: '#7e8390',
        position: 'absolute',
        top: 0,
        left: -6,
        fontSize: 15,
        marginLeft: 23,
        marginTop: 8
    },
    registerInput: {
        flex: 1,
        fontSize: 'medium',
        marginTop: 5,
        backgroundColor: '#fff',
        color: '#000',
        borderColor: '#DDAB5E',
        borderWidth: 1.5,
        padding: 15,
        paddingTop: 22
    },
    registrationResult: {
        marginBottom: 12,
        justifyContent: 'centre',
        color: '#010c31',
        fontSize: 23
    }
})

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#010c31'
    },
    settingsContainer: {
        padding: 24,
        backgroundColor: '#010c31'
    },
    title: {
        marginBottom: 12,
        marginRight: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 27
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 24,
        color: '#010c31'
    },
    button: {
        marginTop: 8,
        backgroundColor: '#3CA6E5',
        borderColor: '#DDAB5E',
        borderWidth: 2
    },
    buttonText: {
        color: '#424754', 
        fontWeight: 'bold'
    },
    searchFiltered: {
        fontWeight: 'bold', 
        color: '#ffffff', 
        fontSize: 16
    },
    card: {
        marginBottom: 10,
        marginRight: 8,
        elevation: 3,
        backgroundColor: '#000000',
        borderColor: '#DDAB5E',
        borderWidth: 1.5
    },
    smallCardTitle: {
        fontWeight: 'bold', 
        fontSize: 26, 
        color: '#F5F5F5'
    },
    cardText: {
        color: '#F5F5F5'
    },
    cardTitle: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 20,
        paddingBottom: 5
    },
    cardHeading: {
        flex: 1,
        fontWeight: 'bold',
        color: '#ffffff',
        paddingVertical: 5
    },
    cardHeaders: {
        // display: flex,
        // justifyContent: 'space-evenly',
        flexDirection: 'row'
    },
    innerCard: {
        fontSize: 12,
        color: '#ffffff'
    },
    cardDetails: {
        padding: 5, 
        fontSize: 15, 
        color: '#ffffff', 
        fontWeight: 'bold'
    },
    registerCardDetails: {
        textAlign: 'right', 
        padding: 5, 
        fontSize: 15, 
        color: '#ffffff', 
        fontWeight: 'bold'
    },
    chipView: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: '5px'
    },
    chipSelected: {
        marginTop: 3,
        backgroundColor: '#3CA6E5'
    },
    chipUnselected: {
        marginTop: 3,
        backgroundColor: '#010c31',
        borderColor: '#DDAB5E'
    },
    chipSelectedText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    chipUnselectedText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    eventsSearch: {
        flex: 1,
        fontSize: 'small',
        marginTop: 5,
        backgroundColor: '#000000',
        color: '#ffffff',
        borderColor: '#DDAB5E',
        borderWidth: 1.5,
        paddingHorizontal: 10
    },
    headerView: {
        display: 'flex',
        flexDirection: 'horizontal'

    },
    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
    },
    timeText: {
        paddingTop: 6,
        color: '#7e8390'
    },
    settingsContent: {
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        padding: 25,
    },
    label: {
        paddingTop: 2,
        fontWeight: 'bold',
        color: '#F5F5F5'
    },
    underTextInputText: {
        color: '#F5F5F5',
        fontSize: 10,
        marginLeft: 15,
        marginTop: 5
    },
    overTextInputText: {
        color: '#7e8390',
        position: 'absolute',
        top: 5,
        left: -6,
        fontSize: 10,
        marginLeft: 23,
        marginTop: 8
    },
    registerInput: {
        flex: 1,
        fontSize: 'small',
        marginTop: 5,
        backgroundColor: '#000',
        color: '#fefefe',
        borderColor: '#DDAB5E',
        borderWidth: 1.5,
        padding: 15,
        paddingTop: 22
    },
    registrationResult: {
        marginBottom: 12,
        justifyContent: 'centre',
        color: '#F5F5F5',
        fontSize: 17
    }
})

const darkStylesFont = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#010c31'
    },
    settingsContainer: {
        padding: 24,
        backgroundColor: '#010c31'
    },
    title: {
        marginBottom: 12,
        marginRight: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 32
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 24,
        color: '#010c31'
        
    },
    button: {
        marginTop: 8,
        backgroundColor: '#3CA6E5',
        borderColor: '#DDAB5E',
        borderWidth: 2
    },
    buttonText: {
        color: '#424754', 
        fontWeight: 'bold',
        fontSize: 16
    },
    searchFiltered: {
        fontWeight: 'bold', 
        color: '#ffffff', 
        fontSize: 19
    },
    card: {
        marginBottom: 10,
        marginRight: 8,
        elevation: 3,
        backgroundColor: '#000000',
        borderColor: '#DDAB5E',
        borderWidth: 1.5
    },
    smallCardTitle: {
        fontWeight: 'bold', 
        fontSize: 29, 
        color: '#F5F5F5'
    },
    cardText: {
        color: '#F5F5F5',
        fontSize: 18
    },
    cardTitle: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 24,
        paddingBottom: 5
    },
    cardHeading: {
        flex: 1,
        fontWeight: 'bold',
        color: '#ffffff',
        paddingVertical: 5,
        fontSize: 18
    },
    cardHeaders: {
        flexDirection: 'row'
    },
    innerCard: {
        fontSize: 18,
        color: '#ffffff'
    },
    cardDetails: {
        padding: 5, 
        fontSize: 20, 
        color: '#ffffff', 
        fontWeight: 'bold'
    },
    registerCardDetails: {
        textAlign: 'right', 
        padding: 5, 
        fontSize: 20, 
        color: '#ffffff', 
        fontWeight: 'bold'
    },
    chipView: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: '5px'
    },
    chipSelected: {
        marginTop: 3,
        backgroundColor: '#3CA6E5'
    },
    chipUnselected: {
        marginTop: 3,
        backgroundColor: '#010c31',
        borderColor: '#DDAB5E'
    },
    chipSelectedText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    chipUnselectedText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    eventsSearch: {
        flex: 1,
        fontSize: 'medium',
        marginTop: 5,
        backgroundColor: '#000000',
        color: '#ffffff',
        borderColor: '#DDAB5E',
        borderWidth: 1.5,
        paddingHorizontal: 10
    },
    headerView: {
        display: 'flex',
        flexDirection: 'horizontal'

    },
    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
    },
    timeText: {
        paddingTop: 6,
        color: '#7e8390',
        fontSize: 16
    },
    settingsContent: {
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        padding: 25,
    },
    label: {
        paddingTop: 2,
        fontWeight: 'bold',
        color: '#F5F5F5',
        fontSize: 17
    },
    underTextInputText: {
        color: '#F5F5F5',
        fontSize: 15,
        marginLeft: 15,
        marginTop: 5
    },
    overTextInputText: {
        color: '#7e8390',
        position: 'absolute',
        top: 0,
        left: -6,
        fontSize: 15,
        marginLeft: 23,
        marginTop: 8
    },
    registerInput: {
        flex: 1,
        fontSize: 'medium',
        marginTop: 5,
        backgroundColor: '#000',
        color: '#fefefe',
        borderColor: '#DDAB5E',
        borderWidth: 1.5,
        padding: 15,
        paddingTop: 22
    },
    registrationResult: {
        marginBottom: 12,
        justifyContent: 'centre',
        color: '#F5F5F5',
        fontSize: 23
    }
})

// The settings the app starts with before anything has been saved
const defaultSettings = {
  darkMode: false,
  largeFonts: false,
  soundEffects: false,
  activeStyle: styles,
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
    if (key !== 'activeStyle')
        {
            switch (true) {
                case ((settings.largeFonts && (key === 'darkMode' && value === true)) || (settings.darkMode && (key === 'largeFonts' && value === true))) :
                    setSettings(current => ({ ...current, ['activeStyle']: darkStylesFont }));
                    try {
                        await AsyncStorage.setItem('activeStyle', JSON.stringify(darkStylesFont));
                    } catch (error) {
                        console.warn("Couldn't save setting " + 'activeStyle', error);
                    }
                    break;
                case ((!settings.largeFonts && (key === 'darkMode' && value === true)) || (settings.darkMode && (key === 'largeFonts' && value === false))) :
                    setSettings(current => ({ ...current, ['activeStyle']: darkStyles }));
                    try {
                        await AsyncStorage.setItem('activeStyle', JSON.stringify(darkStyles));
                    } catch (error) {
                        console.warn("Couldn't save setting " + 'activeStyle', error);
                    }
                    break;
                case ((!settings.largeFonts && (key === 'darkMode' && value === false)) || (!settings.darkMode && (key === 'largeFonts' && value === false))) :
                    setSettings(current => ({ ...current, ['activeStyle']: styles }));
                    try {
                        await AsyncStorage.setItem('activeStyle', JSON.stringify(styles));
                    } catch (error) {
                        console.warn("Couldn't save setting " + 'activeStyle', error);
                    }
                    break;
                case ((settings.largeFonts && (key === 'darkMode' && value === false)) || (!settings.darkMode && (key === 'largeFonts' && value === true))) :
                    setSettings(current => ({ ...current, ['activeStyle']: stylesFont }));
                    try {
                        await AsyncStorage.setItem('activeStyle', JSON.stringify(stylesFont));
                    } catch (error) {
                        console.warn("Couldn't save setting " + 'activeStyle', error);
                    }
                    break;
            }
        }
    setSettings(current => ({ ...current, [key]: value }));
    try {
        if (key === 'activeStyle')
        {
            console.log('styling updated');
            console.log(`new styling is ${settings.activeStyle}`);
        }
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

 