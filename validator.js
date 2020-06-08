/*
 * Copyright (c) 2019-2020 Digital Bazaar, Inc. All rights reserved.
 */
import rsvpSpec from 'rsvp-spec';

const Ajv = require('ajv');
const ajv = new Ajv({verbose: true, removeAdditional: true});
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
