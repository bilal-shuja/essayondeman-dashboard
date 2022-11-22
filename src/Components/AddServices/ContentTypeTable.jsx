import React, {useState,useEffect} from 'react';
import WindowDimension from '../WindowDimension';
import { AsyncStorage } from 'AsyncStorage';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from './GettingURLTwo.js';
const ContentTypeTable = () => {
    const { height, width } = WindowDimension();
  
    const[getContent, setContent] = useState([])
    const[paringToken ,setParsingToken] = useState()
  
    const SetLocalLogin= async ()=>{
      try{
        let userTOKEN = await AsyncStorage.getItem('token');
        let parsed = JSON.parse(userTOKEN);
  
        if(parsed !== null){
        
            gettingCotentType(parsed)
          setParsingToken(parsed)
        }
      }catch{
          return null;
      }
    }
  
    const gettingCotentType = (token)=>{
      axios.get(`${BaseUrl}contenttype/getcontenttypes`,{
        headers:{
          Authorization:token
        }
      })
      .then((res)=>{
        setContent(res.data.data)
  
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  const deleteBottomServices = (id)=>{
    const delObj = {
      id:id
    }
    axios.post(`${BaseUrl}contenttype/deletecontenttype`,delObj,{
      headers:{
        Authorization:paringToken
      }
    })
    .then((res)=>{
      toast.error("Deleted Successfully")
      setInterval(() => {
        window.location.reload(true)
      }, 1000);
      console.log(res.data)
    })
    .catch((error)=>{
      console.log(error)
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
              <h4 className="card-title">Manage Content</h4>
              <Link to="/ContenType" className="btn btn-primary text-end">Add Content Type</Link>
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
                    getContent.map((items,index)=>{
                      return(
                        <>
                          <tr>
                        <td>{index+1}</td>
                        <td >
                           {items.name}
                        </td>
                        <td>
                        <Link to="/UpdateContentType" state={{id:items.id}} className="btn btn-primary btn-sm">
                        <i className="fa-solid fa-pen-to-square"></i>                          
                        </Link>
                          <a onClick={()=>deleteBottomServices(items.id)}className={height<=900 && width<=500?"btn btn-danger btn-sm mt-1":"btn btn-danger btn-sm ms-1"}>
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

export default ContentTypeTable