# RSVP Client _(rsvp-client)_

> Client repository for RSVP.

## Table of Contents

- [Install](#install)
- [Vue Usage](#vue-usage)

## Install

In `package.json`:

```json
"dependencies": {
  "rsvp-client": "github:digitalbazaar/rsvp-client#initial"
}
```

## Vue Usage

```js
import {RsvpClient} from 'rsvp-client';

// Getting URL ->
asyncComputed: {
  async getRequestUrl() {
    const rsvpClient = new RsvpClient();
    const results = await rsvpClient.createRequest({payload});
    return results.data.url;
  }
}
```
