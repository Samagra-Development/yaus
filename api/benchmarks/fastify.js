import { check } from "k6";
import http from "k6/http";

const baseURL = "http://localhost:8888";

export default function () {
    let response = http.get(baseURL, { redirects: 0 });
    check(response, {
        "is status 200": (r) => r.status === 200,
    });
}
