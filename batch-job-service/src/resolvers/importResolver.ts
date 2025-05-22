import { importQueue } from "../queues/importQueue";
import path from "path";
import fs from "fs";
//import { FileUpload } from "graphql-upload";
//import { FileUpload } from '../types/FileUpload';
import { FileUpload } from "graphql-upload-minimal";

import { v4 as uuidv4 } from "uuid";


interface UploadArgs {
  file: Promise<FileUpload>;
}

export const importResolver = {
  uploadCSV: async (_: any, { file }: UploadArgs) => {
    const { createReadStream, filename } = await file;

    const uniqueName = `${uuidv4()}-${filename}`;
    const filePath = path.join(__dirname, "../../uploads", uniqueName);

    await new Promise<void>((resolve, reject) => {
        const stream = createReadStream().pipe(fs.createWriteStream(filePath));
        stream.on("finish", () => resolve());
        stream.on("error", (error) => reject(error));
      });

    await importQueue.add({ filePath });

    return "File uploaded and processing started.";
  },
};
