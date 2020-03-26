import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    incident: {
        padding: 24,
        paddingBottom: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16,
        marginTop: 48
    },

    incidentProperty: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#41414d'
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380',
        lineHeight: 24
    },

    card: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff'
    },

    title: {
        fontSize: 20,
        color: '#13131a',
        fontWeight: 'bold'
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380',
        marginTop: 16
    },

    buttonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16
    },

    cardButton: {
        backgroundColor: '#E02041',
        borderRadius: 8,
        height: 50,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    cardButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15
    }
});