import Bull from "bull";
import dotenv from "dotenv";

dotenv.config();

export const importQueue = new Bull("vehicle-import", process.env.REDIS_URL!);

