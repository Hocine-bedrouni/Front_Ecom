import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const validationSchema = Yup.object().shape({
    nom: Yup.string()
        .min(5, "trop petit")
        .max(50, "trop long!")
        .required("Ce champ est obligatoire"),
    prenom: Yup.string()
        .min(2, "trop petit")
        .max(10, "trop long!")
        .required("Ce champ est obligatoire"),
    email: Yup.string()
        .email("email invalide")
        .required("l'email est obligatoire"),
    password: Yup.string()
        .required("Mot de passe est obligatoire")
        .min(4, "Mot de passe doit être plus grand que 4 caractères")
        .max(10, "Mot de passe doit être plus petit que 10 caractères"),
    confirmPassword: Yup.string()
        .required("Confirmation de mot de passe est obligatoire")
        .oneOf(
            [Yup.ref("password"), null],
            "Le mot de passe de confirmation ne correspond pas"
        ),

});



const UserUpdateView = ({ user, setIsupdate }) => {

    const navigate = useNavigate();


    const initialValues = {
        id: user.idAccount,
        nom: user.name,
        prenom: user.firstName,
        email: user.email,
        password: "",
        confirmPassword: "",

    };


    let config = {
        headers: {
            'Authorization': 'Bearer ' + localStorage.token
        }
    }


    const handleSubmit = (values) => {
        // Ici il faut soit le role ADMIN ou CLIENT     
        axios
            .post("http://localhost:9000/api/shopping-online/no-role/update-account-dto/" + `${user.id}`, values)
            .then((response) => {

                if (response.status === 202) {
                    alert("l'utilisateur a bien été modifié")
                    navigate("/user");
                    setIsupdate(false)
                }
            })
    }




    return (
        <div className="container">
            {
                <h1>{user.name}</h1>
            }
            <div className="row">
                <div className="col-md-6 offset-md-3 pt-3">
                    <h1 className="text-center">Modifier utilisateur</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ resetForm }) => (
                            <Form>
                                <div className="form-group mb-3">
                                    <label htmlFor="prenom">
                                        Prénom :
                                    </label>
                                    <Field
                                        type="text"
                                        id="prenom"
                                        name="prenom"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="prenom"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="nom">
                                        Nom :
                                    </label>
                                    <Field
                                        type="text"
                                        id="nom"
                                        name="nom"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="nom"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">
                                        Email :
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="password">
                                        Mot de passe :
                                    </label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="confirmPassword">
                                        Confirmer le mot de
                                        passe :
                                    </label>
                                    <Field
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="small"
                                        className="text-danger"
                                    />
                                </div>

                                <div className="form-group d-flex justify-content-end gap-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="btn btn-danger"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default UserUpdateView;