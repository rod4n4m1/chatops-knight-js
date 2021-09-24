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

**Async-Await call**

```
const health = await knight.healthCheck();
```

**Call,then,catch**

```
knight.healthCheck().then((res)=> {
  // Do something
}).catch((error) => {
  // Handle error
});
```

**Functional paradigm**

```
const isAPIHealth = function () => {
  knight.healthCheck().then((res)=> {
    return true;
  }).catch((error) => {
    return false;
  });
};

if (isAPIHealth()) {
  // Do something
}
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
