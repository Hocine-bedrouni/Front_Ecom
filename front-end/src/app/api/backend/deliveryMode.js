import apiBackEnd from "./api.Backend";

export function getAllDeliveryModes() {
  return apiBackEnd.get('/no-role/delivery-modes');
}