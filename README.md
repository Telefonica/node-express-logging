# express-logging

Express middleware to log, using a configurable logger, each request and response.

[![npm version](https://badge.fury.io/js/express-logging.svg)](http://badge.fury.io/js/express-logging)
[![Build Status](https://travis-ci.org/telefonica/node-express-logging.svg)](https://travis-ci.org/telefonica/node-express-logging)
[![Coverage Status](https://img.shields.io/coveralls/telefonica/node-express-logging.svg)](https://coveralls.io/r/telefonica/node-express-logging)

## Installation

```bash
npm install express-logging
```

## Basic usage

```js
var express = require('express'),
    expressLogging = require('express-logging'),
    logger = require('logops');

var app = express();
app.use(expressLogging(logger));

app.listen(3000);
```

## Extended usage with blacklist

An optional argument `blacklist` is available to prevent some resources from being logged (for example, static resources). This argument is an array of strings. If the URL path starts with any of the elements of the blacklist array, then the logging of this request/response is ignored.

The following example would ignore any resource available at either `/images` or `/html`.

```js
var blacklist = ['/images', `html`];
app.use(expressLogging(logger, blacklist));
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

Copyright 2015, 2016 [Telefónica Investigación y Desarrollo, S.A.U](http://www.tid.es)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
