import React,{useState} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseUrl from './GettingURL.js';
import GettingToken from './GettingToken.js';

const AddWritersForm = () => {
  const token = GettingToken();

  const [profileImage, setProfileImage] = useState();

    const [writerData, setWriter] = useState({
        writerName:'',
        writerRating:'',
        Reviews:'',
        totalOrder:''
      });

      const uploadImage = async (e)=>{
        const file =e.target.files[0]; 
        const base64 = await convertBase64(file);
        setProfileImage(base64);
      }
    
    
      const convertBase64 = (file)=>{
          return new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload= ()=>{
              resolve(fileReader.result)
            };
            
            fileReader.onerror=(error)=>{
              reject(error)
            };
    
            
    })
      }

    

      const inputHandler = (e) => {
        setWriter({ ...writerData, [e.target.name]: e.target.value });
      };

      const submitWriter = ()=>{
        const writersObj = {

          writer_name:writerData.writerName,
          avatar:profileImage,
          rating:writerData.writerRating,
          num_of_reviews:writerData.Reviews,
          total_orders:writerData.totalOrder
        }
        axios.post(`${BaseUrl}writer/addwriter`,writersObj,{
          headers:{
            Authorization:token
          }
    
        })
        .then(res =>{
            toast.info("Writers Added!")
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
     
      return (
        <>
         <div className="app-content content ">
      <div className="content-wrapper container-xxl p-0">
        <div className="content-header row">
          <div className="content-header-left col-md-9 col-12 mb-2">
            <div className="row breadcrumbs-top">
              <div className="col-12">
                <h2 className="content-header-title float-start mb-0">
                  Writer Details
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
                   Writer Details
                 </h4>
                  </div>
                  <div className="card-body">
                    <div className="row">
    
                      <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                        <label className="form-label" htmlFor="credit-card"> <b>Writer Name*</b></label>
                        <input type="text" className="form-control credit-card-mask" name="writerName" 
                      
                         onChange={inputHandler} placeholder="Enter Writers Name" id="credit-card" required/>
                      </div>
                      
                      <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                        <label className="form-label" htmlFor="image"> <b>Upload Image*</b> </label>
                        <div className="input-group input-group-merge">
                          <input type="file" className="form-control phone-number-mask"  id="image-upload"  onChange={(e)=>{
                          uploadImage(e)
                        }} required/>
                        </div>
                      </div>
    
                   
    
                      <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                        <label className="form-label" htmlFor="time"> <b>Writer Rating*</b></label>
                        <input type="number" className="form-control time-mask" name="writerRating"  value={writerData.writerRating}  onChange={inputHandler} placeholder="Enter Rating" id="time" />
                      </div>
    
                      <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                        <label className="form-label" htmlFor="numeral-formatting"> <b>Total Reviews*</b> </label>
                        <input type="number" className="form-control numeral-mask" name="Reviews"  value={writerData.Reviews} onChange={inputHandler}  placeholder="Number of Orders" id="numeral-formatting" />
                      </div> 
    
                      <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                        <label className="form-label" htmlFor="numeral-formatting"> <b>Total Orders*</b> </label>
                        <input type="number" className="form-control numeral-mask" name="totalOrder"  value={writerData.totalOrder} onChange={inputHandler}  placeholder="Number of Orders" id="numeral-formatting" />
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

export default AddWritersForm