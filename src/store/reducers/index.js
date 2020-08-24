import { combineReducers } from "redux";

import selectedChannel from "./selectedChannelStore";

const tvApp = combineReducers({
  selectedChannel,
});

export default tvApp;
