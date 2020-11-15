import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";

const pubnub = new PubNub({
  publishKey: "pub-c-aefae728-45a7-4251-9bc5-2748793d0464",
  subscribeKey: "sub-c-2f65dd9c-2741-11eb-862a-82af91a3b28d",
});

const leaveApplication = () => {
  pubnub.unsubscribeAll();
};

window.addEventListener("beforeunload", leaveApplication);

ReactDOM.render(
  <React.StrictMode>
    <PubNubProvider client={pubnub}>
      <App />
    </PubNubProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
