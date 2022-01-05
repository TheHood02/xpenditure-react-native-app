import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Card from './Card';
import MyAppText from '../../../CustomComponents/MyAppText';


const TopCards = () => {

    const [cardNames, setCardNames] = useState([
        { name: 'budget', id: '1', amount: "0000"},
        { name: 'wallet', id: '2', amount: "0000"},
        { name: 'remaining from goal', id: '3', amount: "0000"},
        { name: 'spent', id: '4', amount: "0000"},
    ])

    // const state = cardNames;
    // const amount = '1'
    // console.log(state[0] = {...state[0], amount})
    // setCardNames(state) // uncommenting this will make it keeping on re-rendering
    // console.log(cardNames)

    return(
        <View style={{ padding:10 }}>
            <MyAppText>yash's</MyAppText>
            <View style={styles.container}>
                <Card title={cardNames[0].name} amount={cardNames[0].amount}/>
                <Card title={cardNames[1].name} amount={cardNames[1].amount}/>
                <Card title={cardNames[2].name} amount={cardNames[2].amount}/>
                <Card title={cardNames[3].name} amount={cardNames[3].amount}/>
            </View>
            

            {/* <FlatList 
                // numColumns={2}
                data={cardNames}
                style={styles.container}
                renderItem={({ item }) => (
                    <Card title={item.name} amount={item.amount}/>
                )}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: '27%',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button: {
        width: 75,
    }
})

export default TopCards;