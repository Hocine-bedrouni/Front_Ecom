import { URL_BACK_AUTHENTICATE, URL_BACK_PRODUCTLIST, URL_BACK_UPDATE_PRODUCT, URL_BACK_USERLIST, URL_BACK_ADD_PRODUCT, URL_BACK_DELETE_PRODUCT, URL_BACK_PRODUCT_BY_ID } from '../../constants/urls/urlBackEnd';
import { URL_BACK_FORGETPASS } from '../../constants/urls/urlBackEnd';
import { URL_BACK_UPDATEPASS, URL_BACK_RESETPASS } from '../../constants/urls/urlBackEnd';
import { URL_BACK_REGISTER } from '../../constants/urls/urlBackEnd';
import * as URL from "../../constants/urls/urlBackEnd";
import apiBackEnd from './api.Backend';


export function authenticate(values) {
    return apiBackEnd.post(URL_BACK_AUTHENTICATE, values);
}
export function forgetpass(values) {
    return apiBackEnd.post(URL_BACK_FORGETPASS, values);
}
export function resetPass(values) {
    return apiBackEnd.post(URL_BACK_RESETPASS, values);
}
export function updatePass(values) {
    return apiBackEnd.put(URL_BACK_UPDATEPASS, values);
}
export function register(values) {
    return apiBackEnd.post(URL_BACK_REGISTER, values);
}

export function activateAccount(token) {
    return apiBackEnd.post(URL.URL_BACK_ACTIVATE_ACCOUNT, {'token': token})
}

export function createAddress(accountId, values) {
    return apiBackEnd.post(URL.URL_BACK_CREATE_ADDRESS.replace(':accountId', accountId), values);
}

export function fetchAccount(id) {
    return apiBackEnd.get(URL.URL_BACK_GET_ACCOUNT + id)
}

export function updateAccount(id, account) {
    return apiBackEnd.put(URL.URL_BACK_UPDATE_ACCOUNT + id, account)
}

export function fetchProduitListe() {
    return apiBackEnd.get(URL_BACK_PRODUCTLIST);
}

export function fecthUserListe() {
    return apiBackEnd.get(URL_BACK_USERLIST);
}

export function fetchAddresses(accountId) {
    return apiBackEnd.get(URL.URL_BACK_GET_ADDRESSES.replace(':accountId', accountId));
}

export function fetchAddress(accountId, addressId) {
    return apiBackEnd.get(URL.URL_BACK_GET_ADDRESS.replace(':accountId', accountId).replace(':addressId', addressId));
}

export function updateAddress(accountId, addressId, values) {
    return apiBackEnd.put(URL.URL_BACK_UPDATE_ADDRESS.replace(':accountId', accountId).replace(':addressId', addressId), values);
}

export function addProduct(values){
    return apiBackEnd.post(URL_BACK_ADD_PRODUCT, values);
}

export function deleteProduct(id) {
    return apiBackEnd.delete(URL_BACK_DELETE_PRODUCT + id);
}

export function getByIdProduct(id) {
    return apiBackEnd.get(URL_BACK_PRODUCT_BY_ID + id)
}

export function deleteUser(id) {
    return apiBackEnd.delete(URL.URL_BACK_DELETE_ACCOUNT + id)
}

export function updateProduct(id, values) {
    return apiBackEnd.put(URL.URL_BACK_UPDATE_PRODUCT + id, values)
}


