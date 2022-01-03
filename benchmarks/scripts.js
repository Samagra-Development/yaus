import { check } from "k6";
import http from "k6/http";

const baseURL = "http://x.samagra.io";

export default function () {
  let response = http.get(`${baseURL}/sr/google`, { redirects: 0 });
  check(response, {
    "is status 302": (r) => r.status === 302,
  });
}
