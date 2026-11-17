//IMPORTS
import { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { Text, Button, Card, Chip, IconButton } from 'react-native-paper';
import { DatePickerModal, registerTranslation, en } from 'react-native-paper-dates';
import { fetchEvents, CHIP_DATA, today } from '../App';
import { useSettings } from '../contexts/SettingsContext';
import { useAudioPlayer } from 'expo-audio';



//FUNCTION Export OR Compenent to use <Tag/>
export default function HomeScreen({ navigation }){
    const { settings, updateSetting } = useSettings();
    const { MOCKITEMS, loading } = fetchEvents();

    const clickSource = require('../assets/PotentialClickEffect.mp3');
    const sendSource = require('../assets/sending-effect.mp3');
    const bloopSource = require('../assets/bloop-effect.mp3');
    const clickPlayer = useAudioPlayer(clickSource);
    const sendPlayer = useAudioPlayer(sendSource);
    const bloopPlayer = useAudioPlayer(bloopSource);
    

    const [chipIsOpen, setChipIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedChips, setSelectedChips] = useState([]);
    const [date, setDate] = useState(new Date());
    const [datePicked, setDatePicked] = useState(false);
    const [searchDate, setSearchDate] = useState('');
    const [dateVisible, setDateVisible] = useState(false);

    const playSoundEffect = (player) => {
        if (settings.soundEffects){ 
            player.seekTo(0);
            player.play();
        }
    }

    const dismissDate = useCallback(() => {
        setDateVisible(false);
        setDatePicked(false);
    }, []);

    const generateDate = useCallback((params) => {
        const day = String(params.date.getDate()).padStart(2, '0');
        const month = String(params.date.getMonth() + 1).padStart(2, '0');
        const year = params.date.getFullYear();
        return `${year}-${month}-${day}`;
    }, []);

    const confirmDate = useCallback((params) => {
        const formattedDate = generateDate({date: params.date});
        setDatePicked(true);
        setDateVisible(false);
        setDate(params.date);
        setSearchDate(formattedDate);
        console.log(`date picked: ${params.date} -- date used: ${formattedDate}`);
        setSelectedChips((prevSelected) => {
            if (prevSelected?.includes('0') && formattedDate !== today) {
                return prevSelected.filter((item) => item !== '0');
            } else {
                if (formattedDate === today) {
                    setDatePicked(true);
                    return [...prevSelected, '0'];
                }
            }
        });   
    }, []);

    const handleChipPress = (id) => {
        playSoundEffect(clickPlayer);
        setSelectedChips((prevSelected) => {
            if (prevSelected?.includes(id)) {
                if (id === '0') {
                    setDatePicked(false);
                }
                return prevSelected.filter((item) => item !== id);
            } else {
                if (id === '0') {
                    setDatePicked(true);
                    setSearchDate(generateDate({date: new Date()}));
                }
                if (Array.isArray(prevSelected))
                {
                    return [...prevSelected, id];
                } else {
                    return [id];
                }
                
            }
        });   
    };

    return (
        <View style={settings.activeStyle.container}>
            <Text variant='headlineMedium' style={settings.activeStyle.title} >
                Elevate Horizon Connect
            </Text>
            <IconButton
                icon='cog'
                size={24}
                onPress={() => {navigation.navigate('Settings'), playSoundEffect(bloopPlayer)}}
                style={{position: 'absolute', top: '18px', right: '10px'}}
            />
            <Card style={settings.activeStyle.card}>
                <Card.Title title='Welcome' titleStyle={settings.activeStyle.smallCardTitle}/>
                <Card.Content>
                    <Text style={settings.activeStyle.cardText}>
                        Find and register for Community Events
                    </Text>
                    <Button mode='contained' style={settings.activeStyle.button} onPress={() => {navigation.navigate('Events', { search: '', searchedChips: ['0']}), playSoundEffect(sendPlayer)}}>
                        <Text style={settings.activeStyle.buttonText}>
                            View Today's Events
                        </Text>
                    </Button>
                </Card.Content>
            </Card>
            <View style={settings.activeStyle.chipView}>
                <TextInput 
                    style={settings.activeStyle.eventsSearch}
                    value={search}
                    onChangeText={setSearch}>
                </TextInput>
                <IconButton
                    icon='magnify'
                    size={30}
                    onPress={() => {navigation.navigate('Events', { search: search, searchedChips: selectedChips, searchedWithDate: datePicked, searchedDate: date }), playSoundEffect(sendPlayer);}}
                    style={{position: 'absolute', right: '40px'}}
                />
                <IconButton onPress={() => {setChipIsOpen(!chipIsOpen), playSoundEffect(bloopPlayer);}} icon={!chipIsOpen ? 'chevron-down' : 'chevron-up'} style={{marginHorizontal: 0}}/>
            </View>
                
            {chipIsOpen && (
                <View>
                    <View style={settings.activeStyle.chipView}>
                        {CHIP_DATA.map( (tag) => {
                            const isSelected = selectedChips?.includes(tag.id);
                        
                            return (
                                <Chip 
                                    key={tag.id}
                                    selected={isSelected}
                                    style={[ isSelected ? settings.activeStyle.chipSelected : settings.activeStyle.chipUnselected, ]}
                                    showSelectedCheck={false}
                                    onPress={() => handleChipPress(tag.id)}
                                    mode={isSelected ? 'flat' : 'outlined'}
                                    textStyle={[ isSelected ? settings.activeStyle.chipSelectedText : settings.activeStyle.chipUnselectedText, ]}
                                >
                                        {tag.name}
                                </Chip>
                            );
                        })}

                    </View> 
                    <SafeAreaView style={settings.activeStyle.chipView}>
                        <View style={settings.activeStyle.content}>
                            <Button style={settings.activeStyle.button}
                                mode="contained" 
                                onPress={() => setDateVisible(true)}
                                icon="calendar"
                            >
                                Pick Date
                            </Button>

                            <Text style={settings.activeStyle.timeText}>
                                {datePicked ? `Selected Date: ${searchDate}` : 'No date selected yet'}
                            </Text>

                            <DatePickerModal
                                locale="en"
                                mode="single"
                                visible={dateVisible}
                                onDismiss={dismissDate}
                                date={date}
                                onConfirm={confirmDate}
                                label="Select Date" // Modal top header label
                                saveLabel="Save" // Confirm button label
                            />
                        </View>
                    </SafeAreaView>
                </View>
            )}
                
        </View>
    );
}

//STYLES or Other anchor/hooks
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    }
})