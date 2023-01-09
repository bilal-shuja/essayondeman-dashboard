import WindowDimension from '../WindowDimension';
import React, {useState,useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import { AsyncStorage } from 'AsyncStorage';
import { toast } from "react-toastify";
import {Link } from 'react-router-dom';
import axios from 'axios';



const BlogManageTable = () => {

    const { height, width } = WindowDimension();
  
  const[getBlogs, setGetBlogs] = useState([])
  const[paringToken ,setParsingToken] = useState()

  const SetLocalLogin= async ()=>{
    try{
      let userTOKEN = await AsyncStorage.getItem('token');
      let parsed = JSON.parse(userTOKEN);

      if(parsed !== null){
      
        setParsingToken(parsed)
      }
    }catch{
        return null;
    }
  }

  const gettingBlogs = ()=>{
    axios.get(`${process.env.REACT_APP_BASE_URL}fetchblog`)
    .then((res)=>{
      setGetBlogs(res.data)
    })
    .catch((error)=>{
      toast.warning("Error Occured !")
    })
  }
const deleteBlogs = (id)=>{
 
  axios.post(`${process.env.REACT_APP_BASE_URL}deleteblog/${id}`)
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
    gettingBlogs()

  }, [])
  
  

  return (
    <>
    <div className="app-content content ">
      <div className="row" id="table-hover-row" >
        <div className="col-12">
          <div className="card" >
            <div className="card-header">
              <h4 className="card-title">Manage Blogs</h4>
              <Link to="/BlogManageFrom"className="btn btn-primary text-end">Add Blogs</Link>
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
                    getBlogs.map((items,index)=>{
                      return(
                        <>
                          <tr>
                        <td>{index+1}</td>
                        <td >
                           {items.title}
                        </td>
                        <td>
                        <Link to="/updateBlogs" state={{id:items.id}} className="btn btn-primary btn-sm">
                        <i className="fa-solid fa-pen-to-square"></i>                          
                        </Link>
                          <a onClick={()=>deleteBlogs(items.id)}className={height<=900 && width<=500?"btn btn-danger btn-sm mt-1":"btn btn-danger btn-sm ms-1"}>
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

export default BlogManageTable