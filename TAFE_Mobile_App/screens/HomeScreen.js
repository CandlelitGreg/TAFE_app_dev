//IMPORTS
import { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, TextInput, SafeAreaView } from 'react-native';
import { Text, Button, Card, Chip, IconButton } from 'react-native-paper';
import { DatePickerModal, registerTranslation, en } from 'react-native-paper-dates';
import { MOCKITEMS, CHIP_DATA } from '../App';



//FUNCTION Export OR Compenent to use <Tag/>
export default function HomeScreen({ navigation }){
    const [chipIsOpen, setChipIsOpen] = useState(false);
    const today = `${String(new Date().getDate()).padStart(2, '0')}/${String(new Date().getMonth() + 1).padStart(2, '0')}/${new Date().getFullYear()}`;
    const [search, setSearch] = useState('');
    const [selectedChips, setSelectedChips] = useState([]);
    const [date, setDate] = useState(new Date());
    const [datePicked, setDatePicked] = useState(false);
    const [searchDate, setSearchDate] = useState('');
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

    const handleChipPress = (id) => {
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
        <View style={styles.container}>
            <Text variant='headlineMedium' style={styles.title} >
                Elevate Horizon Connect
            </Text>
            <IconButton
                icon='cog'
                size={24}
                onPress={() => navigation.navigate('Settings')}
                style={{position: 'absolute', top: '18px', right: '10px'}}
            />
            <Card style={styles.card}>
                <Card.Title title='Welcome' titleStyle={{fontWeight: 'bold', fontSize: 26, color: '#424754'}}/>
                <Card.Content>
                    <Text style={{color: '#424754'}}>
                        Find and register for Community Events
                    </Text>
                    <Button mode='contained' style={styles.button} onPress={() => navigation.navigate('Events', { search: '', searchedChips: ['0']})}>
                        <Text style={{color: '#424754', fontWeight: 'bold'}}>
                            View Today's Events
                        </Text>
                    </Button>
                </Card.Content>
            </Card>
            <View style={styles.chipView}>
                <TextInput 
                    style={styles.eventsSearch}
                    value={search}
                    onChangeText={setSearch}>
                </TextInput>
                <IconButton
                    icon='magnify'
                    size={30}
                    onPress={() => navigation.navigate('Events', { search: search, searchedChips: selectedChips, searchedWithDate: datePicked, searchedDate: date })}
                    style={{position: 'absolute', right: '40px'}}
                />
                <IconButton onPress={() => setChipIsOpen(!chipIsOpen)} icon={!chipIsOpen ? 'chevron-down' : 'chevron-up'} style={{marginHorizontal: 0}}/>
            </View>
                
            {chipIsOpen && (
                <View>
                    <View style={styles.chipView}>
                        {CHIP_DATA.map( (tag) => {
                            const isSelected = selectedChips?.includes(tag.id);
                        
                            return (
                                <Chip 
                                    key={tag.id}
                                    selected={isSelected}
                                    style={[ isSelected ? styles.chipSelected : styles.chipUnselected, ]}
                                    showSelectedCheck={false}
                                    onPress={() => handleChipPress(tag.id)}
                                    mode={isSelected ? 'flat' : 'outlined'}
                                    textStyle={[ isSelected ? styles.chipSelectedText : styles.chipUnselectedText, ]}
                                >
                                        {tag.name}
                                </Chip>
                            );
                        })}

                    </View> 
                    <SafeAreaView style={styles.chipView}>
                        <View style={styles.content}>
                            <Button style={styles.button}
                                mode="contained" 
                                onPress={() => setDateVisible(true)}
                                icon="calendar"
                            >
                                Pick Date
                            </Button>

                            <Text style={styles.timeText}>
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