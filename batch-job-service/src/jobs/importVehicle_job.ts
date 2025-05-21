import { Job } from 'bull';
import { parseCSV } from '../utils/csvParser';
import { AppDataSource } from '../data-source';
import { Vehicle } from '../entities/Vehicle';

export const importVehicleJob = async (job: Job) => {
  const { filePath } = job.data;
  const records = await parseCSV(filePath);
  const repo = AppDataSource.getRepository(Vehicle);
  await repo.save(records);
};
