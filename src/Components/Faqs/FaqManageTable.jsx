import React,{useState, useEffect} from 'react';
import WindowDimension from '../WindowDimension.jsx';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AsyncStorage } from 'AsyncStorage';
import {Link } from 'react-router-dom';
import BaseUrl from './GettingURLTwo.js';
import axios from 'axios';

const FaqManageTable = () => {
    const { height, width } = WindowDimension();
    const[faqs, setFaqs] = useState([]);
    const[faqToken , setFaqToken] = useState();
    const SetLocalLogin= async ()=>{
        try{
          let userTOKEN = await AsyncStorage.getItem('token');
          let parsed = JSON.parse(userTOKEN);
    
          if(parsed !== null){
          
             gettingFaqs(parsed)
             setFaqToken(parsed)
          }
        }catch{
            return null;
        }
      }
      const gettingFaqs = (token)=>{
        axios.get(`${BaseUrl}faqs/getfaqs`,{
          headers:{
            Authorization:token
          }
        })
        .then((res)=>{
            setFaqs(res.data.data)
    
        })
        .catch((error)=>{
          console.log(error);
        })
      }

      const deleteFaq = (id)=>{
        const delObj = {
          id:id
        }
        axios.post(`${BaseUrl}faqs/deletefaq`,delObj,{
          headers:{
            Authorization:faqToken
          }
        })
        .then((res)=>{
          toast.error("Deleted Successfully")
          setInterval(() => {
            window.location.reload(true)
          }, 1500);
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
              <h4 className="card-title">Manage Faqs</h4>

              <Link to="/FaqManageForm"className="btn btn-primary text-end">Add Faqs</Link>
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
                    faqs.map((items,index)=>{
                      return(
                        <>
                          <tr>
                        <td>{index+1}</td>
                        <td >
                           {items.question}
                        </td>
                        <td>
                        <Link to="/UpdateFaq" state={{id:items.id}} className="btn btn-primary btn-sm" href="#">
                        <i className="fa-solid fa-pen-to-square"></i>                          
                        </Link>
                          <a onClick={()=>deleteFaq(items.id)}className={height<=900 && width<=500?"btn btn-danger btn-sm mt-1":"btn btn-danger btn-sm ms-1"} href="#">
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

export default FaqManageTable