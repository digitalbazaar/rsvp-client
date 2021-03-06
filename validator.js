/*
 * Copyright (c) 2019-2020 Digital Bazaar, Inc. All rights reserved.
 */
import rsvpSpec from 'rsvp-spec';

import Ajv from 'ajv';
const ajv = new Ajv({verbose: true, strict: 'log'});
ajv.addSchema(rsvpSpec.rsvp, 'rsvp.json');

// throws if validation fails
export async function validateSchema({payload}) {
  // validate payload against JSON schema
  const valid = ajv.validate(
    {$ref: 'rsvp.json#/schemas/document'},
    payload
  );
  if(valid) {
    return true;
  }
  const error = new SyntaxError('Validation error.');
  error.errors = ajv.errors;
  throw error;
}
