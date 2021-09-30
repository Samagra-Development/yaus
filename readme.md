# Yet Another URL Shortner

## Features
1. GraphQL based (Powered by [Hasura](https://github.com/hasura))
2. API to Generate URLs in bulk or templates.
3. Tracking clicks.

## Bottlenecks
1. PSQL is directly updated on clicks so it mostly solves the problem of generating URLs in bulk but will not scale beyond more than 1k clicks per second.
