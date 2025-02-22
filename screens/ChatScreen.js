import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import { OPENAI_API_KEY } from '@env';

export default function ChatScreen({ route, navigation }) {
  const { soilInfo } = route.params ?? {}; // Handle case where soilInfo is undefined
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (!soilInfo) {
      // Redirect back to form screen if soilInfo is not available
      navigation.navigate('Form');
    } else {
      // Add basic evaluation message to chat
      const evaluationMessage = {
        type: 'bot',
        text: `Soil Type: ${soilInfo.soilType}\nPH Level: ${soilInfo.pHLevel}\nMoisture Level: ${soilInfo.moistureLevel}%`
      };
      setChat([evaluationMessage]);
    }
  }, [soilInfo]);

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = { type: 'user', text: message };
      setChat([...chat, userMessage]);
      setMessage('');

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo', // Adjust model as needed
            messages: [
              { role: 'system', content: `You are a helpful assistant called AgriNova that provides professional assistance for coffee certification based on the following soil data: ${JSON.stringify(soilInfo)}` },
              { role: 'user', content: message }
            ]
          },
          {
            headers: {
            'Content-Type': 'application/json',
              Authorization: `Bearer ${OPENAI_API_KEY}`
            }
          }
        );

        if (!response.status === 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const botMessage = response.data.choices[0].message.content;
        setChat([...chat, userMessage, { type: 'bot', text: botMessage }]);
      } catch (error) {
        console.error('Error:', error);
        setChat([...chat, { type: 'bot', text: 'Sorry, there was an issue with the API response. Please try again.' }]);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={60}
    >
      <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
        {chat.map((chatMessage, index) => (
          <Text key={index} style={chatMessage.type === 'user' ? styles.userMessage : styles.botMessage}>
            {chatMessage.text}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  chatContainer: { flex: 1, width: '100%' },
  chatContent: { flexGrow: 1, justifyContent: 'flex-end' }, 
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderTopColor: '#ddd' },
  input: { flex: 1, padding: 10, marginRight: 10, borderWidth: 1, borderRadius: 5 },
  userMessage: { alignSelf: 'flex-start', padding: 10, margin: 5, backgroundColor: '#ddd', borderRadius: 5 },
  botMessage: { alignSelf: 'flex-end', padding: 10, margin: 5, backgroundColor: '#abc', borderRadius: 5 }
});
