import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import colors from '../config/colors';

const ShowImage = ({route, navigation}) => {
  const {uri, message} = route.params;

  return (
    <View style={styles.background}>
      <Image
        style={styles.logo}
        source={require('../assets/logo-black.png')}></Image>

      <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
        <View style={styles.image}>
          <Image
            source={{uri: uri}}
            style={{width: 280, height: 350, borderRadius: 15}}
          />
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            navigation.pop();
          }}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    paddingTop: 30,
    paddingLeft: 50,
    color: colors.logoGreyDark,
    fontWeight: 'bold',
  },
  image: {
    width: 250,
    height: 250,
  },
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
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  logo: {
    width: '90%',
    height: '30%',
    resizeMode: 'contain',
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
  image: {
    flex: 1,
    marginTop: 15,
    paddingTop: 10,
    width: '100%',
    alignItems: 'center',
  },
});

export default ShowImage;
