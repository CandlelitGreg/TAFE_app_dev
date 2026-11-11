import { useState, useCallback } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text, Card, Chip, Button, IconButton } from 'react-native-paper'
import { MOCKITEMS, CHIP_DATA } from '../App';



export default function RegisterScreen({route, navigation}) {
    const { item } = route.params;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');


    return (
        <View style={styles.container}>
            <Card
                key={item.id}
                style={styles.card}
            >
                <Card.Title title={item.title} titleStyle={{fontSize: 20, color: '#000000', fontWeight: 'bold'}} />
                <Card.Content>
                    <Text style={styles.innerCard} variant='bodyMedium'>
                        {item.description}
                    </Text>
                    <Text style={styles.innerCard} variant='bodyMedium'>
                        {'Spots remaining:     ' + item.spotsRemaining}
                    </Text>
                    <Text style={styles.cardDetails} variant='bodyMedium'>
                        {item.location}
                    </Text>
                    <Text style={styles.cardDetails} variant='bodyMedium'>
                        {item.time + ' || '+ item.date}
                    </Text>
                    <View style={styles.chipView}>
                        {Object.values(item.tags).map(tag => 
                                <Chip 
                                    key={tag}
                                    style={styles.chip}
                                    mode={'flat'}
                                    textStyle={styles.chipText}
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
                style={styles.card}
            >
                <Card.Content>
                    <View>
                        <Text style={styles.overTextInputText}>
                            Full Name
                        </Text>
                        <TextInput 
                            style={styles.eventsSearch}
                            value={name}
                            onChangeText={setName}>
                        </TextInput>
                        <Text style={styles.underTextInputText}>
                            Name is required
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.overTextInputText}>
                            Email
                        </Text>
                        <TextInput 
                            style={styles.eventsSearch}
                            value={email}
                            onChangeText={setEmail}>
                        </TextInput>
                        <Text style={styles.underTextInputText}>
                            Enter a valid email
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.overTextInputText}>
                            Phone
                        </Text>
                        <TextInput 
                            style={styles.eventsSearch}
                            value={phone}
                            onChangeText={setPhone}>
                        </TextInput>
                        <Text style={styles.underTextInputText}>
                            (optional)
                        </Text>
                    </View>
                    <Button mode='contained' style={styles.button}  onPress={() => setIsDisplaying(!isDisplaying)}>
                        <Text style={{color: '#fff', fontWeight: 'bold'}}>
                            Submit Registration
                        </Text>
                    </Button>
                </Card.Content>
            </Card>
            
        </View>
    );
}

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
        marginTop: 15,
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
        paddingTop: 5,
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
        backgroundColor: '#3CA6E5'
    },
    chipText: {
        color: '#ffffff',
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
        padding: 15,
        paddingTop: 22
    },
    headerView: {
        display: 'flex',
        flexDirection: 'horizontal'
    },
    underTextInputText: {
        color: '#424754',
        fontSize: 10,
        marginLeft: 15,
        marginTop: 5
    },
    overTextInputText: {
        color: '#7e8390',
        position: 'absolute',
        top: 5,
        left: -6,
        fontSize: 10,
        marginLeft: 23,
        marginTop: 8
    },
    cardDetails: {
        textAlign: 'right', 
        padding: 5, 
        fontSize: 15, 
        color: '#000000', 
        fontWeight: 'bold'
    }
})