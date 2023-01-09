import {Link , useLocation} from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import GettingToken from '../GettingToken.js';
import { toast } from "react-toastify";
import React,{useState} from 'react';
import axios from 'axios';

const UpdateContentType = () => {
    const location = useLocation();
    const {id} = location.state;
    const ID = id;

    const token = GettingToken();
    const [services, setServices] = useState();

    const submitServices = ()=>{
        const serviceObj = {
            id:ID,
            role_id:1,
          name:services
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}api/contenttype/updatecontenttype`,serviceObj,{
        headers:{
          Authorization:token
        }
  
      })
      .then(res =>{
          toast.info("Content Updated!")
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
  return (
    <>
     <div className="app-content content ">
  <div className="content-wrapper container-xxl p-0">
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-start mb-0">Update Content Type</h2>
            <div className="breadcrumb-wrapper">
              <ol className="breadcrumb">
                
                <li className="breadcrumb-item">
                    <Link to="/ServicesAndOffers">Back</Link>
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
                <h4 className="card-title">Update Content Type</h4>
              </div>
              <div className="card-body">
                <div className="row">

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b> Content Type*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="services"  onChange={(e)=>{setServices(e.target.value)}} placeholder="Enter Assignment Type" id="credit-card" required/>
                  </div>
                 
                   

                  {/* <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="time">Time</label>
                    <input type="text" className="form-control time-mask" placeholder="hh:mm:ss" id="time" />
                  </div> */}

                  {/* <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="numeral-formatting">Numeral formatting</label>
                    <input type="text" className="form-control numeral-mask" placeholder="10,000" id="numeral-formatting" />
                  </div> */}

               

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
                    <div className="btn btn-primary" onClick={submitServices}>Submit</div>
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

export default UpdateContentType