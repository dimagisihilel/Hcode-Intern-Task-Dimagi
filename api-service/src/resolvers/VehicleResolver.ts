// 🚗 GraphQL Resolvers for Vehicle Entity

import { Vehicle } from "../entities/Vehicle";
import { AppDataSource } from "../ormconfig";
import { VehicleInput } from "../types/VehicleInput";

// 🧮 Helper: Calculate vehicle age from manufactured_date
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
  // 📥 Query Resolvers
  Query: {
    // 🔍 Get paginated vehicles sorted by manufactured_date
    getVehicles: async (_: any, { page }: { page: number }) => {
      console.log(`📦 Fetching vehicles - Page: ${page}`);
      const repo = AppDataSource.getRepository(Vehicle);
      const vehicles = await repo.find({
        order: { manufactured_date: "ASC" },
        skip: (page - 1) * 100,
        take: 100,
      });
      console.log(`✅ Found ${vehicles.length} vehicles`);
      return vehicles;
    },

    // 🔍 Search vehicles by car_model prefix
    searchVehicles: async (_: any, { model }: { model: string }) => {
      console.log(`🔍 Searching for vehicles with model starting: ${model}`);
      const repo = AppDataSource.getRepository(Vehicle);
      const results = await repo
        .createQueryBuilder("vehicle")
        .where("vehicle.car_model LIKE :model", { model: `${model}%` })
        .getMany();
      console.log(`🔎 ${results.length} match(es) found`);
      return results;
    },

    // 📄 Get vehicle by ID
    getVehicleById: async (_: any, { id }: { id: number }) => {
      console.log(`🔎 Fetching vehicle with ID: ${id}`);
      const repo = AppDataSource.getRepository(Vehicle);
      const vehicle = await repo.findOneBy({ id });
      if (!vehicle) {
        console.warn(`⚠️ Vehicle not found with ID: ${id}`);
      }
      return vehicle;
    },
  },

  // ✍️ Mutation Resolvers
  Mutation: {
    // ➕ Create a new vehicle record
    createVehicle: async (_: any, { input }: { input: Vehicle }) => {
      console.log("🆕 Creating vehicle:", input);
      const repo = AppDataSource.getRepository(Vehicle);
      const vehicle = repo.create({
        ...input,
        age_of_vehicle: calculateAge(input.manufactured_date),
      });
      const saved = await repo.save(vehicle);
      console.log("✅ Vehicle created:", saved.id);
      return saved;
    },

    // ✏️ Update existing vehicle
    updateVehicle: async (
      _: any,
      { id, input }: { id: number; input: VehicleInput }
    ) => {
      console.log(`✏️ Updating vehicle ID ${id} with data:`, input);
      const repo = AppDataSource.getRepository(Vehicle);
      const updatedData = {
        ...input,
        age_of_vehicle: calculateAge(input.manufactured_date),
      };
      await repo.update(id, updatedData);
      const updatedVehicle = await repo.findOneBy({ id });
      console.log(`✅ Vehicle updated:`, updatedVehicle);
      return updatedVehicle;
    },

    // ❌ Delete vehicle by ID
    deleteVehicle: async (_: any, { id }: { id: number }) => {
      console.log(`❌ Deleting vehicle with ID: ${id}`);
      const repo = AppDataSource.getRepository(Vehicle);
      const result = await repo.delete(id);
      if (result.affected === 0) {
        console.warn(`⚠️ No vehicle found to delete with ID: ${id}`);
      } else {
        console.log(`✅ Vehicle deleted: ID ${id}`);
      }
      return true;
    },
  },
};
