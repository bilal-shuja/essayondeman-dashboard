import React,{useState,useEffect} from 'react';
import "react-toastify/dist/ReactToastify.css";
import { AsyncStorage } from 'AsyncStorage';
import {Link } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from 'axios';

const AddWritersReviews = () => {
    const[token , setToken] = useState()

    const[writerID, setWriterID] = useState("1")
    const[category, setCategory] = useState('0');
    const [getOrders , setOrders] = useState([])
    const[orderVal , setOrderVal] = useState("")

    const[getWriters, setWriters] = useState([])

    const [writerData, setWriter] = useState({
       customerID:'',
        writerRating:'',
        Reviews:'',
        totalOrder:''
      });

      const GetToken= async ()=>{
        try{
          let token = await AsyncStorage.getItem('token');
          let parsed = JSON.parse(token);
          if(parsed !== null){
            gettingWriter(parsed);
            setToken(parsed);
          }
        }catch{
            return null;
        }
      }

      const gettingWriter = (t)=>{

        axios.get(`${process.env.REACT_APP_BASE_URL}writer/getwriters`,{
          headers:{
            Authorization:t
          }
        })
        .then((res)=>{
          setWriters(res.data.data)
    
        })
        .catch((error)=>{
          toast.warning("Error Occured !")
        })
  
  
      }
      const setCategoryWriters = (e)=>{
        setWriterID(e.target.value)
      }
      const setCategoryOption = (e)=>{
        setCategory(e.target.value);
        getOrderData(e.target.value);
      }
      const getOrderCategory = (e)=>{
        setOrderVal(e.target.value)
      }
      const inputHandler = (e) => {
        setWriter({ ...writerData, [e.target.name]: e.target.value });
      };

      const submitWriter = ()=>{
        const writersObj = {

        writer_id:writerID,
          order_by:orderVal,
          customer_id:writerData.customerID,
          rating:writerData.writerRating,
          feedback:writerData.Reviews,
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}writerdummy/addwriterdummyreview`,writersObj,{
          headers:{
            Authorization:token
          }
    
        })
        .then(res =>{
            toast.info("Writers Review Added!")
          setInterval(() => {
            window.location.reload(true);
          }, 1500);
          
          
        }
        )
        .catch(
          error =>{
            toast.warning("Error Occured !")
          }
        )

       
      }

      const getOrderData = (e)=>{
          switch (e) {
              case  "OBT":
                axios.get(`${process.env.REACT_APP_BASE_URL}contenttype/getcontenttypes`,{
                    headers:{
                      Authorization:token
                    }
                  })
                  .then((res)=>{
                    setOrders(res.data.data)
              
                  })
                  .catch((error)=>{
                        toast.warning("Error Occured !")
                  })
                  break;

                  case "OBS":
                    axios.get(`${process.env.REACT_APP_BASE_URL}assignmenttype/getassignmenttypes`,{
                        headers:{
                          Authorization:token
                        }
                      })
                      .then((res)=>{
                        setOrders(res.data.data)
                  
                      })
                      .catch((error)=>{
                          toast.warning("Error Occured !")
                      })

                      break;
          
                      default:
                        toast.warning("No type found")
                      
                      break;
          }
        
      
        
      }
      useEffect(() => {
        GetToken()
      }, [])

  return (
    <>
    <div className="app-content content ">
      <div className="content-wrapper container-xxl p-0">
        <div className="content-header row">
          <div className="content-header-left col-md-9 col-12 mb-2">
            <div className="row breadcrumbs-top">
              <div className="col-12">
                <h2 className="content-header-title float-start mb-0">
                  Writer Reviews
                  </h2>
                <div className="breadcrumb-wrapper">
                  <ol className="breadcrumb">
                    
                    <li className="breadcrumb-item">
                        <Link to="/WritesAndContent">Back</Link>
                    </li>
                   
                  </ol>
                </div>
              </div>
            </div>
          </div>
      
        </div>
        <div className="content-body" style={{marginBottom:"9em"}}>
          {/* Input Mask start */}
          <section id="input-mask-wrapper">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">  
                   Writers Review
                 </h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
    
                    <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="date"><b>Select Writer*</b></label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        id="selectBox"
                        onChange={setCategoryWriters}
                      >
                        <option value="0">Select</option>
                        {
                          getWriters.map((items,index)=>{
                            return(
                              <option key={index} value={items.id}>{items.writer_name}</option>
                            )
                          })
                        }
                    
                      </select>
                  </div>
                  
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="date"><b>Order By*</b></label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        id="selectBox"
                        value={category}
                        onChange={setCategoryOption}
                      >
                        <option disabled value="0">Select</option>
                        <option value="OBT">Order by Type</option>
                        <option value="OBS">Order by Subject</option>

                      
                      </select>
                  </div>
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="date"><b>Order Type*</b></label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        id="selectBox"
                        onChange={getOrderCategory}
                      >
                     <option  value="0">Select</option>

                        {
                          getOrders.map((items,index)=>{
                            return(

                              <option key={index} value={items.name}>{items.name}</option>
                            )
                          })
                        }
                       
                      
                      </select>
                  </div>
                        
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                        <label className="form-label" htmlFor="time"> <b>Customers ID*</b></label>
                        <input type="number" className="form-control time-mask" name="customerID"  value={writerData.customerID}  onChange={inputHandler} placeholder="Enter Rating" id="time" />
                      </div>

                      <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                        <label className="form-label" htmlFor="time"> <b>Writer Rating*</b></label>
                        <input type="number" className="form-control time-mask" name="writerRating"  value={writerData.writerRating}  onChange={inputHandler} placeholder="Enter Rating" id="time" />
                      </div>
    
                      <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                        <label className="form-label" htmlFor="numeral-formatting"> <b>Customer Feedback*</b> </label>
                        <input type="text" className="form-control numeral-mask" name="Reviews"  value={writerData.Reviews} onChange={inputHandler}  placeholder="Customer Feedback" id="numeral-formatting" />
                      </div> 
    
                      {/* <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                        <label className="form-label" htmlFor="delimiters">Delimiters</label>
                        <input type="text" className="form-control delimiter-mask" placeholder="Delimiter: '.'" id="delimiters" />
                      </div>
    
                      <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                        <label className="form-label" htmlFor="custom-delimiters">Custom Delimiters</label>
                        <input type="text" className="form-control custom-delimiter-mask" placeholder="Delimiter: ['.', '.', '-']" id="custom-delimiters" />
                      </div>
    
                      <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                        <label className="form-label" htmlFor="prefix">Prefix</label>
                        <input type="text" className="form-control prefix-mask" id="prefix" />
                      </div> */}
                  
    
                     
                      <div className="text-end">
                       
                        <div className="btn btn-primary" onClick={submitWriter}>Submit</div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Input Mask End */}
        </div>
      </div>
    </div>
    </>
  )
}

export default AddWritersReviews