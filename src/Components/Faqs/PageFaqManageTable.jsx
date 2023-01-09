import WindowDimension from '../WindowDimension.jsx';
import React,{useState, useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import { AsyncStorage } from 'AsyncStorage';
import { toast } from "react-toastify";
import {Link } from 'react-router-dom';
import axios from 'axios';

const PageFaqManageTable = () => {
    const { height, width } = WindowDimension();
    const[faqToken , setFaqToken] = useState();
    const[faqs, setFaqs] = useState([]);


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
        axios.get(`${process.env.REACT_APP_BASE_URL}fetchPagefaq`)
        .then((res)=>{
            setFaqs(res.data)
    
        })
        .catch((error)=>{
          toast.warning("Error Occured !")
        })
      }

      const deleteFaq = (id)=>{
     
        axios.post(`${process.env.REACT_APP_BASE_URL}deletePagefaq/${id}`)
        .then((res)=>{
          toast.error("Deleted Successfully")
          setInterval(() => {
            window.location.reload(true)
          }, 1500)
        })
        .catch((error)=>{
          toast.warning("Error Occured !")
        })

      }
      useEffect(() => {
        gettingFaqs()
      }, [])
  return (
    <>
        <div className="app-content content " style={{marginBottom:"9em"}}>
      <div className="row" id="table-hover-row" >
        <div className="col-12">
          <div className="card" >
            <div className="card-header">
              <h4 className="card-title">Pages Faq</h4>

              <Link to="/PageFaqManageForm"className="btn btn-primary text-end">Add Pages Faq</Link>
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
                          <tr>
                        <td>{index+1}</td>
                        <td >
                           {items.title}
                        </td>
                        <td>{items.service_name}</td>
                        <td>
                        <Link to="/UpdatePageFaq" state={{id:items.id}} className="btn btn-primary btn-sm" href="#">
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

export default PageFaqManageTable