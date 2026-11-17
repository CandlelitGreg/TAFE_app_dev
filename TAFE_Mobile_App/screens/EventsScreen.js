//IMPORTS
import { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { Text, Button, Card, Chip, IconButton, Provider as PaperProvider } from 'react-native-paper';
import { DatePickerModal, registerTranslation, en } from 'react-native-paper-dates';
import { MOCKITEMS, CHIP_DATA, today } from '../App';
import { useSettings } from '../contexts/SettingsContext';


registerTranslation('en', en);



//FUNCTION Export OR Compenent to use <Tag/>
export default function EventsScreen({ route, navigation }){
    const { settings, updateSetting } = useSettings();

    const { search } = route.params || {};
    const { searchedChips } = route.params || {};
    const { searchedWithDate } = route.params || {};
    const { searchedDate } = route.params || {};
    const [chipIsOpen, setChipIsOpen] = useState(false);
    const [searchInput, setSearchInput] = useState(search || '');
    const [selectedChips, setSelectedChips] = useState(searchedChips || []);
    const [searchDisplay, setSearchDisplay] = useState('');
    const [date, setDate] = useState(searchedDate || new Date());
    const [datePicked, setDatePicked] = useState(searchedWithDate || false);
    const [searchDate, setSearchDate] = useState(`${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`);
    const [searchedEvents, setSearchedEvents] = useState(!datePicked ? MOCKITEMS.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()) && (!Array.isArray(selectedChips) || (selectedChips.every(chip => item.tags.includes(chip))))) : MOCKITEMS.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()) && (!Array.isArray(selectedChips) || selectedChips.every(chip => item.tags.includes(chip))) && item.date === searchDate) || MOCKITEMS);
    const [dateVisible, setDateVisible] = useState(false);

    const dismissDate = useCallback(() => {
        setDateVisible(false);
        setDatePicked(false);
    }, []);

    const generateDate = useCallback((params) => {
        const day = String(params.date.getDate()).padStart(2, '0');
        const month = String(params.date.getMonth() + 1).padStart(2, '0');
        const year = params.date.getFullYear();
        return `${day}/${month}/${year}`;
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

    const updateSearchResults = () => {
        setSearchedEvents(() =>
            !datePicked ? MOCKITEMS.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()) && (!Array.isArray(selectedChips) || selectedChips.every(chip => item.tags.includes(chip)))) : MOCKITEMS.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()) && (!Array.isArray(selectedChips) || selectedChips.every(chip => item.tags.includes(chip))) && item.date === searchDate)
        );
        setSearchDisplay(() => searchInput);
    };

    const handleChipPress = (id) => {
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
            <View style={settings.activeStyle.chipView}>
                {/* Fix textbox text colour */}
                <TextInput 
                    style={settings.activeStyle.eventsSearch}
                    value={searchInput}
                    onChangeText={setSearchInput}
                    >
                </TextInput>
                <IconButton
                    icon='magnify'
                    size={30}
                    onPress={updateSearchResults}
                    style={{position: 'absolute', right: '40px'}}
                />
                <IconButton onPress={() => setChipIsOpen(!chipIsOpen)} icon={!chipIsOpen ? 'chevron-down' : 'chevron-up'} style={{marginHorizontal: 0}}/>
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
            <ScrollView>
                <Text variant='headlineSmall' style={settings.activeStyle.searchFiltered} >
                    Showing: {searchDisplay === '' ? 'All events' : `Results matching "${searchDisplay}"`} - {searchedEvents.length} result{searchedEvents.length == 1 ? '' : 's'}:
                </Text>
                <ScrollView>
                { (searchedEvents.length) < 1 && (
                            <Button style={settings.activeStyle.button}
                                mode="contained" 
                                onPress={() => resetFilters()}>
                                Reset filters
                            </Button>
                        )
                    }
                {
                    searchedEvents.map( item => (
                        <Card
                            key={item.id}
                            style={settings.activeStyle.card}
                            onPress={() => navigation.navigate('Event Details', { item: item })}
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
                                        {item.time}
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
            </ScrollView>
        
        </View>
    );
}

//STYLES or Other anchor/hooks
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
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

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
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
        borderColor: '#ffffff',
        borderWidth: 2
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
        backgroundColor: '#010c31',
        borderColor: '#DDAB5E',
        borderWidth: 1.5
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
    }
})