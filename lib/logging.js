/**
 * @license
 * Copyright 2015 Telefónica Investigación y Desarrollo, S.A.U
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var onHeaders = require('on-headers');

/**
 * Express middleware to log the request and response.
 *
 * @param {Object} logger
 *    Logger.
 * @return {Function(req, res, next)} Express middleware.
 */
module.exports = function(logger) {

  /**
   * Return the client address from the last IP address in X-Forwarded-For HTTP header. If not possible to
   * obtain it from X-Forwarded-For header, then return req.ip (however, this value typically is the load
   * balancer IP address and it does not provide any valuable information).
   *
   * @param {Object} req
   *    Express request
   * @return {String}
   *    Client IP address
   */
  function getClientIp(req) {
    var xff = req.get('x-forwarded-for');
    if (xff) {
      var ips = xff.split(',').map(function onIp(ip) {
        return ip.trim();
      });
      var ip = ips[ips.length - 1];
      if (ip) {
        return ip;
      }
    }
    return req.ip;
  }

  return function loggingMiddleware(req, res, next) {
    var startTime = new Date();
    logger.info('Request from %s: %s %s', getClientIp(req), req.method, req.originalUrl);

    onHeaders(res, function onResponse() {
      var duration = new Date() - startTime;
      var location = res.get('location');
      if (location) {
        logger.info('Response with status %d in %d ms. Location: %s', res.statusCode, duration, location);
      } else {
        logger.info('Response with status %d in %d ms.', res.statusCode, duration);
      }
    });
    next();
  };

};
