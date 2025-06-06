//Contains GraphQL queries and mutations used by the frontend.

import { gql } from "@apollo/client";


export const ADD_VEHICLE = gql`
  mutation AddVehicle($input: VehicleInput!) {
    createVehicle(input: $input) {
      id
      first_name
      last_name
      email
      car_make
      car_model
      vin
      manufactured_date
    }
  }
`;



export const UPDATE_VEHICLE = gql`
  mutation UpdateVehicle($id: Int!, $input: VehicleInput!) {
    updateVehicle(id: $id, input: $input) {
      id
      first_name
      last_name
      email
      car_make
      car_model
      vin
      manufactured_date
    }
  }
`;

export const DELETE_VEHICLE = gql`
  mutation DeleteVehicle($id: Int!) {
    deleteVehicle(id: $id)
  }
`;


export const UPLOAD_CSV = gql`
  mutation UploadCSV($file: Upload!) {
    uploadCSV(file: $file)
  }
`;
