//IMPORTS
import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, Chip, TextInput, IconButton } from 'react-native-paper';

const MOCKITEMS = [
    {
        id: '1',
        title: 'Random book',
        description: 'random book desc'
    },
    {
        id: '2',
        title: 'Different book',
        description: 'this book is totally not random'
    },
    {
        id: '3',
        title: 'Kindle',
        description: 'gave up on books pretty quickly'
    },
    {
        id: '1',
        title: 'Random book',
        description: 'random book desc'
    },
    {
        id: '2',
        title: 'Different book',
        description: 'this book is totally not random'
    },
    {
        id: '3',
        title: 'Kindle',
        description: 'gave up on books pretty quickly'
    },
    {
        id: '2',
        title: 'Different book',
        description: 'this book is totally not random'
    },
    {
        id: '3',
        title: 'Kindle',
        description: 'gave up on books pretty quickly'
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
                <Card style={styles.headerCard}>
                    <Card.Title title='Welcome'/>
                    <Card.Content>
                        <Text>
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
                    <Button onPress={() => setChipIsOpen(!chipIsOpen)}>
                        {chipIsOpen ? 'Close Filters' : 'Open Filters'}
                    </Button>
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
                        <Text variant='headlineSmall' style={styles.title} >
                            Showing: Today - {MOCKITEMS.length} result:
                        </Text>
                        <ScrollView>
                        {
                            MOCKITEMS.map( item => (
                                <Card
                                    key={item.id}
                                    style={styles.card}
                                    onPress={() => navigation.navigate('Details', { item: item })}
                                >
                                    <Card.Title title={item.title}/>
                                    <Card.Content>
                                        <Text style={styles.innerCard} variant='bodyMedium'>
                                            {item.description}
                                        </Text>
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
        backgroundColor: '#c5f4ff'
    },
    title: {
        marginBottom: 12,
        marginRight: 20,
        fontWeight: 'bold',
        color: '#07268a',
        fontSize: 27
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 24,
        color: '#e40d0d'
    },
    button: {
        marginTop: 8
    },
    headerCard: {

    },
    card: {
        marginBottom: 10,
        elevation: 3,
        backgroundColor: '#d5a27e'
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
        marginTop: 3
    },
    eventsSearch: {
        fontSize: 'small',
        height: 5,
        marginTop: 5
    },
    headerView: {
        display: 'flex',
        flexDirection: 'horizontal'

    }
})