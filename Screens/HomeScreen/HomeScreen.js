import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
// import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, Button } from 'react-native';
import TopCards from './TopCards/TopCards';
import MyAppText from '../../CustomComponents/MyAppText'

const HomeScreen = ({ navigation }) => {
    return(
        <View style={styles.body}>
            <LinearGradient 
                colors={['#AD00FF', '#8F3528']} 
                start={{
                    x: 0.5,
                    y: 0.5
                }}
                end={{
                    x: 1,
                    y: 1
                }}
            >
                <TopCards />
            </LinearGradient>
            <MyAppText>Transactions</MyAppText>
            <View style={styles.button}>
                <Button 
                    title='Add'
                    // onPress={navigation.navigate('AddTransactionScreen')}
                />
            </View>
            <MyAppText>hie</MyAppText>
        </View>
        
    )
}

const styles = StyleSheet.create({
    body: {
        height: '100%',
        backgroundColor: '#031442'
    },
    button: {
        width: 75,
    }
})

export default HomeScreen;
