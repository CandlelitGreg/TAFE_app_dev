import { View, StyleSheet, Switch } from 'react-native';
import { Text } from 'react-native-paper'
import { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';

export default function SettingsScreen({ navigation }) {
    const { settings, updateSetting } = useSettings();

    return (
        <View style={settings.activeStyle.container}>
            <View style={settings.activeStyle.settingsContainer}>
                <Text variant='headlineMedium' style={settings.activeStyle.title}>
                    Placeholder for settings
                </Text>
                <View style={settings.activeStyle.settingsContent}>
                    <Text style={settings.activeStyle.label}>
                        {/* {darkModeStatus ? 'Dark Mode On' : 'Dark Mode Off'} */}
                        Dark Mode:
                    </Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#3CA6E5' }}
                        thumbColor={settings.darkMode ? '#DDAB5E' : '#f4f3f4'}
                        activeThumbColor={settings.darkMode ? '#DDAB5E' : '#f4f3f4'}
                        onValueChange={(val) => updateSetting('darkMode', val)}
                        value={settings.darkMode}
                    />
                </View>
                <View style={settings.activeStyle.settingsContent}>
                    <Text style={settings.activeStyle.label}>
                        {/* {darkModeStatus ? 'Dark Mode On' : 'Dark Mode Off'} */}
                        Large Fonts:
                    </Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#3CA6E5' }}
                        thumbColor={settings.largeFonts ? '#DDAB5E' : '#f4f3f4'}
                        activeThumbColor={settings.largeFonts ? '#DDAB5E' : '#f4f3f4'}
                        onValueChange={(val) => updateSetting('largeFonts', val)}
                        value={settings.largeFonts}
                    />
                </View>
                <View style={settings.activeStyle.settingsContent}>
                    <Text style={settings.activeStyle.label}>
                        {/* {darkModeStatus ? 'Dark Mode On' : 'Dark Mode Off'} */}
                        Sound Effects:
                    </Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#3CA6E5' }}
                        thumbColor={settings.soundEffects ? '#DDAB5E' : '#f4f3f4'}
                        activeThumbColor={settings.soundEffects ? '#DDAB5E' : '#f4f3f4'}
                        onValueChange={(val) => updateSetting('soundEffects', val)}
                        value={settings.soundEffects}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
        borderColor: '#000',
        borderWidth: 2
    },
    card: {
        marginBottom: 10,
        marginRight: 8,
        elevation: 3,
        backgroundColor: '#ffffff',
        borderColor: '#DDAB5E',
        borderWidth: 1.5
    },
    innerCard: {
        marginLeft: 10,
        color: '#000'
    },
    chipView: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: '5px'
    },
    chip: {
        marginTop: 3,
        backgroundColor: '#3CA6E5'
    },
    chipText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    eventsSearch: {
        flex: 1,
        fontSize: 'small',
        height: 5,
        marginTop: 5,
        backgroundColor: '#fff',
        color: '#000',
        borderColor: '#DDAB5E',
        borderWidth: 1.5
    },
    headerView: {
        display: 'flex',
        flexDirection: 'horizontal'

    },
    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        padding: 25,
    },
    label: {
        paddingTop: 2,
        fontWeight: 'bold',
        color: '#010c31'
    }
})