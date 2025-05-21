import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import path from 'path';
import { importVehicleQueue } from '../queues/importVehicle_queue';

export const importResolver = {
  Upload: GraphQLUpload,
  Mutation: {
    importVehicles: async (_: any, { file }: any) => {
      const { createReadStream, filename } = await file;
      const filePath = path.join(__dirname, '../uploads', filename);
      await new Promise((res) =>
        createReadStream()
          .pipe(createWriteStream(filePath))
          .on('finish', res)
      );
      await importVehicleQueue.add('csv-import', { filePath });
      return true;
    },
  },
};
