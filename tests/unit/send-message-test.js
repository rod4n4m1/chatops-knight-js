//Unit Test
const fs = require('fs');
// source process.env
// node post-message-test.js
const CACert = process.env.CK_CA_CERT;
const KnightURL = process.env.CK_BASE_URL;
const SourceId = process.env.CK_SOURCE_ID;
const SourceToken = process.env.CK_SOURCE_TOKEN;
const APIPath = process.env.CK_API_PATH_V1;
const CallbackURL = process.env.CK_CALLBACK_URL;
const TransactionID = process.env.CK_TRANSACTION_ID;
const SlackMessageFile = process.env.CK_SLACK_MESSAGE_FILE;
const SlackWorkspaceName = process.env.CK_SLACK_WS_NAME;
const SlackUserEmailID = process.env.CK_SLACK_USER_EMAIL;

const AccountLocator = [
    {
      SearchKey: "accountCode",
      SearchValue: "demo3"
    }
];
let message = "";
try {
  message = JSON.parse(fs.readFileSync(SlackMessageFile, 'utf8'));
} catch(e) {
  console.error('Error message: ', e);
}

const payload = {
  accountCodeLocators: AccountLocator,
  collabPlatform: "SLACK",
  //workspaceName: SlackWorkspaceName,
  message: message,
  emailId: SlackUserEmailID,
  callbackUrl: CallbackURL,
  ts: "",
  language: "English"
}

const Knight = require('../../Knight');
const knight = new Knight( {
    https: true,
    cacert: CACert,
    baseUrl: KnightURL,
    rootPath: APIPath,
    timeout: 3000,
    proxy: false
});

knight.sendMessageToUser(SourceId, SourceToken, TransactionID, payload).then(function(data){
  console.log('> sendMessageToUser output: \n', data);
}).catch(function(sendMessageError){
  console.error('Payload: \n', payload);
  if(sendMessageError.isKnightError) {
    console.error('sendMessageToUser error: \n',sendMessageError.knightHelpMessage);
    if (sendMessageError.knightHelpMessage.details) {
      console.error('sendMessageToUser error details: \n',sendMessageError.knightHelpMessage.details);
    }
  }
  console.error('====================================Full Stack======================================= \n',sendMessageError);
});
