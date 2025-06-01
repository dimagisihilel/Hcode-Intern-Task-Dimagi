//Contains actual Bull.js job processors that perform import/export tasks.

import { Job } from "bull";
import { AppDataSource } from "../config/data-source";
import { Vehicle } from "../entities/Vehicle";
import { parseCSV } from "../utils/csvParser";

export const importCSVJob = async (job: Job) => {
  const { filePath } = job.data;

  const repo = AppDataSource.getRepository(Vehicle);
  const vehicles = await parseCSV(filePath);

  for (const data of vehicles) {
    const vehicle = repo.create(data);
    await repo.save(vehicle);
  }
};
