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

```html
<!-- Example Call -->
<template>
  <div>
    URL: {{getRequestUrl}}
  </div>
</template>
```

```js
import {RsvpClient} from '@digitalbazaar/rsvp-client';

const payload = {
  type: 'someType'
};

// Getting URL ->
export default {
  asyncComputed: {
    async getRequestUrl() {
      const rsvpClient = new RsvpClient();
      const result = await rsvpClient.createRequest({payload});
      return result.url;
    }
  }
}
```
