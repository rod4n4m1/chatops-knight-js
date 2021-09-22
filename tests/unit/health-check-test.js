//Unit Test

// source process.env
// node health-check-test.js
const ClientCert = process.env.CLIENT_CERT;
const ClientKey = process.env.CLIENT_KEY;
const CACert = process.env.CK_CA_CERT;
const KnightURL = process.env.CK_BASE_URL;

const Knight = require('../Knight');
const knight = new Knight( {
    https: true,
    cacert: CACert,
    baseUrl: KnightURL,
    rootPath: '',
    timeout: 2000,
    rejectUnauthorized: false,
    proxy: false
});

knight.healthCheck().then(function(data){
  console.log('> healthCheck output: \n', data);
}).catch(function(healthError){
  console.error('healthCheck error: \n',healthError);
});
