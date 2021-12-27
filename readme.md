# Yet Another URL Shortner

## Features

1. GraphQL based (Powered by [Hasura](https://github.com/hasura))
2. API to Generate URLs in bulk or templates.
3. Tracking clicks.

## API Docs

[Postman Collection](https://www.getpostman.com/collections/5f24dd9ac134e00eeb4d)

## Benchmarks

Can be reproduced by - `k6 run --duration 30s --vus 400 scripts.js`

```

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: scripts.js
     output: -

  scenarios: (100.00%) 1 scenario, 400 max VUs, 1m0s max duration (incl. graceful stop):
           * default: 400 looping VUs for 30s (gracefulStop: 30s)


running (0m30.0s), 000/400 VUs, 97200 complete and 0 interrupted iterations
default ✗ [======================================] 400 VUs  30s

     ✓ is status 302

     checks.........................: 100.00% ✓ 97200       ✗ 0
     data_received..................: 33 MB   1.1 MB/s
     data_sent......................: 8.7 MB  291 kB/s
     http_req_blocked...............: avg=95.62µs  min=1µs     med=2µs      max=119.98ms p(90)=4µs      p(95)=5µs
     http_req_connecting............: avg=91.98µs  min=0s      med=0s       max=119.92ms p(90)=0s       p(95)=0s
     http_req_duration..............: avg=123.18ms min=73.55ms med=108.91ms max=650.22ms p(90)=161.27ms p(95)=234.77ms
       { expected_response:true }...: avg=123.18ms min=73.55ms med=108.91ms max=650.22ms p(90)=161.27ms p(95)=234.77ms
     http_req_failed................: 0.00%   ✓ 0           ✗ 97200
     http_req_receiving.............: avg=59.01µs  min=16µs    med=33µs     max=27.95ms  p(90)=60µs     p(95)=83µs
     http_req_sending...............: avg=24.14µs  min=5µs     med=10µs     max=8.82ms   p(90)=18µs     p(95)=31µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=123.09ms min=73.28ms med=108.85ms max=649.58ms p(90)=161.2ms  p(95)=234.72ms
     http_reqs......................: 97200   3238.011753/s
     iteration_duration.............: avg=123.4ms  min=73.64ms med=109.03ms max=650.3ms  p(90)=161.39ms p(95)=235.59ms
     iterations.....................: 97200   3238.011753/s
     vus............................: 400     min=400       max=400
     vus_max........................: 400     min=400       max=400
```
