import * as React from 'react';
import { View } from 'react-native';
import MyAppText from '../../CustomComponents/MyAppText'
import AddTransactionForm from './AddTransactionForm';

const AddTransactionScreen = (navigation) => {
    return(
        <View style={{backgroundColor:'#031442', height:'100%'}}>
            {/* TODO: Make the title semi-bold */}
            <MyAppText style={{fontSize:20, color:'#Ad00FF'}}>Add a Transaction</MyAppText>
            <AddTransactionForm />
        </View>
    )
}

export default AddTransactionScreen;