import * as dotenv from "dotenv";

import FileController from "./controller/FileController";

dotenv.config();


FileController.removeDuplicate().then(r => console.log(r))