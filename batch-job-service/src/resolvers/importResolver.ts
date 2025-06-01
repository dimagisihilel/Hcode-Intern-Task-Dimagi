// 📦 GraphQL Resolver for handling CSV import via Bull.js job queue

import { importQueue } from "../queues/importQueue";
import path from "path";
import fs from "fs";
import { FileUpload } from "graphql-upload-minimal";
import { v4 as uuidv4 } from "uuid";

interface UploadArgs {
  file: Promise<FileUpload>;
}

export const importResolver = {
  /**
   * 🧾 uploadCSV
   * Handles file upload, stores it in the /uploads folder, and adds a Bull job to process the file.
   */
  uploadCSV: async (_: any, { file }: UploadArgs): Promise<string> => {
    try {
      // Await the file stream and filename from the upload
      const { createReadStream, filename } = await file;

      // Generate a unique filename to avoid conflicts
      const uniqueName = `${uuidv4()}-${filename}`;
      const filePath = path.join(__dirname, "../../uploads", uniqueName);

      console.log(`📁 Saving uploaded file: ${uniqueName}`);

      // Save the uploaded file to disk
      await new Promise<void>((resolve, reject) => {
        const stream = createReadStream().pipe(fs.createWriteStream(filePath));
        stream.on("finish", () => {
          console.log("✅ File saved successfully.");
          resolve();
        });
        stream.on("error", (error) => {
          console.error("❌ Error while saving file:", error);
          reject(error);
        });
      });

      // Add the file path to Bull job queue for processing
      console.log("📨 Adding job to importQueue with filePath:", filePath);
      await importQueue.add({ filePath });

      return "✅ File uploaded and processing started.";
    } catch (error) {
      console.error("❌ Upload failed:", error);
      throw new Error("Upload failed. Please try again.");
    }
  },
};
