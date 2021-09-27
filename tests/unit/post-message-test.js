//Unit Test
const fs = require('fs');
// source process.env
// node post-message-test.js
const CACert = process.env.CK_CA_CERT;
const KnightURL = process.env.CK_BASE_URL;
const SourceId = process.env.CK_SOURCE_ID;
const SourceToken = process.env.CK_SOURCE_TOKEN;
const APIPath = process.env.CK_API_PATH_V2;
const CallbackURL = process.env.CK_CALLBACK_URL;
const TransationID = process.env.CK_TRANSACTION_ID;
const SlackMessageFile = process.env.CK_SLACK_MESSAGE_FILE;
const SlackChannelID = process.env.CK_SLACK_CHANNEL_ID;
const SlackWorkspaceName = process.env.CK_SLACK_WS_NAME;

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
  //ticketId: "EVT202109220000_0000",
  //workspaceName: SlackWorkspaceName,
  message: message,
  channelId: SlackChannelID,
  callbackUrl: CallbackURL,
  ts: "",
  language: "English",
  isUpdate: false
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

knight.postMessage(SourceId, SourceToken, TransationID, payload).then(function(data){
  console.log('> postMessage output: \n', data);
}).catch(function(postMessageError){
  console.error('Payload: \n', payload);
  if(postMessageError.isKnightError) {
    console.error('postMessage error: \n',postMessageError.knightHelpMessage);
    if (postMessageError.knightHelpMessage.details) {
      console.error('postMessage error details: \n',postMessageError.knightHelpMessage.details);
    }
  }
  // console.error('====================================Full Stack======================================= \n',postMessageError);
});
