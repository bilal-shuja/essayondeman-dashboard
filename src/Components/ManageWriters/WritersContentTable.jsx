import React, {useState,useEffect} from 'react';
import WindowDimension from '../WindowDimension';
import { AsyncStorage } from 'AsyncStorage';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from './GettingURL.js';

const WritersContentTable = () => {
    const { height, width } = WindowDimension();
  
    const[getWriters, setWriters] = useState([])   
     const[paringToken ,setParsingToken] = useState()
  
    const SetLocalLogin= async ()=>{
        try{
          let userTOKEN = await AsyncStorage.getItem('token');
          let parsed = JSON.parse(userTOKEN);
    
          if(parsed !== null){
          
            gettingWriters(parsed)
            setParsingToken(parsed)

          }
        }catch{
            return null;
        }
      }

      const gettingWriters = (token)=>{
        axios.get(`${BaseUrl}writercontent/getwritercontent`,{
          headers:{
            Authorization:token
          }
        })
        .then((res)=>{
            setWriters(res.data.data)
    
        })
        .catch((error)=>{
          console.log(error);
        })
      }

  const deleteWriters = (id)=>{
    const delObj = {
      id:id
    }
    axios.post(`${BaseUrl}writercontent/deletewritercontent`,delObj,{
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
              <h4 className="card-title">Manage Writers Content</h4>
              <Link to="/AddWritersContent"className="btn btn-primary text-end">Add Writers Content</Link>
            </div>

            <div className="table-responsive">
              <table className="table table-hover text-center table-sm">
                <thead className="bg-primary">
                  <tr>
                    <th>SR#</th>
                    <th>By Subject</th>
                    <th>By Order</th>
                    <th>Writer_ID</th>
                    <th>Ratio</th>
                    <th>Orders</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    getWriters.map((items,index)=>{
                      return(
                        <>
                          <tr>
                        <td>{index+1}</td>
                        <td >
                           {items.subject}
                        </td>
                        <td>
                        {items.order_by}
                        </td>
                        <td>
                            {items.writer_id}
                        </td>
                        <td>
                            {items.progress_ratio}
                        </td>
                        <td>
                            {items.num_of_orders}
                        </td>
                        <td className="d-flex ms-2">
                        <Link to="/UpdateWritersContent" state={{id:items.id}} className="btn btn-primary btn-sm">
                        <i className="fa-solid fa-pen-to-square"></i>                          
                        </Link>
                          <a onClick={()=>deleteWriters(items.id)}className="btn btn-danger btn-sm ms-1">
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

export default WritersContentTable