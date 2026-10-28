import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper'

export default function DetailsScreen({route, navigation}) {
    const { item } = route.params;
    return (
        <View style={styles.container}>
            <Text variant='headlineMedium' style={styles.title}>
                {item.title}
            </Text>
            <Card style={styles.card}>
                <Card.Title title={item.title}/>
                <Card.Content>
                    <Text style={styles.innerCard} variant='bodyMedium'>
                        {item.description}
                    </Text>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#c5f4ff'
    },
    title: {
        marginBottom: 12,
        fontWeight: 'bold',
        color: '#07268a'
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 24,
        color: '#e40d0d'
    },
    button: {
        marginTop: 8
    },
    card: {
        marginBottom: 10,
        elevation: 3,
        backgroundColor: '#d5a27e'
    },
    innerCard: {
        marginLeft: 10,
        color: '#000'
    }
})