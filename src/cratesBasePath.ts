import { homedir } from "os";
import path = require("path");

export default path.join(homedir(), "/.cargo/registry/src");
