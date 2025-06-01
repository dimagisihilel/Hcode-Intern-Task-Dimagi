//Contains input types for GraphQL (similar to API service).

export interface FileUpload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => NodeJS.ReadableStream;
  }
  