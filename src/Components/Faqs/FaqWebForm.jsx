import React,{useState, useEffect} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseUrl from './GettingURLTwo.js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import { AsyncStorage } from 'AsyncStorage';

const FaqWebForm = () => {
    const [category,setCategory] = useState('1');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const[getTopServices, setTopServices] = useState([])
    const [serve_name,setServeName]=useState("");
    const[token , setToken] = useState()


    const GetToken= async ()=>{
      try{
        let token = await AsyncStorage.getItem('token');
        let parsed = JSON.parse(token);
        if(parsed !== null){
          getServices(parsed);
          setToken(parsed)
        }
      }catch{
          return null;
      }
    }
    const setCategoryOption = (e)=>{
      setCategory(e.target.value);
      getAllServices(e.target.value);

    }
    const setServiceOpt = (e)=>{
        setServeName(e.target.value);
  
    }
  
  
    const getServices = (t)=>{
      
      
      axios.get(`${BaseUrl}topservices/gettopservices`,{
        headers:{
          Authorization:t
        }
      })
      .then((res)=>{
        setTopServices(res.data.data)
  
      })
      .catch((error)=>{
        console.log(error)
      })


    }

    const getAllServices = (e)=>{
      if(e === "1"){
        axios.get(`${BaseUrl}topservices/gettopservices`,{
          headers:{
            Authorization:token
          }
        })
        .then((res)=>{
          setTopServices(res.data.data)
    
        })
        .catch((error)=>{
          console.log(error)
        })
  

      }
      
      else if(e === "2"){
        axios.get(`${BaseUrl}bottomservices/getbottomservices`,{
          headers:{
            Authorization:token
          }
        })
        .then((res)=>{
          setTopServices(res.data.data)
    
        })
        .catch((error)=>{
          console.log(error)
        })
  
      }

      else if(e === "3"){
        axios.get(`${BaseUrl}offers/gettopoffers`,{
          headers:{
            Authorization:token
          }
        })
        .then((res)=>{
          setTopServices(res.data.data)
    
        })
        .catch((error)=>{
          console.log(error)
        })
      }

      else if(e === "4"){
        axios.get(`${BaseUrl}offers/getbottomoffers`,{
          headers:{
            Authorization:token
          }
        })
        .then((res)=>{
          setTopServices(res.data.data)
    
        })
        .catch((error)=>{
          console.log(error)
        })
      }
      
    }


    const [faqDetails, setfaqDetails] = useState({
        Question:'',
      });


      const inputHandler = (e) => {
        setfaqDetails({ ...faqDetails, [e.target.name]: e.target.value });
      };
      const faqWebContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))

      const submitFaq = ()=>{
          const faqSubmit = {
            role_id:'admin',
            question:faqDetails.Question,
            answer:faqWebContent,
            service_id:"1",
            service_name:"main"
          }
          axios.post(`${BaseUrl}postFaqweb`,faqSubmit)
          .then(res =>{
            toast.info("Faq Posted!")
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
        getServices()
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
            <h2 className="content-header-title float-start mb-0">Faq Web Details</h2>
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
                <h4 className="card-title">Faq Web Details </h4>
              </div>
              <div className="card-body">
              <div className="row">
                  <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="date"><b>Select Category*</b></label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        id="selectBox"
                        value={category}
                        onChange={setCategoryOption}
                      >
                       <option disabled value="0">Select</option>
                        <option value="1">Top Services</option>
                        <option value="2">Bottom Services</option>
                        <option value="3">Top Offers</option>
                         <option value="4">Bottom Offers</option>
                      </select>
                  </div> 
                  </div>
                <div className="row">
                

                  <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b> Faq Question*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="Question" value={faqDetails.Question} onChange={inputHandler} placeholder="Enter faq Questions" id="credit-card" />
                  </div>
             
                  <div className="col-xl-6 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="date"><b>Add Services & Offers*</b></label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        id="selectBox"
                        // value={category}
                        onChange={setServiceOpt}
                      >
                      {getTopServices.map(function(items,key){
                        return(
                          <>
                            <option value={items.name}>{items.name}</option>
                          </>
                        )
                        
                      })}
                        {/* <option disabled value="0">Select</option>
                        <option value="1">Payment</option>
                        <option value="2">Delivery</option>
                        <option value="3">Cancellation & Return</option>
                         <option value="4">My Orders</option>
                        <option value="5">Product & Services</option> */}
                      </select>
                  </div> 
                  <div className="col-xl-12 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="phone-number"> <b>Faq Answer*</b> </label>
                    <Editor  
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={setEditorState}
               
                    />
                  </div>

                   {/* <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
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
                  </div>  */}

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

export default FaqWebForm