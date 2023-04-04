import React from 'react';
import "../assets/styles/components/popup.css";



const PopUpDelete = ({ setShowModal, id, deleteObject, message}) => {

  const handleDelete = () => {
    deleteObject(id)
    .then((response) => {
      alert(response.data);
    }).catch((error) => {
    })
  }

  return (
    <div className="modalBackground z-20 w-full">
      <div className="modalContainer ">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setShowModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>ATTENTION</h1>
        </div>
        <div className="body gap-10">
          <p className='text-3xl'>{message}</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setShowModal(false);
            }}
            id="cancelBtn"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              handleDelete();
              setShowModal(false);
            }} >Continuer</button>
        </div>
      </div>
    </div>
  );
};

export default PopUpDelete;