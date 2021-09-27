# ChatOps Knight JS

## Initiate Ticket X-Ray

| **Item** | **Value** |
|:-----------------------|:-----------------------|
| Endpoint | `/api/v2/postMessage` |
| Method | `POST` |
| Type | `Asynchronous` |
| Params | `{String<required>} sourceId`<br>`{String<required>} sourceToken`<br> `{String<required>} transactionId`<br>`{Object<required>} payload` |
| Returns | `Promise<Object>` |
|  |  |

### Usage

**Await call**
```
const iniTicket = await knight.postMessage(sourceId, sourceToken, transactionId, payload);
```

**Call,then,catch**

```
knight.postMessage(@params).then((res)=> {
  // Do something
}).catch((error) => {
  // Handle error
});
```

**Functional paradigm**

```
const informChannel = function (sourceId, sourceToken, transactionId, payload) => {
  knight.postMessage(sourceId, sourceToken, transactionId, payload).then((res)=> {
    return res;
  }).catch((err) => {
    return err;
  });
};

informChannel(sourceId, sourceToken, transactionId, payload);
```

### Typical Results

```
true
```

### Payload details

| **Properties** | **Type** | **Required** | **Description** |
|:---------------|:---------|:---------:|:----------------------------|
| accountCodeLocators | Object | Yes |  |
| callbackUrl | String | No |   |
| channelId | String | Yes |  |
| collabPlatform | List | Yes | SLACK, TEAMS, or MM |
| isUpdate | Boolean | No |  |
| language | String | No |  |
| message | Object | Yes | Slack simple JSON message or Slack Block Kit UI formatted message |
| ticketId | String | No | Broken, do not use |
| ts | String | No |  |
| workspaceName | String | Yes* | Required if accountCodeLocators is null  |
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

knight.postMessage(SourceId, SourceToken, transactionId, payload).then(function(data){
  console.log('> initiateTicket output: \n', data);
}).catch(function(initiateTicketError){
  if(initiateTicketError.isKnightError) {
    console.error('initiateTicket error: \n',initiateTicketError.knightHelpMessage);
  } else {
    console.error('initiateTicket error full stack: \n',initiateTicketError);
  }
});
```
