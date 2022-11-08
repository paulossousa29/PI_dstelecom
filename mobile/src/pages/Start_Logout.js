import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import colors from '../config/colors';

const Start_Logout = ({navigation}) => {
  const [workOrder, setWorkOrder] = useState(null);
  const [errorMsgWorkOrder, setErrorMsgWorkOrder] = useState(null);

  const handleLogout = () => {
    // redirecionamento
  };

  const verification = () => {
    if (workOrder == null) {
      setErrorMsgWorkOrder('ID de Workorder necessário!');
    }
  };

  const validationID = () => {
    if (workOrder != null) {
      setWorkOrder(null);
      setErrorMsgWorkOrder(null);

      return;
    }
    verification();
  };

  return (
    <View style={styles.background}>
      <Image
        style={styles.logo}
        source={require('../assets/logo-black.png')}></Image>
      <View style={styles.container}>
        <Text style={styles.text}>ID do WorkOrder</Text>
        {errorMsgWorkOrder && (
          <Text style={styles.errorMessage}>{errorMsgWorkOrder}</Text>
        )}

        <TextInput
          style={styles.workOrderInput}
          onChangeText={setWorkOrder}
          value={workOrder}
          placeholder="FTTH_DST_00263846"
          placeholderTextColor="#ccccb3"></TextInput>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => validationID()}>
          <Text style={styles.buttonText}>Começar trabalho</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Terminar Sessão</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Start_Logout;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.logoGreyDark,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: colors.lightGrey,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: colors.logoGreyDark,
    paddingTop: 14,
    paddingBottom: 14,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  startButton: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    backgroundColor: colors.red,
    paddingTop: 14,
    paddingBottom: 14,
    marginVertical: 30,
    marginHorizontal: 20,
  },
  workOrderInput: {
    backgroundColor: colors.white,
    width: '90%',
    borderRadius: 50,
    height: 40,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingLeft: 10,
  },
  logo: {
    width: '90%',
    height: '30%',
    resizeMode: 'contain',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    paddingLeft: 30,
    paddingTop: 15,
    color: colors.logoGreyDark,
    fontWeight: 'bold',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  errorMessage: {
    fontSize: 12,
    color: colors.red,
    fontWeight: 'bold',
    paddingLeft: 30,
  },
});
