import fs from 'fs';
import { parse } from 'fast-csv';

export const parseCSV = (filePath: string): Promise<any[]> =>
  new Promise((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(parse({ headers: true }))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
