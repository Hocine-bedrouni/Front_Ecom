import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserDetailsView = () => {

    const params = useParams();
    const currentUser = useSelector(state => state.user);
    const userList = currentUser.user;
    const user1 = userList.filter(item => item.id == params.id);
    const user = user1[0];

    return (
        <div>
          <h2>Carte Détails utilisateur</h2>
            <div className="bg-gray-300 flex justify-center items-center h-screen"> 
  <div className="bg-dark text-orange-400 p-10 rounded-lg shadow-md">Utilisateur id : {user.id} 

    <div className="mt-4 mb-4">
     <p className="text-white text-3xl">{user.name}</p>
      <p className="text-white my-3 text-2xl">{user.firstName}</p>
      <p className="text-white text-2xl">{user.email}</p>
      
      <div className="bg-gray-400 w-full h-3 rounded-lg mt-2 overflow-hidden">
        <div className="bg-orange-400 w-4/4 h-full rounded-lg shadow-md"></div>
      </div>
    </div>
    <h3 className=" text-2xl orange-400"> Adresse : </h3>
    <h4 className=" text-white">
   43 Boulevard de Moselle 59000 Lille
      <br />
    </h4>
  </div>
 </div>
         </div>
    );
};

export default UserDetailsView;