/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import axios from 'axios';
import {validateSchema} from './validator';

const DEFAULT_HEADERS = {Accept: 'application/ld+json, application/json'};

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
    return axios.post(baseUrl, payload, {headers, httpsAgent});
  }
}
