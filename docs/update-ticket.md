# ChatOps Knight JS

## Update Ticket X-Ray

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
true
```

### Payload details

**Required**

| **Properties** | **Type** | **Required** | **Description** |
|:---------------|:---------|:---------:|:----------------------------|
| accountCodeLocators | Object | **Yes** | SearchKey and values will be same as Initiate API to which incident is already created. It is used to identify the Account and an Incident to update the details of an incident. |
| channelId | String | No | The Channel ID which is already created. Ex: C02C0CJG2NB. |
| environment | String | **Yes** | This is used to identify the environment, it’s a free text.<br> Ex: QA, PROD, Pentest Environments. |
| eventId | String | **Yes** | Event ID which may be present in the monitoring tool can be associated to this particular ticket ID. |
| isFetchDetailsRequired | Boolean | No |  |
| resolveTime | String | No | Resolution Time is captured. |
| resolver | String | No | The PIC who has resolved the incident. |
| sourceIdentificationCode | String | No | Uniquely identifies the source system in ChatOps Knight. |
| status | String | **Yes** | This represents the incident status like in-progress, resolved, on-hold etc. Valid values are `NEW`, `DISCOVERY`, `OPEN`, `INPROGRESS`, `REOPEN`, `HOLD`, `PENDING`, `CLOSE`, `CANCEL`, and `RESOLVE` |
| statusDescription | String | No | Description can be added when updating the status of an incident. |
| ticketAssignmentGroups | [String] | No | The Assignment Group which is added in the ticketing tool. ITSM owner group.  |
| ticketDesc | String | No | The Incident ticket description can be updated by using this field. |
| ticketDetail | Object | No |  |
| ticketId | String | **Yes** | The ticket ID of an incident which is used to update. |
| ticketImpact | String | No | User can set it as High, Medium or Low based on the incident. |
| ticketPriority | Number | No | Priority of the incident can be set. It can be 1,2,3 or 4.<br>1 being the highest priority. |
| ticketType | String | No | It’s a free text field which gets displayed in the incident. |
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
  status: "Resolved"
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
