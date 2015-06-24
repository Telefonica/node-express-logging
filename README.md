# express-logging

Express middleware to log, using [logops](https://github.com/telefonicaid/logops) library, each request and response.

## Installation

```bash
npm install express-logging
```

## Basic usage

```js
var express = require('express'),
    expressLogging = require('express-logging');

var app = express();
app.use(expressLogging());

app.listen(3000);
```

## Logs

The request is logged with:

```js
logger.info('Request from %s: %s %s', clientIpAddress, requestMethod, requestUrl);
```

A response without `Location` header is logged with:

```js
logger.info('Response with status %d in %d ms.', responseStatusCode, duration);
```

A response with `Location` header is logged with:

```js
logger.info('Response with status %d in %d ms. Location: %s', responseStatusCode, duration, locationHeader);
```

Both response log entries include the `duration` of the whole transaction (between receiving the request until replying with the response).

## License

Copyright 2015 [Telefónica Investigación y Desarrollo, S.A.U](http://www.tid.es)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
