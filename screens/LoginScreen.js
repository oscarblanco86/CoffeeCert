// screens/LoginScreen.js

import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('./../assets/logo.png')} style={styles.logo}/>
      <Text style={styles.title}>AgriNova Login</Text>
      <TextInput style={styles.input} placeholder="Username" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <Button title="Login" onPress={() => navigation.navigate('Options')} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Added to center the image horizontally
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%', // Ensures the input fields take full width within the container
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain', // or 'cover' depending on your needs
    marginBottom: 24, // Adds space between the logo and the title
  }
});

export default LoginScreen