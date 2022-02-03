const config = {
  appName: 'chatops-knight-js',
  baseUrl: 'https://chatops-prod-int.extnet.ibm.com',
  timeout: 1000,
  proxy: false,
  rootPath: 'api/v1',
  // API endpoint, method
  ckHealth: ['ping', 'get'],
  ckInitiateTicket: ['initiateTicket', 'post'],
  ckPostMessage: ['postMessage', 'post'],
  ckUpdateTicket: ['updateTicket', 'post'],
  ckSendMessageToUser: ['sendDirectMessageToUser', 'post']
};

module.exports = config;
