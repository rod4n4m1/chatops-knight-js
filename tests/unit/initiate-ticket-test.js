//Unit Test

// source process.env
// node initiate-ticket-test.js
const CACert = process.env.CK_CA_CERT;
const KnightURL = process.env.CK_BASE_URL;
const SourceId = process.env.CK_SOURCE_ID;
const SourceToken = process.env.CK_SOURCE_TOKEN;
const ApiPath = process.env.CK_API_PATH;
let payload = {
  accountCodeLocators: [
    {
      SearchKey: "accountCode",
      SearchValue: "demo1"
    }
  ],
  eventId: "ChatOps-Knight-JS-SDK",
  ticketId: "EVT202109220000_0000",
  ticketPriority: 1,
  environment: "Prod",
  ticketType: "Event",
  ticketImpact: "High",
  ticketDesc: "ChatOps Knight JS - initiateTicket endpoint unit test.",
  callbackAddress: "https://a29c501d-6659-42b1-8408-400f567e40f2.mock.pstmn.io/initiateChatOpsIncidentProcess"
}

// This is only for avoid creating collisions in the event id and set a meaningful transaction id
const generateMockData = function () {
  let eventTicket = "";
  let timeString = "";
  const TimeStamp = new Date().toISOString().replace(/\..+/, '');
  timeString = TimeStamp.replace(/T|-/g, '');
  timeString = timeString.split(':')[0]+timeString.split(':')[1];
  let randomWord = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);
  eventTicket = 'EVT'+timeString+'_'+randomWord.toUpperCase();
  //console.log(eventTicket);
  return { eventTicket: eventTicket, timeStamp: TimeStamp };
};

const Knight = require('../../Knight');
const knight = new Knight( {
    https: true,
    cacert: CACert,
    baseUrl: KnightURL,
    rootPath: ApiPath,
    timeout: 3000,
    proxy: false
});

const mockData = generateMockData();
payload.ticketId = `${mockData.eventTicket}`;
transactionId = `${mockData.timeStamp}`;

knight.initiateTicket(SourceId, SourceToken, transactionId, payload).then(function(data){
  console.log('> initiateTicket output: \n', data);
}).catch(function(initiateTicketError){
  if(initiateTicketError.isKnightError) {
    console.error('initiateTicket error: \n',initiateTicketError.knightHelpMessage);
    console.error('initiateTicket error details: \n',initiateTicketError.knightHelpMessage.details);
  } else {
    console.error('initiateTicket error full stack: \n',initiateTicketError);
  }
});
