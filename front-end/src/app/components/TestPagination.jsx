import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const TestPagination = () => {
    const [userList, setUserList] = useState([])
    const navigate = useNavigate();

const [page, setPage] = useState(0)
const [compteur, setCompteur] = useState(0)

    useEffect(() => {
        fetchList(page)
    
    }, []);


    const next = (page)=>{
        setPage(page) 
        fetchList(page)
      }
      
      
      const before = (page) => {
        setPage(page)
        if (page < 0){
          setPage(0)
        }else {
        fetchList(page)
      }}
      
    


    const fetchList = (page = 1) => {
        axios
            .get("http://localhost:8082/api/public/user/liste?page=" + `${ page }` + "&size=" + 3)
            .then(response => setUserList(response.data.content))
    }

  

    return (
        <div>
            <div className="container">
                <h2> List des Produits</h2>

                <table className="table">
                    <thead>
                        <tr>
                            <th> id</th>
                            <th>Nom</th>
                            <th>Prenom</th>
                            <th>Email</th>



                        </tr>
                    </thead>
                    <tbody>

                        {
                            userList.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.nom}</td>
                                    <td>{user.prenom}</td>
                                    <td>{user.email}</td>


                                </tr>
                            ))
                        }


                    </tbody>
                </table>

                <button type="button" className="btn bg-transparent btn-info" onClick={() => before(page-1)}>Prev</button>
          <button type="button" className="btn bg-transparent btn-info" onClick={() => fetchList(0)} >{page+1}</button>
          <button type="button" className="btn bg-transparent btn-info" onClick={() => next(page+1)} >Next</button>

                {/* <button type="button" className="btn bg-transparent btn-info" onClick={() => fetchList(1)} >1</button>
                <button type="button" className="btn bg-transparent btn-info" onClick={() => fetchList(2)} >2</button> */}
                {/* <button type="button" className="btn bg-transparent btn-info" onClick={() => fetchList(page+1)}>Next2</button>&nbsp;&nbsp;
                <button type="button" className="btn bg-transparent btn-info" onClick={() => fetchList(4)} >4</button>

                <button type="button" className="btn bg-transparent btn-info" onClick={() => fetchList(5)} >5</button>
                <button type="button" className="btn bg-transparent btn-info" onClick={() => fetchList(6)}>6</button>&nbsp;&nbsp;
                <button type="button" className="btn bg-transparent btn-info" onClick={() => fetchList(7)} >7</button>

                <button type="button" className="btn bg-transparent btn-info" onClick={() => fetchList(8)} >8</button>
                <button type="button" className="btn bg-transparent btn-info"onClick={() => fetchList(9)}>9</button>&nbsp;&nbsp;
                <button type="button" className="btn bg-transparent btn-info" onClick={() => fetchList(10)} >10</button>

                <button type="button" className="btn bg-transparent btn-info" onClick={() => fetchList(11)} >11</button>
                <button type="button" className="btn bg-transparent btn-info"onClick={() => fetchList(12)}>12</button>&nbsp;&nbsp;
                <button type="button" className="btn bg-transparent btn-info"o onClick={() => fetchList(13)} >13</button>  */}

            </div>

        </div>
    );
}
export default TestPagination;