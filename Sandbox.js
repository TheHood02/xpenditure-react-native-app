import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Sandbox = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.boxOne}>one</Text>
            <Text style={styles.boxTwo}>two</Text>
            <Text style={styles.boxThree}>three</Text>
            <Text style={styles.boxFour}>four</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: '#ddd',
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end'
    },
    boxOne: {
        flex: 1,
        backgroundColor: 'violet',
        padding: 10
    },
    boxTwo: {
        flex: 1,
        backgroundColor: 'gold',
        padding: 20
    },
    boxThree: {
        flex: 1,
        backgroundColor: 'coral',
        padding: 30
    },
    boxFour: {
        flex: 1,
        backgroundColor: 'skyblue',
        padding: 40
    }
})

export default Sandbox;