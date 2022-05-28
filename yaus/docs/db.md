### Link

Core Fields:

- id: The unique identifier for the record.
- url: string - URL to which the user need to be redirected
- hashid: number - To the user an alphanumeric hashid is shown. [This](https://www.npmjs.com/package/hashids) package is used to generate the hashid from a number. for example `1` => `qR`, `2` => `qS`. For example - yaus.xyz/qR `qR` is the hashid. Unique.
- customHashid: string - for yaus.xyz/google Here `google` is the customHashid. Unique.

Metrics:

- clicks - number - number of clicks on the link. Currently the only parameter that is used for metrics.

Filtering fields:

- userid: uuid - for filtering users's urls.
- tags: string[] - for filtering users's urls.
- project: uuid - for filtering project's urls.

#### TODO

- [ ] Move clicks from Redis to DB periodically.
- [ ] Events to be added (PostHog)
  - [ ] Click
  - [ ] Side effects triggered successfully
- [ ] Third party side effect management
