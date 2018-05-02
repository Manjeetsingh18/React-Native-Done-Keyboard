import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    barWrapper: {
        borderTopWidth: 1,
        backgroundColor: '#F6F8F9',
        borderColor: '#E5E5E5',
        position: 'absolute'
    },
    bar: {
        height: 40,
        alignItems: 'flex-end'
    },
    button: {
        flex: 1,
        justifyContent: 'center'
    },
    done: {
        fontSize: 21,
        color: '#218BFE',
        fontWeight: '500',
        margin: 10
    }
});