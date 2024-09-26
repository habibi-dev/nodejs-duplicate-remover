import {FileUtility} from "../lib/FileUtility";
import {filter, get} from "lodash";

export default class FileController {
    static async removeDuplicate() {
        const dirs = get(process, "env.DIRS", "files").split(",");
        let files: string[] = [];
        let itemRemove = 0;

        dirs.forEach((dir) => files = files.concat(FileUtility.filesPath(dir)));

        const filesHash = await FileUtility.filesHash(files);

        filter(filesHash, (filesHash: string[]) => filesHash.length > 1).forEach((file: string[]) => {
            file.pop()

            FileUtility.removeItem(file);

            itemRemove += file.length;
        })

        return `Item Removed ${itemRemove}`
    }
}