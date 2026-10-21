//IMPORTS
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

import DetailsScreen from './DetailsScreen';

//FUNCTION Export OR Compenent to use <Tag/>
export default function HomeScreen({ navigation }){
    return (
        <View style={styles.container}>
            <Text variant='headlineMedium' style={styles.title}>
                Welcome Home
            </Text>
            <Text variant='bodyLarge' style={styles.subtitle}>
                Placeholder Homescreen content
            </Text>
            <Button
                mode='contained'
                style={styles.button}
                >
                    Go to details
            </Button>
        </View>
    );
}

//STYLES or Other anchor/hooks
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
    }
})