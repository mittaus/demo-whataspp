// import { create, Whatsapp } from '@wppconnect-team/wppconnect';
const wppconnect = require('@wppconnect-team/wppconnect');

function start(client) {
    client
    client.onMessage((message) => {
      console.log(message); // not call on reply messages
    });
  }

wppconnect
  .create()
  .then((client) => {
    client.sendText("5199ddd2769004", "Hola estás?");
    // console.log(wppconnect.start);
    start(client)
  })
  .catch((error) => console.log(error));

