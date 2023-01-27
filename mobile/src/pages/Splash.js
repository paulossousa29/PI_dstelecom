import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../config/colors';

const Splash = () => {
  return (
    <View style={styles.background}>
      <Image
        style={styles.logo}
        source={require('../assets/logo-black.png')}></Image>
      <View style={styles.container}>
        <View style={styles.resultReference}>
          <Text style={styles.text}>A carregar</Text>
        </View>
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

export default Splash;
