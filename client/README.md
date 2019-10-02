

### Dependencies

Use `npm` to install the project dependencies:

```bash
# Using npm..
npm install
```

### Configuration
Optimism utilizes [Auth0](http://auth0.com) to authenticate users. Visit the [Auth0](http://auth0.com) website to [SPA Application](https://auth0.com/docs/apis) to obtain a Client ID and Auth0 Domain. Use the instructions in the [server set up](https://github.com/optimism-ai/optimism/blob/master/server/README.md) to obtain an API Identifier.

To do this, first copy `src/auth_config.json.example` into a new file in the same folder called `src/auth_config.json`, and replace the values with your own Auth0 application credentials:

```json
{
  "domain": "{YOUR AUTH0 DOMAIN}",
  "clientId": "{YOUR AUTH0 CLIENT ID}",
  "callbackUrl": "{YOUR AUTH0 CALLBACK URL}"
  "audience": "{YOUR AUTH0 API IDENTIFIER}"
}
```

### Run the application

```bash
npm start
```
