import { Job } from "bull";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import axios from "axios";

function calculateAge(dateString: string): number {
  const manufactureDate = new Date(dateString);
  const age = new Date().getFullYear() - manufactureDate.getFullYear();
  return age;
}

export const processImportJob = async (job: Job) => {
  const filePath = job.data.filePath;

  const vehicles: any[] = [];

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        vehicles.push({
          ...row,
          manufactured_date: row.manufactured_date,
          age_of_vehicle: calculateAge(row.manufactured_date),
        });
      })
      .on("end", async () => {
        for (const vehicle of vehicles) {
          await axios.post(`${process.env.API_BASE_URL}`, {
            query: `
              mutation CreateVehicle($input: VehicleInput!) {
                createVehicle(input: $input) {
                  id
                }
              }
            `,
            variables: { input: vehicle },
          });
        }
        console.log("✅ All vehicles imported.");
        resolve();
      })
      .on("error", (err) => {
        console.error("❌ Error importing vehicles:", err);
        reject(err);
      });
  });
};
