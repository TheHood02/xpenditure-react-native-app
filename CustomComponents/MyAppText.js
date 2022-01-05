import { Text } from 'react-native';

const MyAppText = (props) => {
    return(
        <Text style={{fontFamily:'poppins-regular', color:'#FFF', ...props.style}}>{props.children}</Text>
    )
}

// const styles = StyleSheet.create({
    
// })

export default MyAppText;