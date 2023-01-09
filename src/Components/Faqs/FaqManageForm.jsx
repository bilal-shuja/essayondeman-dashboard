import "react-toastify/dist/ReactToastify.css";
import GettingToken from './GettingToken.js';
import {Link } from 'react-router-dom';
import { toast } from "react-toastify";
import React,{useState} from 'react';
import axios from 'axios';

const FaqManageForm = () => {
  const token = GettingToken();

    const [faqDetails, setfaqDetails] = useState({
        Question:'',
        Answer:'',
      });

      const[category, setCategory] = useState('1');
      const setCategoryOption = (e)=>{
        setCategory(e.target.value);
      }
    

      const inputHandler = (e) => {
        setfaqDetails({ ...faqDetails, [e.target.name]: e.target.value });
      };

      const submitFaq = ()=>{
        const faqSubmit = {
          role_id:'1',
          question:faqDetails.Question,
          answer:faqDetails.Answer,
          category:category
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}faqs/addfaq`,faqSubmit,{
          headers:{
            Authorization:token
          }
    
        })
        .then(res =>{
          if(faqDetails.Question && faqDetails.Answer && category){
            toast.info("Faq Posted!")
          setInterval(() => {
            window.location.reload(true);
          }, 1500);
          }
          else{
            toast.warning('Input Fields are Empty !')
          }
          
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
            <h2 className="content-header-title float-start mb-0">Enter Faq Details</h2>
            <div className="breadcrumb-wrapper">
              <ol className="breadcrumb">
                
                <li className="breadcrumb-item">
                    <Link to="/ControlContent">Back</Link>
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
                <h4 className="card-title">Faq Details </h4>
              </div>
              <div className="card-body">
                <div className="row">

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b> Faq Question*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="Question" value={faqDetails.Question} onChange={inputHandler} placeholder="Enter faq Questions" id="credit-card" required/>
                  </div>
                  
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="phone-number"> <b>Faq Answer*</b> </label>
                    <div className="input-group input-group-merge">
                      <input type="text" className="form-control phone-number-mask" name="Answer"  value={faqDetails.Answer} onChange={inputHandler} placeholder="Enter faq Answer" id="phone-number" required/>
                    </div>
                  </div>

                   <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="date"><b>Faq Category*</b></label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        id="selectBox"
                        value={category}
                        onChange={setCategoryOption}
                      >
                        <option disabled value="0">Select</option>
                        <option value="1">Payment</option>
                        <option value="2">Delivery</option>
                        <option value="3">Cancellation & Return</option>
                         <option value="4">My Orders</option>
                        <option value="5">Product & Services</option>
                      </select>
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
                    <div className="btn btn-primary" onClick={submitFaq}>Submit</div>
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

export default FaqManageForm