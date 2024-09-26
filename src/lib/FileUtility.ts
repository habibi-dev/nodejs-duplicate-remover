import fs from "node:fs";
import path from "node:path";
import crypto from "crypto";
import {get, isArray, set} from "lodash";

export class FileUtility {

    static filesPath(dirPath: string, arrayOfFiles: string[] = []): string[] {

        const files = fs.readdirSync(dirPath);

        files.forEach((file) => {
            const filePath = path.join(dirPath, file);
            if (fs.statSync(filePath).isDirectory()) {
                arrayOfFiles = FileUtility.filesPath(filePath, arrayOfFiles);
            } else {
                arrayOfFiles.push(filePath);
            }
        });

        return arrayOfFiles;
    }

    static async filesHash(arrayOfFiles: string[]) {
        const files = {};

        for (const file of arrayOfFiles) {
            try {
                const hash = crypto.createHash('sha256');
                hash.update(fs.readFileSync(file));

                const hashFile = hash.digest('hex');
                const list = get(files, hashFile, []) as string[];

                list.push(file);
                set(files, hashFile, list);
            } catch (error) {
                console.error('Error while processing file:', error);
            }
        }

        return files;
    }

    static removeItem(path: string | string[]) {
        try {
            if (isArray(path)) {
                for (const item of path) fs.unlinkSync(item);
            } else {
                fs.unlinkSync(path);
            }
        } catch (e) {
            console.error(e);
        }
    }
}
