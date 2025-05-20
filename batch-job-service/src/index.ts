import { importQueue } from "./queues/importQueue";
import path from "path";

const testFilePath = path.join(__dirname, "..", "sample.csv");

importQueue.add({ filePath: testFilePath });

console.log("📨 Import job added to queue.");
