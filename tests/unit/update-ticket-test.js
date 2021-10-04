//Unit Test

// source process.env
// node initiate-ticket-test.js
const CACert = process.env.CK_CA_CERT;
const KnightURL = process.env.CK_BASE_URL;
const SourceId = process.env.CK_SOURCE_ID;
const SourceToken = process.env.CK_SOURCE_TOKEN;
const APIPath = process.env.CK_API_PATH_V1;
const TransationID = process.env.CK_TRANSACTION_ID;

const AccountLocator = [
    {
      SearchKey: "accountCode",
      SearchValue: "demo3"
    }
];
let payload = {
  accountCodeLocators: AccountLocator,
  eventId: "ChatOps-Knight-JS-SDK",
  ticketId: "EVT202110041953_ZPIO",
  ticketPriority: 1,
  environment: "Prod",
  ticketType: "Event",
  status: "In Progress",
  resolver: "chatops-knight"
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

knight.updateTicket(SourceId, SourceToken, TransationID, payload).then(function(data){
  console.log('> updateTicket output: \n', data);
}).catch(function(updateTicketError){
  console.error('Payload: \n', payload);
  if(updateTicketError.isKnightError) {
    console.error('updateTicket error: \n',updateTicketError.knightHelpMessage);
    if (updateTicketError.knightHelpMessage.details) {
      console.error('updateTicket error details: \n',updateTicketError.knightHelpMessage.details);
    }
  }
  // console.error('====================================Full Stack======================================= \n',initiateTicketError);
});
