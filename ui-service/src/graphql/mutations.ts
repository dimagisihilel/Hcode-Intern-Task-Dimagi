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