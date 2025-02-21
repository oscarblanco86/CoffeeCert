// screens/ChatScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

const ChatScreen = ({ route, navigation }) => {
  const { soilInfo } = route.params ?? {};  // Handle case where soilInfo is undefined
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    if (!soilInfo) {
      // Redirect back to form screen if soilInfo is not available
      navigation.navigate('Form');
    }
  }, [soilInfo]);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage = { role: 'user', content: inputMessage };
      setChatMessages([...chatMessages, userMessage]);
      setInputMessage('');

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo', // Adjust model as needed
            messages: [
              ...chatMessages,
              userMessage,
              { role: 'system', content: `Provide information based on the following soil data: ${JSON.stringify(soilInfo)}` },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
          }
        );

        const assistantMessage = response.data.choices[0].message;
        setChatMessages([...chatMessages, userMessage, assistantMessage]);
      } catch (error) {
        console.error('Error sending message to OpenAI:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coffee Certification Assistant</Text>
      <ScrollView style={styles.chatContainer}>
        {chatMessages.map((message, index) => (
          <View key={index} style={message.role === 'user' ? styles.userMessage : styles.assistantMessage}>
            <Text>{message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={inputMessage}
        onChangeText={setInputMessage}
      />
      <Button title="Send" onPress={handleSendMessage} />
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
    marginBottom: 16,
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    marginBottom: 16,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  assistantMessage: {
    backgroundColor: '#EAEAEA',
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default ChatScreen;
