import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function Register() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const handleRegister = () => {
    // ip address go here
    fetch('http://172.29.159.181:8000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Backend responded: ", data);
        setResponse(data.message);
      })
      .catch(err => console.error("Error calling backend:", err));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Username:</Text>
      <TextInput value={username} onChangeText={setUsername} style={{ borderWidth: 1 }} />
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1 }} />
      <Button title="Register" onPress={handleRegister} />
      <Text>Response: {response}</Text>
    </View>
  );
}
