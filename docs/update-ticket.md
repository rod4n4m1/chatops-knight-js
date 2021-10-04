# ChatOps Knight JS

## Initiate Ticket X-Ray

| **Item** | **Value** |
|:-----------------------|:-----------------------|
| Endpoint | `/api/v1/updateTicket` |
| Method | `POST` |
| Type | `Asynchronous` |
| Params | `{String<required>} sourceId`<br>`{String<required>} sourceToken`<br> `{String<optional>} transactionId`<br>`{Object<optional>} payload` |
| Returns | `Promise<Object>` |
|  |  |

### Usage

**Await call**
```
const iniTicket = await knight.updateTicket(sourceId, sourceToken, transactionId, payload);
```

**Call,then,catch**

```
knight.updateTicket(@params).then((res)=> {
  // Do something
}).catch((error) => {
  // Handle error
});
```

**Functional paradigm**

```
const updateIncManager = function (sourceId, sourceToken, payload) => {
  knight.updateTicket(sourceId, sourceToken, null, payload).then((res)=> {
    return res;
  }).catch((err) => {
    return err;
  });
};

console.log(updateIncManager(sourceId, sourceToken, payload));
```

### Typical Results

```
{
  success: true,
  errorMessage: []
}
```

### Payload details

**Required**

| **Properties** | **Type** | **Required** | **Description** |
|:---------------|:---------|:---------:|:----------------------------|
| accountCodeLocators | Object | **Yes** |  |
| channelId | String | No |  |
| environment | String | **Yes** |  |
| eventId | String | **Yes** |  |
| isFetchDetailsRequired | Boolean | No |  |
| resolveTime | String | No |  |
| resolver | String | No |  |
| sourceIdentificationCode | String | No |  |
| status | String | **Yes** |  |
| statusDescription | String | No |  |
| ticketAssignmentGroups | [String] | No |   |
| ticketDesc | String | No |  |
| ticketDetail | Object | No |  |
| ticketId | String | **Yes** |  |
| ticketImpact | String | No |  |
| ticketPriority | Number | No |  |
| ticketType | String | No |  |
|  |  |  |  |


### Examples

```
const AccountLocator = [
    {
      SearchKey: "accountCode",
      SearchValue: "demo"
    }
];

let payload = {
  accountCodeLocators: AccountLocator,
  eventId: "ChatOps-Knight-JS-SDK",
  ticketId: "EVT202109220000_0000",
  ticketPriority: 1,
  environment: "Prod",
  ticketType: "Event",
  status: "Resolved",
}

knight.updateTicket(SourceId, SourceToken, null, payload).then(function(data){
  console.log('> updateTicket output: \n', data);
}).catch(function(updateTicketError){
  if(initiateTicketError.isKnightError) {
    console.error('updateTicket error: \n',updateTicketError.knightHelpMessage);
  } else {
    console.error('updateTicket error full stack: \n',updateTicketError);
  }
});
```
