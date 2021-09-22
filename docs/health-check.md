# ChatOps Knight JS

## Health Check X-Ray

| **Item** | **Value** |
|:-----------------------|:-----------------------|
| Endpoint | `/ping` |
| Method | `GET` |
| Type | `Asynchronous` |
| Params | None |
| Returns | `Promise<Object>` |
|  |  |

### Usage

```
const health = await knight.healthCheck();
```
OR

```
knight.healthCheck().then((res)=> {
  // Do something
}).catch((error) => {
  // Handle error
});
```

### Typical Results

```
{
  greeting: 'Hello from LoopBack',
  date: '2021-09-22T15:39:35.867Z',
  url: '/ping',
  headers: {
    host: 'chatops-server',
    connection: 'close',
    accept: 'application/json, text/plain, */*',
    'x-application-name': 'chatops-knight-js',
    'user-agent': 'axios/0.21.4'
  }
}
```

### Examples

```
const health = await knight.healthCheck();

if (health.greeting) {
  console.log('ChatOps Knight API server is reachable');
} else {
  console.error('Error: ', health);
}
```
