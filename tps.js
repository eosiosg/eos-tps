'use strict';
const ChainId = process.env.CHAIN_ID;
const Eos = require('eosjs');
const privateKey = process.env.PRIVATE_KEY;
const contractName = process.env.CONTRACT_NAME;
// const endPoint = process.env.API_ENDPOINT;
const endPoint = process.env.ENDPOINT;

const from=process.env.FROM;
const to=process.env.TO;
const quantity=process.env.QUANTITY;

const eos = Eos({
  keyProvider: privateKey,
  sign: true,
  chainId: ChainId,
  httpEndpoint: endPoint,
});

async function send() {
  let t = Date.now()
  let message = `${t}: TPS Test from ${endPoint}`
  eos.transaction({
    // ...headers,
    actions: [
      {
        account: contractName,
        name: 'transfer',
        authorization: [{
          actor: from,
          permission: 'active'
        }],
        data: {
          from: from,
          to: to,
          quantity: quantity,
          memo: message ,
        }
      }
    ]
  }).then(res => {
    console.log('Tx: ' + res.transaction_id);
  }, err => {
    console.error(err);
  });
}

setInterval(send, +process.env.INTERVAL);
