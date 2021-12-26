import http from "k6/http";
import { check } from "k6";

const baseURL = "http://localhost:8888";

export default function () {
  let response = http.get(`${baseURL}/sr/chakshu`, { redirects: 0 });
  check(response, {
    "is status 302": (r) => r.status === 302,
  });
}
