import React from 'react';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userStore } from "../../redux-store/userSlice";
import UserUpdate from './UserUpdateView';
import axios from 'axios';
import apiBackEnd from '../../api/backend/api.Backend';
import { Button } from 'react-bootstrap';
import UserDetailsView from './UserDetailsView';
import UserPersonalDataView from '../UserPersonalDataView';
import { deleteUser } from '../../api/backend/account';
import PopUpDelete from '../../components/PopUpDelete';


const UserListView = () => {

  const [isUpdate, setIsupdate] = useState(false);
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState({});


  const token = localStorage.token;

  const [page, setPage] = useState(0)
  const [nbPage, setNbPage] = useState(0)
  const [size, setSize] = useState(5)


  const handleChange = (e) => {
    // 👇 Get input value from "event"
    setSize({
      [e.target.name]: e.target.value
    });
  };
 



  useEffect(() => {
    fetchList(0)
    setPage(0)
  }, [showModal]);

  const fetchList = (page) => {
    axios
    // il faut le role admin ici pour passer //TODO
      .get("http://localhost:9000/api/shopping-online/no-role/all-account?page=" + `${page}` + "&size=" + size)
      .then(response => {
        setUserList(response.data.content),
        dispatch(userStore(response.data.content));
          setNbPage(response.data.totalPages)
      })
  }


  const next = (page) => {
    if (page < nbPage) {
      setPage(page)
      fetchList(page)
    }
  }

  const before = (page) => {
    setPage(page)
    if (page < 0) {
      setPage(0)
    } else {
      fetchList(page)
    }
  }

  const handleUpdate = (user) => {
    setIsupdate(true)
    setUser(user)
  }

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowModal(true)
  }



  const handleView = (user) => {
    navigate("/userdetail/"  + `${user.id}`)
  }

  if (!isUpdate) {
    return (
      <div>
       { showModal &&
          <PopUpDelete setShowModal={setShowModal} id={userToDelete.id} deleteObject={deleteUser}
            message = "Vous etes sur le point de supprimer un utilisateur"
          /> }
        <input
          value={size}
          type="number"
          id="message"
          name="message"
          onChange={handleChange}
        />
          <h2 className='my-10'> Liste des utilisateurs</h2>

          <table className="table-fixed border  border-slate-400 mx-auto">
            <thead className='bg-orange-100'>
              <tr className='border  border-slate-300 '>
                <th className='w-8 py-2 content content-center '> id</th>
                <th className='w-40 py-2'>Nom</th>
                <th className='w-48'>Prenom</th>
                <th className='w-48'>Email</th>
                <th className='w-1/3'>Actions</th>

              </tr>
            </thead>
            <tbody className='' >

              {
                userList.map(user => (
                  <tr key={user.id} className="border border-slate-300">
                    <td className='py-2 pl-3'>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.firstName}</td>
                    <td>{user.email}</td>
                    <td className='flex justify-center gap-5 py-2'>
                      <button type="button" className="btn w-24 bg-dark text-orange-400 hover:bg-green-600 hover:text-white" onClick={() => handleUpdate(user)} >Editer</button>
                      <button type="button" className="btn w-24 bg-dark text-orange-400 hover:bg-blue-600 hover:text-white" onClick={() => handleView(user)}>Details</button>
                      <button type="button" className="btn w-24 bg-dark text-orange-400 hover:bg-red-600 hover:text-white" onClick={() =>  handleDeleteUser(user)} >Supprimer</button>
                    </td>
                  </tr>
                ))
              }


            </tbody>
          </table>

          {/* <Button
            className=" bg-dark text-orange-400 w-24 ml-12 bg-transparent my-5"
            onClick={() => navigate("/register")}
          >
            Ajouter
          </Button> */}
          <br />
          <div className='  flex justify-center space-x-2 mx-auto py-5'>
          {/* <div className='   mx-auto py-5'> */}
            {/* <button type="button" className="btn bg-transparent btn-info"  onClick={() => next(page+1)} >Next</button> */}
            {page == 0 ? (
              <Button type="button" className=" bg-dark text-orange-400 px-4  " disabled onClick={() => before(page - 1)}>Prev</Button>
            ) : (
              <Button type="button" className=" bg-dark text-orange-400 px-4  " onClick={() => before(page - 1)}>Prev</Button>
            )}

            <Button type="button" className="  bg-dark text-orange-400 px-2 " disabled onClick={() => fetchList(0)} >{page + 1}</Button>
            {/* <button type="button" className="btn bg-transparent btn-info"  onClick={() => next(page+1)} >Next</button> */}
            {page < nbPage - 1 ? (
              <Button type="button" className=" bg-dark text-orange-400 px-4 " onClick={() => next(page + 1)} >Next</Button>
            ) : (
              <Button type="button" className=" bg-dark text-orange-400 px-4  " disabled onClick={() => next(page + 1)} >Next</Button>
            )}
          </div>
        </div>

     
    );
  }

  return <UserPersonalDataView user={user} setIsupdate={setIsupdate} />

};

export default UserListView;