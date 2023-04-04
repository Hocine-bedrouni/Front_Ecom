import React from 'react';
import CardMonCompte from '../components/CardMonCompte';
import { URL_ADDRESS_UPDATE, URL_USER_PERSONAL_DATA } from '../constants/urls/urlFrontEnd';

const MonCompte = () => {

const data = [{
    id:1,
    titre: "Vos Commandes",
    urlImage: "",
    text: "Suivre, retourner ou acheter à nouvau.", 
    to:"/commande"

},

{
    id:2,
    titre: "Connexion & Sécurité",
    urlImage: "",
    text: "Modifier l'adresse email, le nom et le numero de téléphone mobile.",
    to:URL_USER_PERSONAL_DATA

},
{
    id:3,
    titre: "Adresses",
    urlImage: "",
    text: "Modifier les adresses et les préfèrences des livraions, des commandes et des cadeaux",
    to:URL_ADDRESS_UPDATE

},
{
    id:4,
    titre: "Vos Paiments",
    urlImage: "",
    text: "Gérer les modes de paiments et les paramètres, afficher les soldes et les offres.",
    to:"/paiment"

},
]


    return (
        <div className='flex flex-col mx-auto my-20 w-2/3 h-auto'>
          <div className=' grid lg:grid-cols-2 sm:grid-rows-4 sm:grid-cols-1 lg:grid-rows-2 gap-7 align-item-center'>
            {data?.map((item) => 
                 <CardMonCompte key={item.id} item={item}/> 
             )}
               
                {/* <CardMonCompte  />
                <CardMonCompte  />
                <CardMonCompte  /> */}


              
           </div>

        </div>
    );
};

export default MonCompte;