import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

import axios from 'axios';

export default function Index() {
  const [message, setmessage] = useState('');

  function onSubmit() {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Basic Yert6732dfyMzQtMert5678uhjn0LWJhY2rt789pYwYWIyMTNj',
    };

    const body = JSON.stringify({
      app_id: 'fabbgh78-c55f-33e9-8caa-0e22gfh47a',
      contents: {en: message != '' ? message : 'Olá Sou um Push Notification!'},
      // included_segments: ['All'],
      include_player_ids: ["5787fgg-7223-49114-944c-f2ggh64f4cb"]
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
