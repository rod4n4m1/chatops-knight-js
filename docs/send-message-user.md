# ChatOps Knight JS

## Post Message X-Ray

| **Item** | **Value** |
|:-----------------------|:-----------------------|
| Endpoint | `/api/v1/sendDirectMessageToUser` |
| HTTP Method | `POST` |
| Type | `Asynchronous` |
| Params | `{String<required>} sourceId`<br>`{String<required>} sourceToken`<br> `{String<required>} transactionId`<br>`{Object<required>} payload` |
| Returns | `Promise<Object>` |
|  |  |

### Usage

**Await call**
```
const sendMessage2User = await knight.sendMessageToUser(sourceId, sourceToken, transactionId, payload);
```

**Call,then,catch**

```
knight.sendMessageToUser(@params).then((res)=> {
  // Do something
}).catch((error) => {
  // Handle error
});
```

**Functional paradigm**

```
const sendMessage = function (sourceId, sourceToken, transactionId, payload) => {
  knight.sendMessageToUser(sourceId, sourceToken, transactionId, payload).then((res)=> {
    return res;
  }).catch((err) => {
    return err;
  });
};

sendMessage(sourceId, sourceToken, transactionId, payload);
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
| collabPlatform | List | **Yes** | SLACK, TEAMS, or MM |
| emailId | String | **Yes** |  |
| language | String | No |  |
| message | Object | **Yes** | Slack simple JSON message or Slack Block Kit UI formatted message |
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
  //workspaceName: SlackWorkspaceName,
  message: message,
  emailId: "rod.anami@acme.com"
  channelId: SlackChannelID,
  callbackUrl: CallbackURL,
  ts: "",
  language: "English"
}

knight.sendMessageToUser(SourceId, SourceToken, transactionId, payload).then(function(data){
  console.log('> sendMessageToUser output: \n', data);
}).catch(function(sendMessageError){
  if(initiateTicketError.isKnightError) {
    console.error('sendMessageToUser error: \n',sendMessageError.knightHelpMessage);
  } else {
    console.error('sendMessageToUser error full stack: \n',sendMessageError);
  }
});
```
