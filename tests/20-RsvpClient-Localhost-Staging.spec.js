/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import {RsvpClient} from '..';
import https from 'https';
import mockData from './mock-data.js';

const mockPayload = mockData.payloads.createRequest;

const rsvpHost = process.env.RSVP_HOST;
const rsvpPort = process.env.RSVP_PORT;
let hostname;
let rejectUnauthorized = false;
let testType = 'localhost';

if(rsvpPort === '443') {
  hostname = `https://${rsvpHost}`;
  rejectUnauthorized = true;
  testType = 'Staging';
} else {
  hostname = `https://${rsvpHost}:${rsvpPort}`;
}

const httpsAgent = new https.Agent({rejectUnauthorized});

describe(`RSVP Client ${testType}`, () => {
  describe('Server Validation', () => {
    it(`successfully gets response with a URL`, async () => {
      const rsvpClient = new RsvpClient({httpsAgent, hostname});
      const payload = JSON.parse(JSON.stringify(mockPayload));

      let result;
      let err;
      try {
        result = await rsvpClient.createRequest({
          payload, localValidation: false
        });
      } catch(e) {
        err = e;
      }
      should.not.exist(err);
      should.exist(result);
      result.data.should.be.an('object');
      result.data.should.include.keys(['url']);
      result.data.url.should.be.a('string');
    });
  });
});
