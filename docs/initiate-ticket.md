# ChatOps Knight JS

## Initiate Ticket X-Ray

| **Item** | **Value** |
|:-----------------------|:-----------------------|
| Endpoint | `/api/v1/initiateTicket` |
| HTTP Method | `POST` |
| Type | `Asynchronous` |
| Params | `{String<required>} sourceId`<br>`{String<required>} sourceToken`<br> `{String<optional>} transactionId`<br>`{Object<required>} payload` |
| Returns | `Promise<Object>` |
|  |  |

### Usage

**Await call**
```
const iniTicket = await knight.initiateTicket(sourceId, sourceToken, transactionId, payload);
```

**Call,then,catch**

```
knight.initiateTicket(@params).then((res)=> {
  // Do something
}).catch((error) => {
  // Handle error
});
```

**Functional paradigm**

```
const startIncManager = function (sourceId, sourceToken, payload) => {
  knight.initiateTicket(sourceId, sourceToken, null, payload).then((res)=> {
    return res;
  }).catch((err) => {
    return err;
  });
};

console.log(startIncManager(sourceId, sourceToken, payload));
```

### Typical Results

```
{
  success: true,
  errorMessage: []
}
```

### Payload details

| **Properties** | **Type** | **Required** | **Description** |
|:---------------|:---------|:---------:|:----------------------------|
| accountCodeLocators | Object | **Yes** | Key-values pairs used to locate an Account and Incident.<br> Few examples of searchKey are: Accountcode, cdic, accountname,cdir, geography, countryName, etc.<br> It can be extended in future to other unique locators. |
| additionalProperties | Object | No | For a source system (Configured additional properties) this object defines any additional properties which can be used in chatops rules. |
| callbackAddress | String | No | This is used to return the response to this external URL Async. |
| channelCreateRequest | Object | No | This field is for internal use, User can ignore this field.  |
| environment | String | **Yes** | This is used to identify the environment, it’s a free text. <br> Ex: QA, PROD, Pentest Environments. |
| eventId | String | **Yes** | Event Id which may be present in the monitoring tool can be associated to this particular ticket ID. |
| ticketAssignmentGroups | [String] | No |  The Assignment group which is added in the ticketing tool. ITSM owner group. |
| ticketDesc | String | **Yes** | The Incident ticket description, this gets displayed in the Incident channel. |
| ticketId | String | **Yes** | A unique number identifying the Ticket which is used to create channel. |
| ticketImpact | String | No | A unique number identifying the Ticket which is used to create channel. |
| ticketPriority | Number | **Yes** | Priority of the incident can be set. It can be 1,2,3 or 4.<br> 1 being the highest priority. |
| ticketType | String | No | It should be Incident. It takes Incident by default. |
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
  ticketImpact: "High",
  ticketDesc: "ChatOps Knight JS - initiateTicket endpoint unit test.",
  callbackAddress: "https://response_url/endpoint"
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
