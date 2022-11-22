import React,{useState, useEffect} from 'react';
import WindowDimension from '../WindowDimension.jsx';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AsyncStorage } from 'AsyncStorage';
import {Link } from 'react-router-dom';
import BaseURL from './GettingURLTwo.js';
import axios from 'axios';

const FaqWebTable = () => {
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
      const gettingFaqs = ()=>{
        axios.get(`${BaseURL}fetchFaqweb`)
        .then((res)=>{
            setFaqs(res.data)
    
        })
        .catch((error)=>{
          console.log(error);
        })
      }

      const deleteFaq = (id)=>{
        axios.post(`${BaseURL}deleteFaqweb/${id}`)
        .then((res)=>{
            setInterval(() => {
                toast.error("Deleted Successfully")
                window.location.reload(true)
            }, 1500);
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
              <h4 className="card-title">Manage Web Faqs</h4>

              <Link to="/FaqWebForm"className="btn btn-primary text-end">Add Web Faqs</Link>
            </div>
            <div className="table-responsive">
              <table className="table table-hover text-center">
                <thead className="bg-primary">
                  <tr>
                    <th>SR#</th>
                    <th>Title</th>
                    <th>Page</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    faqs.map((items,index)=>{
                      return(
                        <>
                          <tr key={items.id}>
                        <td>{index+1}</td>
                        <td >
                           {items.question}
                        </td>
                        <td>{items.service_name}</td>
                        <td className="d-flex">
                        <Link to="/UpdateFaqWeb" state={{id:items.id}} className="btn btn-primary btn-sm" href="#">
                        <i className="fa-solid fa-pen-to-square"></i>                          
                        </Link>
                          <a onClick={()=>deleteFaq(items.id)}className="btn btn-danger btn-sm ms-1" href="#">
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

export default FaqWebTable