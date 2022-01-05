import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import MyAppText from '../../../CustomComponents/MyAppText';

const Card = (props) => {

    return(
        <View style={styles.card}>
            <MyAppText>{props.title}</MyAppText>
            <MyAppText>Rs {props.amount}</MyAppText>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        width: '45%',
        height: 100,
        marginBottom: 10,
        padding: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,

        elevation: 10,
    }
})

export default Card;