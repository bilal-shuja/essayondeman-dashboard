import React,{useState, useEffect} from 'react';
import {Link,useLocation} from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GettingToken from '../GettingToken.js';
import BaseUrl from './GettingURLTwo.js';

const UpdateServiceAndOffers = () => {
  const token = GettingToken();
  const location = useLocation();
  const { id,Headers, Input, staticID } = location.state;
  const StaticID = staticID;
    const ID = id;
    const headers = Headers;
    const input = Input;





  const [services, setServices] = useState();

const[url , setURL] = useState();



    const submitServices = ()=>{
      const serviceObj = {
        id:ID,
        name:services
      }
      axios.post(`${BaseUrl}${url}`,serviceObj,{
      headers:{
        Authorization:token
      }

    })
    .then(res =>{
        toast.info("Service Updated!")
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
    switch (StaticID) {
      case 1:
      setURL(`topservices/updatetopservice`)
        break;
        case 2:
          setURL(`bottomservices/updatebottomservice`)

          break;
          case 3:
            setURL(`offers/updatetopoffer`)

            break;
            case 4:
              setURL(`offers/updatebottomoffer`)

              break;
    
      default:
        console.log('No service Found !')
        break;
    }
 
  }, [])
  return (
    <>
    <div className="app-content content ">
  <div className="content-wrapper container-xxl p-0">
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-start mb-0">{headers}</h2>
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
                <h4 className="card-title">{headers}</h4>
              </div>
              <div className="card-body">
                <div className="row">

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b> {headers}*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="services"  onChange={(e)=>{setServices(e.target.value)}} placeholder={input} id="credit-card" required/>
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

export default UpdateServiceAndOffers