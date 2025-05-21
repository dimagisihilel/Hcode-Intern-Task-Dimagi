import { Vehicle } from "../entities/Vehicle";
import { AppDataSource } from "../ormconfig";
import { VehicleInput } from "../types/VehicleInput";

// Helper function to calculate age
function calculateAge(dateString: string): number {
  const manufactureDate = new Date(dateString);
  const now = new Date();
  let age = now.getFullYear() - manufactureDate.getFullYear();
  const m = now.getMonth() - manufactureDate.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < manufactureDate.getDate())) {
    age--;
  }
  return age;
}

export const VehicleResolver = {
  Query: {
    getVehicles: async (_: any, { page }: { page: number }) => {
      const repo = AppDataSource.getRepository(Vehicle);
      return await repo.find({
        order: { manufactured_date: "ASC" },
        skip: (page - 1) * 100,
        take: 100,
      });
    },
    searchVehicles: async (_: any, { model }: { model: string }) => {
      const repo = AppDataSource.getRepository(Vehicle);
      return await repo
        .createQueryBuilder("vehicle")
        .where("vehicle.car_model LIKE :model", { model: `${model}%` })
        .getMany();
    },
    getVehicleById: async (_: any, { id }: { id: number }) => {
      const repo = AppDataSource.getRepository(Vehicle);
      return await repo.findOneBy({ id });
    },    
 
  },

  Mutation: {
    createVehicle: async (_: any, { input }: { input: Vehicle }) => {
      const repo = AppDataSource.getRepository(Vehicle);
      const vehicle = repo.create({
        ...input,
        age_of_vehicle: calculateAge(input.manufactured_date),
      });
      return await repo.save(vehicle);
    },

    updateVehicle: async (_: any, { id, input }: { id: number; input: VehicleInput }) => {
      const repo = AppDataSource.getRepository(Vehicle);
      const updatedData = {
        ...input,
        age_of_vehicle: calculateAge(input.manufactured_date),
      };
      await repo.update(id, updatedData);
      return await repo.findOneBy({ id });
    },
    

    deleteVehicle: async (_: any, { id }: { id: number }) => {
      const repo = AppDataSource.getRepository(Vehicle);
      await repo.delete(id);
      return true;
    },
  },
};

