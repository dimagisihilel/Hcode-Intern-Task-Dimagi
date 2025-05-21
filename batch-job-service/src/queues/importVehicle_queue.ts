import Queue from 'bull';
import { importVehicleJob } from '../jobs/importVehicle_job';

export const importVehicleQueue = new Queue('import-vehicle', process.env.REDIS_URL!);
importVehicleQueue.process('csv-import', importVehicleJob);
