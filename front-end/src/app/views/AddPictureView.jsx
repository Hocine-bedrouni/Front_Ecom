import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiBackEnd from '../api/backend/api.Backend';

const AddPictureView = () => {

  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const params = useParams();


  function handleChange(event) {
    setFile(event.target.files[0])
  }



  function handleSubmit(event) {
    event.preventDefault()
    const url = 'products/' + `${params.idProduct}` + '/picture';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    apiBackEnd.post(url, formData, config).then((response) => {
    });
    alert('Votre image à bien été ajouté')
  }


  useEffect(() => {
    if (!file) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return (
    <div>
      { file &&
        <div>
          <p className='text-3xl py-10 '>Preview :</p>
          {file && <img src={preview} className=" flex mx-auto" />}
        </div> }

      <h1 className='py-10 text-4xl pl-10'>Ajout d'image</h1>
      <div className='border border-dark mx-auto my-10 py-5 bg-orange-100 w-2/5'>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 items-center ">
          <p className='text-2xl space-y-4 '>Selectionner une image à Uploader</p>
          <input type="file" className='w-auto' onChange={handleChange} />
          <button type="submit" className='bg-orange-400 border-dark w-20'>Upload</button>
        </form>
      </div>

    </div>
  );
};

export default AddPictureView;
