import { View, StyleSheet } from 'react-native';
import { Text, Card, Chip, Button, IconButton } from 'react-native-paper'
import { fetchEvents, CHIP_DATA } from '../App';
import { useSettings } from '../contexts/SettingsContext';
import { useAudioPlayer } from 'expo-audio';



export default function RegConfScreen({route, navigation}) {
    const { settings, updateSetting } = useSettings();
    const { MOCKITEMS, loading } = fetchEvents();

    const clickSource = require('../assets/PotentialClickEffect.mp3');
    const sendSource = require('../assets/sending-effect.mp3');
    const bloopSource = require('../assets/bloop-effect.mp3');
    const clickPlayer = useAudioPlayer(clickSource);
    const sendPlayer = useAudioPlayer(sendSource);
    const bloopPlayer = useAudioPlayer(bloopSource);

    const { item } = route.params;

    const playSoundEffect = (player) => {
        if (settings.soundEffects){ 
            player.seekTo(0);
            player.play();
        }
    }

    return (
        <View style={settings.activeStyle.container}>
            {item.spotsRemaining > 0 && 
            <View>
                <Text style={settings.activeStyle.title}>
                    Registration Succesful
                </Text>
                <Text style={settings.activeStyle.registrationResult}>
                    You are registered for {item.title}
                </Text>
            </View>}
            {item.spotsRemaining < 1 && 
            <View>
                <Text style={settings.activeStyle.title}>
                    Unable to Register
                </Text>
                <Text style={settings.activeStyle.registrationResult}>
                    {item.title} event is full.
                </Text>
                <Text style={settings.activeStyle.registrationResult}>
                    Please select a different event
                </Text>
            </View>}
            {item.spotsRemaining > 0 &&
            <Card style={settings.activeStyle.card}>
                <Card.Content style={{marginTop: 0}}>
                    <View style={settings.activeStyle.chipView}>
                        <Text style={settings.activeStyle.cardDetails} variant='bodyMedium'>
                            {item.date}
                        </Text>
                        <Text style={settings.activeStyle.cardDetails} variant='bodyMedium'>
                            {item.startTime}-{item.endTime}
                        </Text>
                    </View>
                    <Text style={settings.activeStyle.innerCard} variant='bodyMedium'>
                        {item.description}
                    </Text>
                    <Text style={settings.activeStyle.cardDetails} variant='bodyMedium'>
                        {item.location}
                    </Text>
                    <View style={settings.activeStyle.chipView}>
                        {Object.values(item.tags).map(tag => (
                            <Chip style={settings.activeStyle.chip}>
                                <Text style={settings.activeStyle.chipText}>
                                    {CHIP_DATA[tag].name}
                                </Text>
                            </Chip>
                        ))}
                    </View>
                </Card.Content>
            </Card>}   
            <Button mode='contained' style={settings.activeStyle.button}  onPress={() => {navigation.navigate('Home'), playSoundEffect(sendPlayer)}}>
                <Text style={ settings.activeStyle.buttonText }>
                    Go back to Home Page
                </Text>
            </Button>
        </View>
    );
}
