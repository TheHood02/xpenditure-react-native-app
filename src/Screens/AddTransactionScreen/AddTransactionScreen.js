import * as React from 'react';
import { View } from 'react-native';
import MyAppText from '../../CustomComponents/MyAppText'
import AddTransactionForm from './AddTransactionForm';
import  HomeScreen from '../HomeScreen/HomeScreen'

const AddTransactionScreen = (navigation) => {
    return(
        <View style={{backgroundColor:'#031442', height:'100%'}}>
            {/* TODO: Make the title semi-bold */}
            <MyAppText style={{fontSize:20, color:'#Ad00FF'}}>Add a Transaction</MyAppText>
            <AddTransactionForm navigation={navigation} />
        </View>
    )
}

export default AddTransactionScreen;