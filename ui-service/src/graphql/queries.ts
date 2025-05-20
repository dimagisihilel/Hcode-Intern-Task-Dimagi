import { gql } from "@apollo/client";

export const GET_VEHICLES = gql`
  query GetVehicles($page: Int!) {
    getVehicles(page: $page) {
      id
      first_name
      last_name
      email
      car_make
      car_model
      vin
      manufactured_date
      age_of_vehicle
    }
  }
`;


export const GET_VEHICLE_BY_ID = gql`
  query GetVehicleById($id: Int!) {
    getVehicleById(id: $id) {
      id
      first_name
      last_name
      email
      car_make
      car_model
      vin
      manufactured_date
      age_of_vehicle
    }
  }
`;
