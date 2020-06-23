import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

import axios from 'axios';

export default function Index() {
  const [message, setmessage] = useState('');

  function onSubmit() {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Basic YTRiNmQyMzQtM2YxNy00ZTY0LWJhY2QtY2M1MmYwYWIyMTNj',
    };

    const body = JSON.stringify({
      app_id: 'fa4641e4-c71f-48e9-8caa-0ee1df81d87a',
      contents: {en: message != '' ? message : 'Olá Sou um Push Notification!'},
      // included_segments: ['All'],
      include_player_ids: ["9249ed86-7607-4963-935c-f26ddcb3d4cb"]
    });

    axios({
      method: 'POST',
      url: 'https://onesignal.com/api/v1/notifications',
      headers: headers,
      data: body,
    })
      .then(res => {
        console.log('Response Data', res);
      })
      .catch(err => {
        console.log('Erro', err);
      });
  }


  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 22}}>Home Native - PushNoti</Text>
      <View style={{marginTop: '10%'}}>
        <TextInput
          value={message}
          onChangeText={text => setmessage(text)}
          style={{
            backgroundColor: '#6e6e6e20',
            margin: 3,
            width: 300,
            borderRadius: 8,
          }}
        />
        <Button
          title="Enviar Push"
          onPress={onSubmit}
          style={{width: 280, borderRadius: 8}}
        />
      </View>
    </View>
  );
  
}
