/*
 * The accompanying program is provided under the terms of the Eclipse Public License 2.0 ("agreement").
 * Written by Rod Anami <rod.anami@kyndryl.com>, September 2021.
*/

const config = require('./Config.js');
// I personally prefer request, but it's deprecated now
const axios = require('axios');
//const _ = require('underscore');
const https = require('https');
const fs = require('fs');
const assert = require('assert');

// Internal function - create new https agent
const getHttpsAgent = function(certificate, key, cacert, rejectUnauthorized) {

  if(!certificate && !key && cacert) {
    return new https.Agent({
      // CA cert from Hashicorp Vault PKI
      ca: fs.readFileSync(cacert),
      rejectUnauthorized: rejectUnauthorized
    });
  } else {
    return new https.Agent({
      // Client certificate
      cert: fs.readFileSync(certificate),
      key: fs.readFileSync(key),
      // CA cert from Hashicorp Vault PKI
      ca: fs.readFileSync(cacert),
      rejectUnauthorized: rejectUnauthorized
    });
  }
}

// Internal function - creates new axios instance
const getAxiosInstance = function(baseurl, timeout, agent, proxy) {
  return axios.create({
      baseURL: baseurl,
      timeout: timeout,
      headers: {
        'X-Application-Name': config.appName
      },
      httpsAgent: agent,
      proxy: proxy
  });
}

// Internal function - parse axios response
const parseAxiosResponse = function(response){
  let message = {};
  if (response.data.auth) {
    message = response.data.auth;
  } else if (response.data.data){
    message = response.data.data;
  } else if (response.data) {
    message = response.data;
  } else {
    message['status']= response.status;
    message['statusText'] = response.statusText;
  }
  return message;
}

// Internal function - parse axios error
const parseAxiosError = function(error){
  let helpMessage = "";
  // Fix the stack
  // passing parseAxiosError as the second param will leave this function out of the trace
  Error.captureStackTrace(error, parseAxiosError);
  if (error.response && error.response.status) {
    error.isKnightError = true;
    // error.knightHelpMessage = helpMessage;
  }
  return error;
}

// main class constructor
class Knight {
  constructor(params) {
    this.https = params.https || false;
    this.cert = params.cert;
    this.key = params.key;
    this.cacert = params.cacert;
    this.baseUrl = params.baseUrl || config.baseUrl;
    this.timeout = params.timeout || config.timeout;
    this.proxy = params.proxy || config.proxy;
    this.rejectUnauthorized = params.rejectUnauthorized || false;
    try {
      if (this.https) {
        this.agent = getHttpsAgent(this.cert, this.key, this.cacert, this.rejectUnauthorized);
      }
      else {
        this.agent = false;
      }
      this.instance = getAxiosInstance(this.baseUrl, this.timeout, this.agent, this.proxy);
    } catch (error) {
      console.error('Error initiating Knight class:\n', error);
    }
  }

  // /ping API endpoint
  /**
  * @returns {Promise<Object>}
  */
  async healthCheck(){
    const Options = {
      url: config.ckHealth[0],
      method: config.ckHealth[1]
    }
    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

  // /ping API endpoint
  /**
  * @returns {Promise<Object>}
  */
  async initiateTicket(sourceId, sourceToken, transationId, payload){
    const Options = {
      url: config.ckInitiateTicket[0],
      method: config.ckInitiateTicket[1],
      headers: {
        'X-Chatops-Source-Id': sourceId,
        'X-Chatops-Source-Api-Token': sourceToken,
        'X-Transaction-Id': transationId,
      },
      data: payload
    }
    try {
      const response = await this.instance(Options);
      return parseAxiosResponse(response);
    } catch(err) {
      throw parseAxiosError(err);
    }
  }

}

module.exports = Knight;
