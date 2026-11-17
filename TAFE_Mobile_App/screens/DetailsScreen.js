import { View, StyleSheet } from 'react-native';
import { Text, Card, Chip, Button, IconButton } from 'react-native-paper'
import { fetchEvents, CHIP_DATA } from '../App';
import { useSettings } from '../contexts/SettingsContext';
import { useAudioPlayer } from 'expo-audio';



export default function DetailsScreen({route, navigation}) {
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
            <Card style={settings.activeStyle.card}>
                <Card.Title title={item.title} titleStyle={settings.activeStyle.searchFiltered}/>
                <Card.Content style={{marginTop: 0}}>
                    <Text style={settings.activeStyle.innerCard} variant='bodyMedium'>
                        {item.description}
                    </Text>
                </Card.Content>
            </Card>
            <Text style={settings.activeStyle.cardDetails} variant='bodyMedium'>
                {item.location}
            </Text>
            <View style={settings.activeStyle.chipView}>
                <Text style={settings.activeStyle.cardDetails} variant='bodyMedium'>
                    {item.date}
                </Text>
                <Text style={settings.activeStyle.cardDetails} variant='bodyMedium'>
                    {item.startTime}-{item.endTime}
                </Text>
            </View>
            <Text style={[settings.activeStyle.cardDetails, {textAlign: 'right'}]} variant='bodyMedium'>
                {'Spots remaining:     ' + item.spotsRemaining}
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
            <Button mode='contained' style={settings.activeStyle.button}  onPress={() => {navigation.navigate('Register', {item: item}), playSoundEffect(bloopPlayer)}}>
                <Text style={ settings.activeStyle.buttonText }>
                    Register
                </Text>
            </Button>
        </View>
    );
}
