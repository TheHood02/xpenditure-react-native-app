import * as React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MyAppText from '../../CustomComponents/MyAppText';

const AddTransactionForm = () => {
    return(
        <View style={styles.container}>
            <LinearGradient
                style={{height:'100%', alignItems:'center'}}
                colors={['#AD00FF', '#8F3528']} 
                start={{
                    x: 0,
                    y: 0
                }}
                end={{
                    x: 1,
                    y: 1
                }}
            >
                <View>
                    <MyAppText>Enter the Amount Spent:</MyAppText>
                    <TextInput
                        style={styles.input}
                        placeholder='e.g. 6'
                    />
                </View>
                
                <View>
                    <MyAppText>Enter the Name of Product:</MyAppText>
                    <TextInput
                        style={styles.input}
                        placeholder='e.g. Bus Ticket'
                    />
                </View>
                
                <View>
                    <MyAppText>Enter the Method of Payment:</MyAppText>
                    <TextInput
                        style={styles.input}
                        placeholder='e.g. Wallet'
                    />
                </View>
                
                <View>
                    <Button 
                        title='Cancel'
                        color='#fff'
                    />
                    <Button 
                        title='Confirm'
                        color='#5885FF'
                    />
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '80vh',
        // backgroundColor: '#bcbcbc'
    },
    input: {
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8
    }
})

export default AddTransactionForm;