import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PostHogProvider} from 'posthog-js/react'
import posthog from 'posthog-js'

import "antd/dist/antd.css";
import "app/styles/main.css";
import "app/styles/responsive.css";

import App from "app/app";

const posthogKey = process.env['NX_REACT_APP_PUBLIC_POSTHOG_KEY'];
const posthogHost = process.env['NX_REACT_APP_PUBLIC_POSTHOG_HOST'];

if (posthogKey && posthogHost) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
  });
} else {
  console.error("Missing PostHog environment variables");
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
    </BrowserRouter>
  </StrictMode>
);
