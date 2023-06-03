import api from 'api';

const sdk=require('@api/yaus_link_generation')
//application ID
sdk.auth(' 650c50b5-eae9-442e-88de-fc36be10a21b');
//API key
sdk.auth('_Qd8pWtFySgctTxzuNs6seq5WxIdaQhpiOm-MR2y6G5bLqNBl7Bpb-sk')

sdk.post( {
    "id": "string",
    "user": "string",
    "clicks": 0,
    "url": "string",
    "hashid": 0,
    "project": "string",
    "customHashId": "string"
  },
  {
    //headers
    'Content-Type': 'application/json',
    'Authorization': 'JWT fefege...',
    'Access-Control-Allow-Origin': '*'
  }
  )
.then((response: { status: any; data: { token: any; }; }) => {
  console.log(response.status);
  console.log(response.data.token);
  // console.log(`${baseUrl}/${state.customHashId}`);

})

sdk.server('https://yaus.xyz/register');