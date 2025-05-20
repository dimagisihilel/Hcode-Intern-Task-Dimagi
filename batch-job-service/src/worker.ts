import { importQueue } from "./queues/importQueue";
import { processImportJob } from "./jobs/importJob";

importQueue.process(processImportJob);

importQueue.process("import", async (job) => {
    const { fileName } = job.data;
    console.log("Processing CSV file:", fileName);
    // Parse CSV, calculate age, save to DB
  });

console.log("📦 Batch Job Worker running...");
