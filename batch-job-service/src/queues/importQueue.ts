import Queue from "bull";
import { importCSVJob } from "../jobs/importJob";

export const importQueue = new Queue("csv-import", {
  redis: { port: 6379, host: "127.0.0.1" },
});

importQueue.process(importCSVJob);
