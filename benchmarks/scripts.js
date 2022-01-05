import { check } from "k6";
import http from "k6/http";

const baseURL = "https://x.samagra.io";

export default function () {
  let response = http.get(`${baseURL}/sr/google`, { redirects: 0 });
  check(response, {
    "is status 302": (r) => r.status === 302,
    "is redirect location https://www.google.com": (r) => r.headers.Location === "https://www.google.com"
  });
}
