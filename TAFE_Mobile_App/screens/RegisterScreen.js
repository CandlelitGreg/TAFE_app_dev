import { useState, useCallback } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Text, Card, Chip, Button, IconButton } from 'react-native-paper'
import { fetchEvents, CHIP_DATA } from '../App';
import { useSettings } from '../contexts/SettingsContext';
import { useAudioPlayer } from 'expo-audio';


export default function RegisterScreen({route, navigation}) {
    const { settings, updateSetting } = useSettings();
    const { MOCKITEMS, loading } = fetchEvents();

    const clickSource = require('../assets/PotentialClickEffect.mp3');
    const sendSource = require('../assets/sending-effect.mp3');
    const bloopSource = require('../assets/bloop-effect.mp3');
    const clickPlayer = useAudioPlayer(clickSource);
    const sendPlayer = useAudioPlayer(sendSource);
    const bloopPlayer = useAudioPlayer(bloopSource);

    const { item } = route.params;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const playSoundEffect = (player) => {
        if (settings.soundEffects){ 
            player.seekTo(0);
            player.play();
        }
    }

    const RunSubmit = (event) => {
        if (name !== '' && email !== '')
        {   
            playSoundEffect(sendPlayer);
            navigation.navigate('Confirmation', {item: item})
        } 
        else 
        {
            playSoundEffect(clickPlayer);
        }
    }




    return (
        <ScrollView>
        <View style={settings.activeStyle.container}>
            <Card
                key={item.id}
                style={settings.activeStyle.card}
            >
                <Card.Title title={item.title} titleStyle={settings.activeStyle.cardTitle} />
                <Card.Content>
                    <Text style={settings.activeStyle.innerCard} variant='bodyMedium'>
                        {item.description}
                    </Text>
                    <Text style={settings.activeStyle.innerCard} variant='bodyMedium'>
                        {'Spots remaining:     ' + item.spotsRemaining}
                    </Text>
                    <Text style={settings.activeStyle.registerCardDetails} variant='bodyMedium'>
                        {item.location}
                    </Text>
                    <Text style={settings.activeStyle.registerCardDetails} variant='bodyMedium'>
                        {item.startTime + '-' + item.endTime + ' || '+ item.date}
                    </Text>
                    <View style={settings.activeStyle.chipView}>
                        {Object.values(item.tags).map(tag => 
                                <Chip 
                                    key={tag}
                                    style={settings.activeStyle.chip}
                                    mode={'flat'}
                                    textStyle={settings.activeStyle.chipText}
                                >
                                    {CHIP_DATA[tag].name}
                                </Chip>
                            )
                        }
                    </View>
                </Card.Content>
            </Card>
            <Card
                key={item.id}
                style={settings.activeStyle.card}
            >
                <Card.Content>
                    <View>
                        <Text style={settings.activeStyle.overTextInputText}>
                            Full Name
                        </Text>
                        <TextInput 
                            style={settings.activeStyle.registerInput}
                            value={name}
                            onChangeText={setName}>
                        </TextInput>
                        <Text style={settings.activeStyle.underTextInputText}>
                            Name is required
                        </Text>
                    </View>
                    <View>
                        <Text style={settings.activeStyle.overTextInputText}>
                            Email
                        </Text>
                        <TextInput 
                            style={settings.activeStyle.registerInput}
                            value={email}
                            onChangeText={setEmail}>
                        </TextInput>
                        <Text style={settings.activeStyle.underTextInputText}>
                            Enter a valid email
                        </Text>
                    </View>
                    <View>
                        <Text style={settings.activeStyle.overTextInputText}>
                            Phone
                        </Text>
                        <TextInput 
                            style={settings.activeStyle.registerInput}
                            value={phone}
                            onChangeText={setPhone}>
                        </TextInput>
                        <Text style={settings.activeStyle.underTextInputText}>
                            (optional)
                        </Text>
                    </View>
                    <Button mode='contained' style={settings.activeStyle.button}  onPress={() => RunSubmit(item)}>
                        <Text style={settings.activeStyle.buttonText}>
                            Submit Registration
                        </Text>
                    </Button>
                </Card.Content>
            </Card>
            
        </View>
        </ScrollView>
    );
}