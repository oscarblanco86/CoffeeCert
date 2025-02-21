// screens/OptionsScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const OptionsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to CoffeeCert</Text>
      <Button title="Soil Information Form" onPress={() => navigation.navigate('Form')} />
      <Button title="Certification Assistant" onPress={() => navigation.navigate('Chat')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});

export default OptionsScreen;
