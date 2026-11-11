//IMPORTS
import { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Text, Button, Card, Chip, IconButton } from 'react-native-paper';

const MOCKITEMS = [
    {
        id: '1',
        title: 'Random book',
        description: 'random book desc',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['4']
    },
    {
        id: '2',
        title: 'Different book',
        description: 'this book is totally not random',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['5']
    },
    {
        id: '3',
        title: 'Kindle',
        description: 'gave up on books pretty quickly',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['2']
    },
    {
        id: '4',
        title: 'Random book',
        description: 'random book desc',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['3']
    },
    {
        id: '5',
        title: 'Different book',
        description: 'this book is totally not random',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['2']
    },
    {
        id: '6',
        title: 'Kindle',
        description: 'gave up on books pretty quickly',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['1', '4', '5']
    },
    {
        id: '7',
        title: 'Different book',
        description: 'this book is totally not random',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['2']
    },
    {
        id: '8',
        title: 'Kindle',
        description: 'gave up on books pretty quickly',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: ['4', '6']
    }
]

const CHIP_DATA = [
    { id: '0', name: 'Today' },
    { id: '1', name: 'Athletics' },
    { id: '2', name: 'Fitness' },
    { id: '3', name: 'Music' },
    { id: '4', name: 'Social' },
    { id: '5', name: 'Outdoors' },
    { id: '6', name: 'Family' }
]




//FUNCTION Export OR Compenent to use <Tag/>
export default function EventsScreen({ route, navigation }){
    const { search } = route.params || {};
    const { searchedChips } = route.params || {};
    const [chipIsOpen, setChipIsOpen] = useState(false);
    const [searchInput, setSearchInput] = useState(search || '');
    const [selectedChips, setSelectedChips] = useState([]);
    const [searchDisplay, setSearchDisplay] = useState('');
    const [searchedEvents, setSearchedEvents] = useState(MOCKITEMS.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase())) || MOCKITEMS)

    const updateSearchResults = () => {
        setSearchedEvents(() =>
            MOCKITEMS.filter((item) => item.title.toLowerCase().includes(searchInput.toLowerCase()))
        );
        setSearchDisplay(() => searchInput);
    };

    const handleChipPress = (id) => {
        setSelectedChips((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((item) => item !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.chipView}>
                {/* Fix textbox text colour */}
                <TextInput 
                    style={styles.eventsSearch}
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
                <View style={styles.chipView}>
                    {CHIP_DATA.map( (tag) => {
                        const isSelected = selectedChips.includes(tag.id);
                    
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
            )}
            <ScrollView>
                <Text variant='headlineSmall' style={{fontWeight: 'bold', color: '#000', fontSize: 16}} >
                    Showing: {searchDisplay === '' ? 'All events' : searchDisplay} - {searchedEvents.length} result{searchedEvents.length == 1 ? '' : 's'}:
                </Text>
                <ScrollView>
                {
                    searchedEvents.map( item => (
                        <Card
                            key={item.id}
                            style={styles.card}
                            onPress={() => navigation.navigate('Event Details', { item: item })}
                        >
                            <Card.Title title={item.title + ' || ' + item.time + ' || '+ item.location} titleStyle={{fontSize: 14, color: '#000000'}} />
                            <Card.Content style={{marginTop: 0}}>
                                <Text style={styles.innerCard} variant='bodyMedium'>
                                    {'Spots remaining:     ' + item.spotsRemaining}
                                </Text>
                                <View style={styles.chipView}>
                                    {Object.values(item.tags).map(tag => {
                                        const isSelected = selectedChips.includes(tag);
                    
                                        return (
                                        <Chip 
                                            key={tag}
                                            selected={isSelected}
                                            style={[ isSelected ? styles.chipSelected : styles.chipUnselected, ]}
                                            showSelectedCheck={false}
                                            onPress={() => handleChipPress(tag)}
                                            mode={isSelected ? 'flat' : 'outlined'}
                                            textStyle={[ isSelected ? styles.chipSelectedText : styles.chipUnselectedText, ]}
                                        >
                                            {CHIP_DATA[tag].name}
                                        </Chip>
                                    )})}
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

    }
})