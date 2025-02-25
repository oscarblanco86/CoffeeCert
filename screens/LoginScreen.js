import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { VALID_EMAIL, VALID_PASSWORD } from '@env';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      navigation.navigate('MainMenu'); // Navigate if correct
    } else {
      Alert.alert('Invalid Credentials', 'Please check your email and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>MindClusive</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Enter" onPress={handleLogin} />
      <Text style={styles.link}>Forgot Password? Sign Up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Center the image horizontally
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
  },
  link: {
    marginTop: 10,
    color: 'blue',
  },
});
