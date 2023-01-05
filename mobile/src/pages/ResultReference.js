import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import ip from '../config/ip';
import axios from 'axios';

const ResultReference = ({route, navigation}) => {
  const {intervention} = route.params;

  const fetchNewReferenceStatus = async () => {
    try {
      const res = await axios.post(ip.backend_ip + 'new_reference_status', {
        id_intervention: intervention,
      });

      return res.data.status;
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleVerify = async () => {
    const status = await fetchNewReferenceStatus();

    if (status === 1 || status === 2) {
      navigation.pop(); // Tem que voltar dois pops mas estoura
    }
  };

  return (
    <View style={styles.background}>
      <Image
        style={styles.logo}
        source={require('../assets/logo-black.png')}></Image>
      <View style={styles.container}>
        <View style={styles.resultReference}>
          <Image
            source={require('../assets/clock.png')}
            style={{width: 40, height: 40}}
          />
          <Text style={styles.text}>Aguarde pela resposta do adminstrador</Text>
        </View>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => handleVerify()}>
          <Text style={styles.buttonText}>Verificar estado do pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.logoGreyDark,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  resultReference: {
    flex: 1,
    marginTop: 15,
    paddingTop: 60,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: '90%',
    height: '30%',
    resizeMode: 'contain',
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
  text: {
    alignItems: 'center',
    paddingTop: 15,
    color: colors.logoGreyDark,
    fontWeight: 'bold',
  },
});

export default ResultReference;
