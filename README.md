# ChatOps Knight JS
<img alt="David" src="https://img.shields.io/david/rod4n4m1/chatops-knight-js">
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/rod4n4m1/chatops-knight-js">
<img alt="npm" src="https://img.shields.io/npm/dm/chatops-knight-js">
<img alt="NPM" src="https://img.shields.io/npm/l/chatops-knight-js">
<img alt="GitHub contributors" src="https://img.shields.io/github/contributors/rod4n4m1/chatops-knight-js">

This module provides a set of functions to help **JavaScript** Developers working with Kyndryl ChatOps knight to authenticate and access API endpoints using **JavaScript** _promises_.

## Requirements (MacOS/Windows)

* NodeJs
  * Minimum: v10.x
  * Recommended: **v12.x** or **v14.x**
* npm
  * Tested on: **v7.24.x**
* Kyndryl ChatOps Knight
  * Recommended: **v20.19**

**Note:** Depending on your Windows setup [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) may need to be installed first. Also, for MacOS users, you should have **xcode-select** or entire Xcode App installed.

### Install

`npm install chatops-knight-js --save`

### Uninstall

`npm uninstall chatops-knight-js`

### Release notes and versions

[Change log](./CHANGELOG.md)

### Class Constructor

```javascript
{
  // Indicates if the HTTP request to the knight server should use
  // HTTPS (secure) or HTTP (non-secure) protocol
  https: true,
  // If https is true, then provide client certificate, client key and
  // the root CA cert
  // Client cert and key are optional now
  cert: './client.crt',
  key: './client.key',
  cacert: './ca.crt',
  // Indicate the server name for the ChatOps Knight API, all paths are relative to this one
  baseUrl: 'https://chatops-prod-int.extnet.ibm.com',
  // Indicate the internal path with API version
  rootPath: 'api/v1',
  // HTTP request timeout in milliseconds
  timeout: 2000,
  // If should use a proxy or not by the HTTP request
  // Example:
  // proxy: { host: proxy.ip, port: proxy.port }
  proxy: false,
  // Enable mutual TLS between client and server
  rejectUnauthorized: true
}
```

### Module usage

**Production**

```javascript
const knight = require('chatops-knight-js');

const knight = new Knight( {
    https: true,
    cert: './client.crt',
    key: './client.key',
    cacert: './ca.crt',
    baseUrl: 'https://chatops-prod-int.extnet.ibm.com/',
    rootPath: 'api/v1',
    timeout: 2000,
    proxy: false,
    rejectUnauthorized: true
});
```

**Development**

```javascript
const knight = require('chatops-knight-js');

const knight = new Knight( {
    https: true,
    cacert: './ca.crt',
    baseUrl: 'https://chatops-dev-int.extnet.ibm.com/',
    rootPath: 'api/v1',
    timeout: 5000,
    proxy: false,
    rejectUnauthorized: false
});
```

Check health status of the knight server:

```javascript
const status = await knight.healthCheck();
```


### Error handling

This package extends the error stack to differentiate if the exception occurred on the ChatOps Knight API layer or not. Also, adds a help message from the knight API docs.

```javascript
try {
  knight.function(...);
}
// An exception happened and it was thrown
catch(err) {
  if(err.isKnightError) {
    // This an error from ChatOps Knight API
    // Check Knight hint on this error
    console.log(err.knightHelpMessage);
  }
  else {
    // Here is still the full Axios error, e.g. err.isAxiosError, err.response, err.request
    // This allows handling of network/tls related issues
    // Or just re-kthrow if you don't care
    throw err;
  }
}
```

### Coverage and Limitations

The following ChatOps Knight [API](https://chatops-dev-int.extnet.ibm.com/) endpoints are currently covered.

| **Endpoint** | **Function** | **Doc** |
|:--------------|:--------------:|:--------------:|
| `/ping` | `.healthCheck()` | TBC |
|  |  |  |


### Creating your test environment (with HTTPS)

Follow the detailed instructions from this [doc]().

### References

  * ChatOps Knight Production [Internal API](https://chatops-prod-int.extnet.ibm.com/) documentation
  * ChatOps Knight Development [Internal API](https://chatops-dev-int.extnet.ibm.com/) documentation


### Contributing
If you want to contribute to the module and make it better, your help is very welcome. You can do so submitting a **Pull Request**. It will be reviewed and merged to main branch if accepted.

### Reporting an issue
If you have found what you believe to be an issue with `chatops-knight-js` please do not hesitate to file an issue on the GitHub repository [here](https://github.com/rod4n4m1/chatops-knight-js/issues/new?template=bug-report.md).

### Suggesting a new feature
If you want to see new features or enhancements to the current ones, we would love to hear them. Please submit an issue on the GitHub repository [here](https://github.com/rod4n4m1/chatops-knight-js/issues/new?template=new-feature.md).

### Authors
Written by Rod Anami <rod.anami@kyndryl.com>, September 2021.

### Contributors
*


### License
This package is licensed under the [Eclipse Public License 2.0](https://opensource.org/licenses/EPL-2.0).

Kyndryl ChatOps Knight (ChatOps Fabric) software is licensed under a commercial license to its customers.
