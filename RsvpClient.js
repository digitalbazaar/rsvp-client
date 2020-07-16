/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import {httpClient, DEFAULT_HEADERS} from '@digitalbazaar/http-client';
import {validateSchema} from './validator';

export class RsvpClient {
  constructor({
    url = '/rsvps',
    defaultHeaders,
    hostname,
    httpsAgent,
  } = {}) {
    this.httpsAgent = httpsAgent;
    this.defaultHeaders = {...DEFAULT_HEADERS, ...defaultHeaders};
    this.baseUrl = `${hostname || ''}${url}`;
  }

  async createRequest({payload, localValidation = true} = {}) {
    // validateSchema throws if not valid
    if(localValidation) {
      await validateSchema({payload});
    }
    const {baseUrl, defaultHeaders: headers, httpsAgent} = this;
    const result = await httpClient.post(baseUrl, {
      headers, json: payload, agent: httpsAgent
    });
    return result.data;
  }

  // TODO: implement additional error handling and timeout
  async getResponse({url} = {}) {
    return new Promise((resolve, reject) => {
      const eventStream = new EventSource(url);
      eventStream.onmessage = event => {
        let data;
        try {
          (data = JSON.parse(event.data));
        } catch(e) {
          eventStream.close();
          return reject(e);
        }
        eventStream.close();
        resolve(data);
      };

      eventStream.onerror = error => {
        eventStream.close();
        reject(error);
      };
    });
  }
}
