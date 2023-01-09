import WindowDimension from '../WindowDimension';
import React, {useState,useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import { AsyncStorage } from 'AsyncStorage';
import {Link } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

const TopServiceTable = () => {
    
    const { height, width } = WindowDimension();
  
  const[getTopService, setTopService] = useState([]);
  const[paringToken ,setParsingToken] = useState();

  const SetLocalLogin= async ()=>{
    try{
      let userTOKEN = await AsyncStorage.getItem('token');
      let parsed = JSON.parse(userTOKEN);

      if(parsed !== null){
      
        gettingTopServices(parsed)
        setParsingToken(parsed)
      }
    }catch{
        return null;
    }
  }

  const gettingTopServices = (token)=>{
    axios.get(`${process.env.REACT_APP_BASE_URL}topservices/gettopservices`,{
      headers:{
        Authorization:token
      }
    })
    .then((res)=>{
        setTopService(res.data.data)

    })
    .catch((error)=>{
      toast.warning("Error Occured !")

    })
  }
const deleteTopService = (id)=>{
  const delObj = {
    id:id
  }
  axios.post(`${process.env.REACT_APP_BASE_URL}topservices/deletetopservice`,delObj,{
    headers:{
      Authorization:paringToken
    }
  })
  .then((res)=>{
    toast.error("Deleted Successfully")
    setInterval(() => {
      window.location.reload(true)
    }, 1000);
  })
  .catch((error)=>{
    toast.warning("Error Occured !")
  })
}

  useEffect(() => {
    SetLocalLogin()
  }, [])
  return (
    <>
       <div className="app-content content ">
      <div className="row" id="table-hover-row" >
        <div className="col-12">
          <div className="card" >
            <div className="card-header">
              <h4 className="card-title">Manage Top Services</h4>
              <Link to="/AddServicesAndOffers" state={{id:1, Headers:"Top Services",Input:"Enter Top Services"}} className="btn btn-primary text-end">Add Services</Link>
            </div>

            <div className="table-responsive">
              <table className="table table-hover text-center">
                <thead className="bg-primary">
                  <tr>
                    <th>SR#</th>
                    <th>Title</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    getTopService.map((items,index)=>{
                      return(
                        <>
                          <tr>
                        <td>{index+1}</td>
                        <td >
                           {items.name}
                        </td>
                        <td>
                        <Link to="/UpdateServiceAndOffers" state={{id:items.id, staticID:1,Headers:"Update Top Services",Input:"Enter Top Offers"}} className="btn btn-primary btn-sm">
                        <i className="fa-solid fa-pen-to-square"></i>                          
                        </Link>
                          <a onClick={()=>deleteTopService(items.id)}className={height<=900 && width<=500?"btn btn-danger btn-sm mt-1":"btn btn-danger btn-sm ms-1"}>
                          <i className="fa-solid fa-trash"></i>                         
                           </a>
                        </td>
                         </tr>
                        </>
                      )
                    })

                  
                   }
                
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>

    </>
  )
}

export default TopServiceTable