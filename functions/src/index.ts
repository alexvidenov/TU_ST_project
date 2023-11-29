import * as functions from "firebase-functions";

import init = require("./services");

require("./moodle_sync/index");

export const api = functions.https.onRequest(init.app);
