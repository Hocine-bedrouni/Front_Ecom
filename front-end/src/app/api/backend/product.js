import apiBackEnd from "./api.Backend";

export function getAllProductsByIdIn(idList) {
  return apiBackEnd.get(`/no-role/all-product-by-id-in?idList=${idList.join(',')}`);
}