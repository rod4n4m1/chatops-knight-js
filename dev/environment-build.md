# ChatOps Knight JS

## Development Environment Build

**Under construction**

### First step is simple

1. Create a new empty folder

```shell
mkdir my-ck-app
cd my-ck-app
```

### Install Node JS and npm

1. Go the Node JS web site [here](https://nodejs.org/en/download/)

2. Download the latest LTS (stable) version based for your operating system.
  * We recommend the `v16.x`

3. Follow the specific instructions to get it installed locally.

4. Check if these dev tools are installed:

```shell
node --version
npm version
```

### Initialize git (optional)

```shell
cd my-ck-app
git init
```

### Install Source Code Editor

We recommend `Atom` since it's a nice free and open-source text and source code editor for macOS, Linux, and Microsoft Windows. You can download it from [here](https://atom.io).

If you want a full IDE source code editor, you can use the `Microsoft Visual Studio Code` which is also free, but much more robust and powerful. You can get it from [here](https://code.visualstudio.com/download).

### Get ChatOps Knight API CA Certificate

You need the CA Certificate chain from the ChatOps Knight API server to establish a HTTP (encrypted) connection to it. You can either just download the `.crt` files from the GitHub repo or use `openssl` to download it directly from the API server.

1. Download from the GitHub repo (easy way)

```shell
cd my-ck-app
curl https://raw.githubusercontent.com/rod4n4m1/chatops-knight-js/main/dev/ck-dev-ca.crt > ck-dev-ca.crt
curl https://raw.githubusercontent.com/rod4n4m1/chatops-knight-js/main/dev/ck-prod-ca.crt > ck-prod-ca.crt
```

2. Grab it with openssl (advanced)

```shell
echo | \
   openssl s_client -showcerts -verify 5 -servername chatops-dev-int.extnet.ibm.com -connect chatops-dev-int.extnet.ibm.com:443 2>/dev/null | \
   sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > ck-dev-ca.crt
```

```shell
echo | \
   openssl s_client -showcerts -verify 5 -servername chatops-prod-int.extnet.ibm.com -connect chatops-prod-int.extnet.ibm.com:443 2>/dev/null | \
   sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > ck-prod-ca.crt
```

### Set your own process.env file

Check the provided example [here](). Copy it to your folder as `process.env`. Make sure it's listed in the `.gitignore` file. Populate all values according to your app registration with ChatOps Knight team.

## Develop your app first code lines
