# ChatOps Knight JS

## Initiate Ticket X-Ray

| **Item** | **Value** |
|:-----------------------|:-----------------------|
| Endpoint | `/api/v1/initiateTicket` |
| Method | `POST` |
| Type | `Asynchronous` |
| Params | {String<required>} sourceId<br>{String<required>} sourceToken<br> {String<optional>} transactionId<br>{Object<required>} payload |
| Returns | `Promise<Object>` |
|  |  |

### Usage

```
const health = await knight.initiateTicket(sourceId, sourceToken, transactionId, payload);
```
OR

```
knight.initiateTicket(@params).then((res)=> {
  // Do something
}).catch((error) => {
  // Handle error
});
```

### Typical Results

```

```

### Payload details

| **Properties** | **Type** | **Required** | **Description** |
|:---------------|:---------|:---------:|:----------------------------|
| accountCodeLocators | Object | Yes |  |
| additionalProperties | Object | No |  |
| callbackAddress | String | No |  |
| channelCreateRequest | Object | No |  |
| environment | String | Yes |  |
| eventId | String | Yes |  |
| ticketAssignmentGroups | [String] | No |   |
| ticketDesc | String | Yes |  |
| ticketImpact | String | No |  |
| ticketPriority | Number | Yes |  |
| ticketType | String | No |  |


### Examples

```
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

knight.initiateTicket(SourceId, SourceToken, transactionId, payload).then(function(data){
  console.log('> initiateTicket output: \n', data);
}).catch(function(initiateTicketError){
  if(initiateTicketError.isKnightError) {
    console.error('initiateTicket error: \n',initiateTicketError.knightHelpMessage);
  } else {
    console.error('initiateTicket error full stack: \n',initiateTicketError);
  }
});
```
