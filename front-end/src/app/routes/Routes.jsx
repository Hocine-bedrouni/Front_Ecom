import React, { lazy, Suspense } from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";

import { ROLE_ADMIN, ROLE_CLIENT } from "../constants/rolesConstant";
import * as URL from "../constants/urls/urlFrontEnd";
import { PrivateRoute } from "./PrivateRoute";
import HomeView from "../views/HomeView";
import LoadingView from "../views/LoadingView";
import {NotFoundView} from "../views/NotFoundView";
import AccountActivationView from "../views/AccountActivationView";

const AdminHomeView = lazy(() => import('../views/AdminHomeView'));
const LoginView = lazy(() => import('../views/LoginView'));
const RegisterView = lazy(() => import('../views/RegisterView'));
const UserPersonalDataView = lazy(() => import('../views/UserPersonalDataView'));
const AboutView = lazy(() => import('../views/AboutView'));
const ForgotPasswordView = lazy(() => import('../views/ForgotPasswordView'));
const ResetPasswordView = lazy(() => import('../views/ResetPasswordView'));
const ProductView = lazy(() => import('../views/crudProduct/ProductView'));
const ProductCreateView = lazy(() => import('../views/crudProduct/ProductCreateView'));
const ProductUpdateView = lazy(() => import('../views/crudProduct/ProductUpdateView'));
const ProductDetailsView = lazy(() => import('../views/crudProduct/ProductDetailsView'));
const UserListView = lazy(() => import('../views/crudUser/UserListView'));
const UserDetailsView = lazy(() => import('../views/crudUser/UserDetailsView'));
const CartView = lazy(() => import('../views/CartView'));
const CategoryDetailsView = lazy(() => import('../views/CategoryDetailsView'));
const UpdatePasswordView = lazy(() => import('../views/UpdatePasswordView'));
const MonCompte = lazy(() => import('../views/MonCompte'));
const ProdView = lazy(() => import('../views/ProdView'));
const AddressUpdateView = lazy(() => import('../views/AddressUpdateView'));
const AddPictureView = lazy(() => import('../views/AddPictureView'));


/**
 * Routes of the application
 * with public and private route
 *
 * @author Peter Mollet
 */
const Routes = () => {
  return (
    <RoutesContainer>
      <Route path={URL.URL_HOME} element={<HomeView />} />
      <Route path={URL.URL_NotFound} element={<NotFoundView />} />
      <Route path={URL.URL_ADMIN_HOME} element={
        <Suspense fallback={<LoadingView />}>
          <PrivateRoute roles={[ROLE_ADMIN]}>
            <AdminHomeView />
          </PrivateRoute>
        </Suspense>
      } />
      <Route path={URL.URL_USER_LIST} element={
        <Suspense fallback={<LoadingView />}>
          <PrivateRoute roles={[ROLE_ADMIN]}>
            <UserListView />
          </PrivateRoute>
        </Suspense>
      } />
      <Route path={URL.URL_ABOUT} element={
        <Suspense fallback={<LoadingView />}>
          <AboutView />
        </Suspense>
      } />
      <Route path={URL.URL_LOGIN} element={
        <Suspense fallback={<LoadingView />}>
          <LoginView />
        </Suspense>
      } />
      <Route path={URL.URL_REGISTER} element={
        <Suspense fallback={<LoadingView />}>
          <RegisterView />
        </Suspense>
      } />
      <Route path={URL.URL_ACCOUNT_ACTIVATION} element={
        <Suspense fallback={<LoadingView />}>
          <AccountActivationView />
        </Suspense>
      } />
      <Route path={URL.URL_USER_PERSONAL_DATA} element={
        <Suspense fallback={<LoadingView />}>
          <PrivateRoute roles={[ROLE_CLIENT]}>
            <UserPersonalDataView />
          </PrivateRoute>
        </Suspense>
      } />
      <Route path={URL.URL_FORGOT_PASSWORD} element={
        <Suspense fallback={<LoadingView />}>
          <ForgotPasswordView />
        </Suspense>
      } />
      <Route path={URL.URL_RESET_PASSWORD} element={
        <Suspense fallback={<LoadingView />}>
          <ResetPasswordView />
        </Suspense>
      } />
      <Route path={URL.URL_PRODUCT_ADD} element={
        <Suspense fallback={<LoadingView />}>
          <ProductCreateView />
        </Suspense>
      } />
      <Route path={URL.URL_PRODUCT_UPDATE} element={
        <Suspense fallback={<LoadingView />}>
          <ProductUpdateView />
        </Suspense>
      } />
      <Route path={URL.URL_PRODUCT_DETAILS} element={
        <Suspense fallback={<LoadingView />}>
          <ProductDetailsView />
        </Suspense>
      } />
      <Route path={URL.URL_USER_DETAILS} element={
        <Suspense fallback={<LoadingView />}>
          <UserDetailsView />
        </Suspense>
      } />
      <Route path={URL.URL_CART} element={
        <Suspense fallback={<LoadingView />}>
          <CartView />
        </Suspense>
      } />
      <Route path={URL.URL_CATEGORY_DETAILS} element={
        <Suspense fallback={<LoadingView />}>
          <CategoryDetailsView />
        </Suspense>
      } />
      <Route path={URL.URL_FORGOT_PASSWORD} element={
        <Suspense fallback={<LoadingView />}>
          <ForgotPasswordView />
        </Suspense>
      } />

      <Route path={URL.URL_UPDATE_PASSWORD} element={
        <Suspense fallback={<LoadingView />}>
          <PrivateRoute roles={[ROLE_ADMIN, ROLE_CLIENT]}>
            <UpdatePasswordView />
          </PrivateRoute>
        </Suspense>
      } />
      <Route path={URL.URL_MY_ACCOUNT} element={
        <Suspense fallback={<LoadingView />}>
          <PrivateRoute roles={[ROLE_CLIENT, ROLE_ADMIN]}>
            <MonCompte />
          </PrivateRoute>
        </Suspense>
      } />
      <Route path={URL.URL_PRODUCT} element={
        <Suspense fallback={<LoadingView />}>
          <ProdView />
        </Suspense>
      } />
      <Route path={URL.URL_PRODUCTLIST} element={
        <Suspense fallback={<LoadingView />}>
          <PrivateRoute roles={[ROLE_ADMIN]}>
            <ProductView />
          </PrivateRoute>
        </Suspense>
      } />
      <Route path={URL.URL_ADDRESS_UPDATE} element={
        <Suspense fallback={<LoadingView />}>
          <PrivateRoute roles={[ROLE_CLIENT, ROLE_ADMIN]}>
            <AddressUpdateView />
          </PrivateRoute>
        </Suspense>
      } />
       <Route path={URL.URL_ADD_PICTURE} element={
        <Suspense fallback={<LoadingView />}>
          <PrivateRoute roles={[ROLE_ADMIN]}>
            <AddPictureView />
          </PrivateRoute>
        </Suspense>
      } />

    </RoutesContainer>
  );
};

export default Routes;
