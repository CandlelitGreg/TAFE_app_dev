//IMPORTS
import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, Chip, TextInput, IconButton } from 'react-native-paper';

const MOCKITEMS = [
    {
        id: '1',
        title: 'Random book',
        description: 'random book desc',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: [{
            name: 'Athletics',
            related: false
        },
        {
            name: 'Today',
            related: true
        },
        {
            name: 'Fitness',
            related: false
        },
        {
            name: 'Music',
            related: false
        },
        {
            name: 'Social',
            related: true
        },
        {
            name: 'Outdoors',
            related: false
        },
        {
            name: 'Family',
            related: false
        }]
    },
    {
        id: '2',
        title: 'Different book',
        description: 'this book is totally not random',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: [{
            name: 'Athletics',
            related: false
        },
        {
            name: 'Today',
            related: true
        },
        {
            name: 'Fitness',
            related: false
        },
        {
            name: 'Music',
            related: false
        },
        {
            name: 'Social',
            related: false
        },
        {
            name: 'Outdoors',
            related: true
        },
        {
            name: 'Family',
            related: false
        }]
    },
    {
        id: '3',
        title: 'Kindle',
        description: 'gave up on books pretty quickly',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: [{
            name: 'Athletics',
            related: false
        },
        {
            name: 'Today',
            related: true
        },
        {
            name: 'Fitness',
            related: true
        },
        {
            name: 'Music',
            related: false
        },
        {
            name: 'Social',
            related: false
        },
        {
            name: 'Outdoors',
            related: false
        },
        {
            name: 'Family',
            related: false
        }]
    },
    {
        id: '1',
        title: 'Random book',
        description: 'random book desc',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: [{
            name: 'Athletics',
            related: false
        },
        {
            name: 'Today',
            related: true
        },
        {
            name: 'Fitness',
            related: false
        },
        {
            name: 'Music',
            related: true
        },
        {
            name: 'Social',
            related: false
        },
        {
            name: 'Outdoors',
            related: false
        },
        {
            name: 'Family',
            related: true
        }]
    },
    {
        id: '2',
        title: 'Different book',
        description: 'this book is totally not random',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: [{
            name: 'Athletics',
            related: false
        },
        {
            name: 'Today',
            related: true
        },
        {
            name: 'Fitness',
            related: true
        },
        {
            name: 'Music',
            related: false
        },
        {
            name: 'Social',
            related: false
        },
        {
            name: 'Outdoors',
            related: false
        },
        {
            name: 'Family',
            related: false
        }]
    },
    {
        id: '3',
        title: 'Kindle',
        description: 'gave up on books pretty quickly',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: [{
            name: 'Athletics',
            related: true
        },
        {
            name: 'Today',
            related: true
        },
        {
            name: 'Fitness',
            related: false
        },
        {
            name: 'Music',
            related: false
        },
        {
            name: 'Social',
            related: true
        },
        {
            name: 'Outdoors',
            related: true
        },
        {
            name: 'Family',
            related: false
        }]
    },
    {
        id: '2',
        title: 'Different book',
        description: 'this book is totally not random',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: [{
            name: 'Athletics',
            related: false
        },
        {
            name: 'Today',
            related: true
        },
        {
            name: 'Fitness',
            related: true
        },
        {
            name: 'Music',
            related: false
        },
        {
            name: 'Social',
            related: false
        },
        {
            name: 'Outdoors',
            related: false
        },
        {
            name: 'Family',
            related: false
        }]
    },
    {
        id: '3',
        title: 'Kindle',
        description: 'gave up on books pretty quickly',
        location: 'Community Hall',
        date: '12/12/2012',
        time: '08:30-09:15',
        spotsRemaining: '5',
        tags: [{
            name: 'Athletics',
            related: false
        },
        {
            name: 'Today',
            related: true
        },
        {
            name: 'Fitness',
            related: false
        },
        {
            name: 'Music',
            related: false
        },
        {
            name: 'Social',
            related: true
        },
        {
            name: 'Outdoors',
            related: false
        },
        {
            name: 'Family',
            related: true
        }]
    }
]


//FUNCTION Export OR Compenent to use <Tag/>
export default function HomeScreen({ navigation }){
    const [chipIsOpen, setChipIsOpen] = useState(false);
    const [isDisplaying, setIsDisplaying] = useState(false);

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
            {!isDisplaying &&(
                <Card style={styles.card}>
                    <Card.Title title='Welcome' titleStyle={{fontWeight: 'bold', fontSize: 26, color: '#0f0e36'}}/>
                    <Card.Content>
                        <Text style={{color: '#0f0e36'}}>
                            Find and register for Community Events
                        </Text>
                        <Button mode='contained' style={styles.button} onPress={() => setIsDisplaying(!isDisplaying)}>
                            View Today's Events
                        </Button>
                    </Card.Content>
                </Card>
            )}
                <View style={styles.chipView}>
                    <TextInput style={styles.eventsSearch}>

                    </TextInput>
                    <IconButton onPress={() => setChipIsOpen(!chipIsOpen)} icon={!chipIsOpen ? 'chevron-down' : 'chevron-up'}/>
                </View>
                
                {chipIsOpen && (
                    <View style={styles.chipView}>
                        <Chip style={styles.chip}>
                            Athletics
                        </Chip>
                        <Chip style={styles.chip}>
                            Today
                        </Chip>
                        <Chip style={styles.chip}>
                            Fitness
                        </Chip>
                        <Chip style={styles.chip}>
                            Music
                        </Chip>
                        <Chip style={styles.chip}>
                            Outdoors
                        </Chip>
                        <Chip style={styles.chip}>
                            Family
                        </Chip>
                    </View> 
                )}
                {isDisplaying && (
                    <ScrollView>
                        <Text variant='headlineSmall' style={{fontWeight: 'bold', color: '#000', fontSize: 16}} >
                            Showing: Today - {MOCKITEMS.length} result{MOCKITEMS.length == 1 ? '' : 's'}:
                        </Text>
                        <ScrollView>
                        {
                            MOCKITEMS.map( item => (
                                <Card
                                    key={item.id}
                                    style={styles.card}
                                    onPress={() => navigation.navigate('Details', { item: item })}
                                >
                                    <Card.Title title={item.title + ' || ' + item.time + ' || '+ item.location} titleStyle={{margin: 0, padding: 0, color: '#000000'}} />
                                    <Card.Content style={{marginTop: 0}}>
                                        <Text style={styles.innerCard} variant='bodyMedium'>
                                            {'Spots remaining:     ' + item.spotsRemaining}
                                        </Text>
                                        <View style={styles.chipView}>
                                            {Object.values(item.tags).filter((tag) => tag.related).map(tag => (
                                                <Chip style={styles.chip}>
                                                    {tag.name}
                                                </Chip>
                                            ))}
                                        </View>
                                    </Card.Content>
                                </Card>
                            ))
                        }
                        </ScrollView>
                    </ScrollView>
                )}
                
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
        backgroundColor: '#1673c0'
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
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 2
    },
    card: {
        marginBottom: 10,
        elevation: 3,
        backgroundColor: '#ffffff',
        borderColor: '#cfcfcf',
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
        backgroundColor: '#338ad1'
    },
    eventsSearch: {
        fontSize: 'small',
        height: 5,
        marginTop: 5,
        backgroundColor: '#fff',
        color: '#000',
        borderColor: '#cfcfcf',
        borderWidth: 1.5
    },
    headerView: {
        display: 'flex',
        flexDirection: 'horizontal'

    }
})