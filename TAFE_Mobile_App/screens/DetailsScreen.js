import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper'

export default function DetailsScreen() {
    return (
        <View style={styles.container}>
            <Text variant='headlineMedium' style={styles.title}>
                Placeholder for details
            </Text>
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
    }
})