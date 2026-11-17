import { useState, useCallback } from 'react';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Text, Card, Chip, Button, IconButton } from 'react-native-paper'
import { fetchEvents, CHIP_DATA } from '../App';
import { useSettings } from '../contexts/SettingsContext';


export default function RegisterScreen({route, navigation}) {
    const { settings, updateSetting } = useSettings();
    const { MOCKITEMS, loading } = fetchEvents();

    const { item } = route.params;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');


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
                    <Button mode='contained' style={settings.activeStyle.button}  onPress={() => setIsDisplaying(!isDisplaying)}>
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