import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../config/colors';

const ResultReference = ({messageToWait}) => {
    console.log(messageToWait)
    return ( 
        <View style={styles.resultReference}>
            <Image source={require('../assets/clock.png')} style={{ width: 40, height: 40 }} /> 
            <Text style={styles.text}> {messageToWait} </Text>
        </View>

    );
}
 
const styles = StyleSheet.create({
    
    text: {
      paddingLeft: 10,
      paddingTop: 15,
      color: colors.logoGreyDark,
      fontWeight: 'bold',
      alignItems: "center",
    },
    
    resultReference: {
        flex: 1,
        marginTop: 15,
        paddingTop: 60,
        borderRadius: 50,
        width: "100%",
        alignItems: "center",
    },
  });

export default ResultReference;