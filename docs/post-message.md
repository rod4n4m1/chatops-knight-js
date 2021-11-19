# ChatOps Knight JS

## Post Message X-Ray

| **Item** | **Value** |
|:-----------------------|:-----------------------|
| Endpoint | `/api/v2/postMessage` |
| HTTP Method | `POST` |
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
| accountCodeLocators | Object | **Yes** | Key-values pairs used to locate an Account and Incident.<br> Few examples of searchKey are: Accountcode, cdic, accountname,cdir, geography, countryName, etc.<br> It can be extended in future to other unique locators. |
| callbackUrl | String | No |   |
| channelId | String | **Yes** |  |
| collabPlatform | List | **Yes** | SLACK, TEAMS, or MM |
| isUpdate | Boolean | No | True – when updating an already existing message.<br> False – When a new message should be posted (defaults to True) |
| language | String | No |  |
| message | Object | **Yes** | Slack simple JSON message or Slack Block Kit UI formatted message |
| ticketId | String | No | A unique number which is used to create channel ID. Broken, do not use |
| ts | String | No | Timestamp of the message to which message should be edited. |
| workspaceName | String | **Yes** | Workspace where the channel is present. Required if accountCodeLocators is null.  |
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
