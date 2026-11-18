//IMPORTS
import { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { Text, Button, Card, Chip, IconButton, ActivityIndicator, Provider as PaperProvider } from 'react-native-paper';
import { DatePickerModal, registerTranslation, en } from 'react-native-paper-dates';
import { fetchEvents, CHIP_DATA, today } from '../App';
import { useSettings } from '../contexts/SettingsContext';
import { useAudioPlayer } from 'expo-audio';


registerTranslation('en', en);



//FUNCTION Export OR Compenent to use <Tag/>
export default function EventsScreen({ route, navigation }){
    const { settings, updateSetting } = useSettings();
    const { MOCKITEMS, loading } = fetchEvents();
    
    const clickSource = require('../assets/PotentialClickEffect.mp3');
    const sendSource = require('../assets/sending-effect.mp3');
    const bloopSource = require('../assets/bloop-effect.mp3');
    const clickPlayer = useAudioPlayer(clickSource);
    const sendPlayer = useAudioPlayer(sendSource);
    const bloopPlayer = useAudioPlayer(bloopSource);

    const { search } = route.params || {};
    const { searchedChips } = route.params || {};
    const { searchedWithDate } = route.params || {};
    const { searchedDate } = route.params || {};
    const [initialFetchComplete, setInitialFetchComplete] = useState(false);
    const [chipIsOpen, setChipIsOpen] = useState(false);
    const [searchInput, setSearchInput] = useState(search || '');
    const [selectedChips, setSelectedChips] = useState(searchedChips || []);
    const [searchDisplay, setSearchDisplay] = useState('');
    const [date, setDate] = useState(searchedDate || new Date());
    const [datePicked, setDatePicked] = useState(searchedWithDate || false);
    const [searchDate, setSearchDate] = useState(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`);
    const [searchedEvents, setSearchedEvents] = useState(!datePicked ? MOCKITEMS.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()) && (!Array.isArray(selectedChips) || (selectedChips.every(chip => item.tags.includes(chip))))) : MOCKITEMS.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()) && (!Array.isArray(selectedChips) || selectedChips.every(chip => item.tags.includes(chip))) && item.date === searchDate) || MOCKITEMS);
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

    useEffect(() => {
        if (initialFetchComplete === false && loading === false) {
            setSearchedEvents(() =>
                !datePicked ? MOCKITEMS.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()) && (!Array.isArray(selectedChips) || selectedChips.every(chip => item.tags.includes(chip)))) : MOCKITEMS.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()) && (!Array.isArray(selectedChips) || selectedChips.every(chip => item.tags.includes(chip))) && item.date === searchDate)
            );
            setSearchDisplay(() => searchInput);
            setInitialFetchComplete();
        }
    })

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

    const updateSearchResults = () => {
        setSearchedEvents(() =>
            !datePicked ? MOCKITEMS.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()) && (!Array.isArray(selectedChips) || selectedChips.every(chip => item.tags.includes(chip)))) : MOCKITEMS.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()) && (!Array.isArray(selectedChips) || selectedChips.every(chip => item.tags.includes(chip))) && item.date === searchDate)
        );
        setSearchDisplay(() => searchInput);
        console.log(searchedEvents.length === MOCKITEMS.length);
    };


    const handleChipPress = (id) => {
        playSoundEffect(clickPlayer);
        setSelectedChips((prevSelected) => {
            if (prevSelected?.includes(id)) {
                if (id === '0') {
                    setDatePicked(false);
                }
                return prevSelected?.filter((item) => item !== id);
            } else {
                if (id === '0') {
                    setDatePicked(true);
                    setSearchDate(generateDate({date: new Date()}));
                }
                if (prevSelected?.length > 0)
                {
                    return [...prevSelected, id];
                }
                return [id];
            }
        });   
    };

    const resetFilters = () => {
        setDatePicked(false);
        setSelectedChips([]);
        setSearchDisplay('');
        setSearchedEvents(MOCKITEMS);
    }

    return (
        <View style={settings.activeStyle.container}>
            {loading && <ActivityIndicator animating={true} size={300} />}
            {!loading && <View>
                <View style={settings.activeStyle.chipView}>
                    {/* Fix textbox text colour */}
                    <TextInput 
                        style={settings.activeStyle.eventsSearch}
                        value={searchInput}
                        onChangeText={setSearchInput}
                        onSubmitEditing={() => {updateSearchResults(), playSoundEffect(sendPlayer)}}
                        >
                    </TextInput>
                    <IconButton
                        icon='magnify'
                        size={30}
                        onPress={() => {updateSearchResults(), playSoundEffect(sendPlayer)}}
                        style={{position: 'absolute', right: '40px'}}
                    />
                    <IconButton onPress={() => {setChipIsOpen(!chipIsOpen), playSoundEffect(bloopPlayer)}} icon={!chipIsOpen ? 'chevron-down' : 'chevron-up'} style={{marginHorizontal: 0}}/>
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
                        <SafeAreaView style={settings.activeStyle.container}>
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
                </View>}
            
                {!loading &&
                <ScrollView>
                    <Text variant='headlineSmall' style={settings.activeStyle.searchFiltered} >
                        Showing: {searchDisplay === '' ? 'All events' : `Results matching "${searchDisplay}"`} - {searchedEvents.length} result{searchedEvents.length == 1 ? '' : 's'}:
                    </Text>
                    <ScrollView>
                    { (searchedEvents.length) < 1 && (
                            <Button style={settings.activeStyle.button}
                                mode="contained" 
                                onPress={() => {resetFilters(), playSoundEffect(bloopPlayer)}}>
                                Reset filters
                            </Button>
                        )
                    }
                    
                    {!loading &&
                        searchedEvents.map( item => (
                            <Card
                                key={item.id}
                                style={settings.activeStyle.card}
                                onPress={() => {navigation.navigate('Event Details', { item: item }), playSoundEffect(sendPlayer)}}
                            >
                                <Card.Content style={{marginTop: 0}}>
                                    <Text style={settings.activeStyle.cardTitle}>
                                        {item.title}
                                    </Text>
                                    <View style={settings.activeStyle.cardHeaders}>
                                        <Text style={settings.activeStyle.cardHeading}>
                                            {item.location}
                                        </Text>
                                        <Text style={settings.activeStyle.cardHeading}>
                                            {item.startTime}-{item.endTime}
                                        </Text>
                                    </View>
                                    <Text style={settings.activeStyle.innerCard} variant='bodyMedium'>
                                        {'Spots remaining:     ' + item.spotsRemaining}
                                    </Text>
                                    <View style={settings.activeStyle.chipView}>
                                        {Object.values(item.tags).map(tag => {
                                            const isSelected = selectedChips?.includes(tag);
                        
                                            return (
                                                <Chip 
                                                    key={tag}
                                                    selected={isSelected}
                                                    style={[ isSelected ? settings.activeStyle.chipSelected : settings.activeStyle.chipUnselected, ]}
                                                    showSelectedCheck={false}
                                                    onPress={() => handleChipPress(tag)}
                                                    mode={isSelected ? 'flat' : 'outlined'}
                                                    textStyle={[ isSelected ? settings.activeStyle.chipSelectedText : settings.activeStyle.chipUnselectedText, ]}
                                                >
                                                    {CHIP_DATA[tag].name}
                                                </Chip>
                                            )
                                        })}
                                    </View>
                                </Card.Content>
                            </Card>
                        ))
                    }
                    </ScrollView>
                </ScrollView>}
        </View>
    );
}
