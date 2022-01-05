import * as React from 'react';
import { View } from 'react-native';
import MyAppText from '../../CustomComponents/MyAppText';

const ItemCard = (props) => {
    return(
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: '#858585',
            borderBottomWidth: 2,
            padding: 2
        }}>
            <View>
                <MyAppText style={{fontSize:20}}>{props.name}</MyAppText>
                <MyAppText style={{fontSize:12, color:'#BCBCBC'}}>{props.dateTime}</MyAppText>
            </View>
            <View>
                <MyAppText style={{fontSize:20, color:'#DD5050'}}>Rs {props.amount}</MyAppText>
                <MyAppText style={{fontSize:12, color:'#BCBCBC'}}>{props.from}</MyAppText>
            </View>
        </View>
    )
}

export default ItemCard;