import React,{useState,useEffect} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AsyncStorage } from 'AsyncStorage';
import BaseUrl from './GettingURL.js';


const AddWritersContent = () => {
  const[getWriters, setWriters] = useState([])

  const [getOrders , setOrders] = useState([])
  const[getSubject , setSubject] = useState([])

  const[orderVal , setOrderVal] = useState("")
  const[subjectVal, setSubjectVal]= useState("")

  const[writerID, setWriterID] = useState("1")
  const[token , setToken] = useState()

    const [writerContent, setWriterContent] = useState({
        totalOrder:'',
        totalOrderTwo:'',
        progressRatio:'',
        progressRationTwo:''
      });

      const GetToken= async ()=>{
        try{
          let token = await AsyncStorage.getItem('token');
          let parsed = JSON.parse(token);
          if(parsed !== null){
            gettingWriter(parsed);
            setToken(parsed)
          }
        }catch{
            return null;
        }
      }
      const gettingWriter = (t)=>{
      
      
        axios.get(`${BaseUrl}writer/getwriters`,{
          headers:{
            Authorization:t
          }
        })
        .then((res)=>{
          setWriters(res.data.data)
    
        })
        .catch((error)=>{
          console.log(error)
        })
  
  
      }

      const[category, setCategory] = useState('0');
      const setCategoryOption = (e)=>{
        setCategory(e.target.value);
        getOrderData(e.target.value);
      }
      const[subjectCategory, setSubjectCategory] = useState('0');

      const setCategorySubject = (e)=>{
        setSubjectCategory(e.target.value);
        getSubjectData(e.target.value);

      }

      const setCategoryWriters = (e)=>{
        setWriterID(e.target.value)
      }

      const getOrderCategory = (e)=>{
        setOrderVal(e.target.value)
      }
      const getSubjectCategory = (e)=>{
        setSubjectVal(e.target.value)
      }

      const getSubjectData = (e)=>{
        if(e === "OBS"){
              axios.get(`${BaseUrl}assignmenttype/getassignmenttypes`,{
              headers:{
                Authorization:token
              }
            })
            .then((res)=>{
              setSubject(res.data.data)
        
            })
            .catch((error)=>{
              console.log(error)
            })
        }
        else{
          console.log("No type found")
        }

      }
      const getOrderData = (e)=>{
        if(e === "OBT"){
          axios.get(`${BaseUrl}contenttype/getcontenttypes`,{
                    headers:{
                      Authorization:token
                    }
                  })
                  .then((res)=>{
                    setOrders(res.data.data)
              
                  })
                  .catch((error)=>{
                    console.log(error)
                  })
        }
        else{
          console.log("No type found")
        }
      }
    

      const inputHandler = (e) => {
        setWriterContent({ ...writerContent, [e.target.name]: e.target.value });
      };

      const submitWriterContent = ()=>{
        const writerContentObj = {
          writer_id:writerID,
          subject:subjectVal,
          order_by:orderVal,
          num_of_orders:writerContent.totalOrder,
          order_num_two:writerContent.totalOrderTwo,
          progress_ratio:writerContent.progressRatio,
          progress_ratio_two:writerContent.progressRationTwo
        }
        axios.post(`${BaseUrl}writercontent/addwritercontent`,writerContentObj,{
          headers:{
            Authorization:token
          }
    
        })
        .then(res =>{
            toast.info("Writers Content Posted!")
          setInterval(() => {
            window.location.reload(true);
          }, 1500);
          
         
          
        }
        )
        .catch(
          error =>{
            toast.warning("Error Occured !")
            console.log(error)
          }
        )
    
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
            <h2 className="content-header-title float-start mb-0">Writers Content</h2>
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
    <div className="content-body" style={{marginBottom:"4em"}}>
      {/* Input Mask start */}
      <section id="input-mask-wrapper">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Writer Content </h4>
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
                          getWriters.map((items)=>{
                            return(
                              <option  value={items.id}>{items.writer_name}</option>
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
                        {
                          getOrders.map((items)=>{
                            return(

                              <option value={items.name}>{items.name}</option>
                            )
                          })
                        }
                       
                      
                      </select>
                  </div>


                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="date"><b>Subject By*</b></label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        id="selectBox"
                        value={subjectCategory}
                        onChange={setCategorySubject}
                      >
                        <option disabled value="0">Select</option>
                        <option value="OBS">Order by Subject</option>
                      
                      </select>
                  </div>
                  
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="date"><b>Subject Type*</b></label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        id="selectBox"
                        onChange={getSubjectCategory}
                      >
                        {
                          getSubject.map((items)=>{
                            return(

                              <option value={items.name}>{items.name}</option>
                            )
                          })
                        }
                       
                      
                      </select>
                  </div>

           
                  

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="numeral-formatting"> <b>No of Orders by Subject*</b> </label>
                    <input type="number" className="form-control numeral-mask" name="totalOrder" value={writerContent.totalOrder} onChange={inputHandler} placeholder="Number of Orders by Subject" id="numeral-formatting" />
                  </div> 
                  
                  
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="numeral-formatting"> <b>No of Orders by Type*</b> </label>
                    <input type="number" className="form-control numeral-mask" name="totalOrderTwo" value={writerContent.totalOrderTwo} onChange={inputHandler} placeholder="Number of Orders by Type" id="numeral-formatting" />
                  </div> 


                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="numeral-formatting"> <b>Progress Ratio of Subject*</b> </label>
                    <input type="number" className="form-control numeral-mask" name="progressRatio" value={writerContent.progressRatio} onChange={inputHandler} placeholder="Progress Ratio by Subject" id="numeral-formatting" />
                  </div> 
                  
                  
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="numeral-formatting"> <b>Progress Ratio of Type*</b> </label>
                    <input type="number" className="form-control numeral-mask" name="progressRationTwo" value={writerContent.progressRationTwo} onChange={inputHandler} placeholder="Progress Ratio by Type" id="numeral-formatting" />
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
                    <div className="btn btn-primary" onClick={submitWriterContent}>Submit</div>
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

export default AddWritersContent