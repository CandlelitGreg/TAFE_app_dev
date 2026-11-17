import { View, StyleSheet } from 'react-native';
import { Text, Card, Chip, Button, IconButton } from 'react-native-paper'
import { MOCKITEMS, CHIP_DATA } from '../App';
import { useSettings } from '../contexts/SettingsContext';



export default function DetailsScreen({route, navigation}) {
    const { settings, updateSetting } = useSettings();

    const { item } = route.params;
    return (
        <View style={settings.activeStyle.container}>
            <Card style={settings.activeStyle.card}>
                <Card.Title title={item.title} titleStyle={settings.activeStyle.searchFiltered}/>
                <Card.Content style={{marginTop: 0}}>
                    <Text style={settings.activeStyle.innerCard} variant='bodyMedium'>
                        {item.description}
                    </Text>
                </Card.Content>
            </Card>
            <Text style={settings.activeStyle.cardDetails} variant='bodyMedium'>
                {item.location}
            </Text>
            <View style={settings.activeStyle.chipView}>
                <Text style={settings.activeStyle.cardDetails} variant='bodyMedium'>
                    {item.date}
                </Text>
                <Text style={settings.activeStyle.cardDetails} variant='bodyMedium'>
                    {item.time}
                </Text>
            </View>
            <Text style={[settings.activeStyle.cardDetails, {textAlign: 'right'}]} variant='bodyMedium'>
                {'Spots remaining:     ' + item.spotsRemaining}
            </Text>
            <View style={settings.activeStyle.chipView}>
                {Object.values(item.tags).map(tag => (
                    <Chip style={settings.activeStyle.chip}>
                        <Text style={settings.activeStyle.chipText}>
                            {CHIP_DATA[tag].name}
                        </Text>
                    </Chip>
                ))}
            </View>
            <Button mode='contained' style={settings.activeStyle.button}  onPress={() => navigation.navigate('Register', {item: item})}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Register
                </Text>
            </Button>
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
        marginTop: 30,
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
        height: 5,
        marginTop: 5,
        backgroundColor: '#fff',
        color: '#000',
        borderColor: '#DDAB5E',
        borderWidth: 1.5
    },
    headerView: {
        display: 'flex',
        flexDirection: 'horizontal'

    },
    cardDetails: {
        padding: 5, 
        fontSize: 15, 
        color: '#000000', 
        fontWeight: 'bold'
    }
})