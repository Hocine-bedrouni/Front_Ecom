import React from 'react';

import axios from 'axios';
import { useEffect } from 'react';
import apiBackEnd from '../api/backend/api.Backend';


const HelloWorldView = () => {

    const token = localStorage.token;

    let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }


    useEffect(() => {
        fetchList()
      }, []);
    
    
      const fetchList = async() => {
        await apiBackEnd
        // il faut le role admin ici pour passer
          .get("http://localhost:9000/api/shopping-online/all-role-dto")
          .then(response => {
            alert("page ok")
          }
          
          ).catch(error => {
          })
      }

    

    return (
        <div>
            <h1> Page Hello</h1>
            <p> {token}</p>
        </div>
    );
};

export default HelloWorldView;

