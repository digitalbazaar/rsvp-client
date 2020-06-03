/*!
 * Copyright (c) 2020 Digital Bazaar, Inc. All rights reserved.
 */
import {RsvpClient} from '..';

describe('RSVP Client Local', () => {
  describe('Local Validation', () => {
    it('throws validation error if payload is blank',
      async () => {
        const rsvpClient = new RsvpClient();
        const payload = {};

        let result;
        let err;
        try {
          result = await rsvpClient.createRequest({payload});
        } catch(e) {
          err = e;
        }
        should.not.exist(result);
        should.exist(err);
        err.should.be.instanceof(SyntaxError);
        err.errors.should.be.an('array');
        err.errors.should.have.length(1);
        const {errors: [error]} = err;
        error.dataPath.should.equal('');
        error.message.should.equal(
          `should have required property 'ttl'`
        );
      }
    );
  });
});
