import "react-toastify/dist/ReactToastify.css";
import React,{useState,useEffect} from 'react';
import { AsyncStorage } from 'AsyncStorage';
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';
import axios from 'axios';


const PagesContent = () => {
  const [category,setCategory] = useState('0');
  const[getTopServices, setTopServices] = useState([])
  const [serve_name,setServeName]=useState("");
  const[token , setToken] = useState();

  const GetToken= async ()=>{
    try{
      let token = await AsyncStorage.getItem('token');
      let parsed = JSON.parse(token);
      if(parsed !== null){
        setToken(parsed)
      }
    }catch{
        return null;
    }
  }


  const setCategoryOption = (e)=>{
    setCategory(e.target.value);

  }
  const setServiceOpt = (e)=>{
      setServeName(e.target.value);

  }
  
    const [pageContent, setPageContent] = useState({
 
      title_One:'',
      subTitle_One:'',
      title_Two:'',
      subTitle_Two:'', 
       title_Three:'',
      subTitle_Three:'',  
      title_Four:'',
      subTitle_Four:'',
      title_Five:'',
      subTitle_Five:'',

      protoTitle:'',
      protoTitle_One:'',
      protoSub_One:'',
      protoTitle_Two:'',
      protoSub_Two:'',     
       protoTitle_Three:'',
      protoSub_Three:'',
    });

    const inputHandler = (e) => {
      setPageContent({ ...pageContent, [e.target.name]: e.target.value });
    };
    const submitServices = ()=>{
      const HomePageContent = {
     
        service_id:"1",
        service_name:"main",
        title_1:pageContent.title_One,
        subtitle_1:pageContent.subTitle_One,
        title_2:pageContent.title_Two, 
        subtitle_2:pageContent.subTitle_Two,
        title_3:pageContent.title_Three,
        subtitle_3:pageContent.subTitle_Three,
        title_4:pageContent.title_Four,
        subtitle_4:pageContent.subTitle_Four,
        title_5:pageContent.title_Five,
        subtitle_5:pageContent.subTitle_Five,

        protitle:pageContent.protoTitle,
        protitle_1:pageContent.protoTitle_One,
        protosub_1:pageContent.protoSub_One,
        protitle_2:pageContent.protoTitle_Two,
        protosub_2:pageContent.protoSub_Two,
        protitle_3:pageContent.protoTitle_Three,
        protosub_3:pageContent.protoSub_Three
      }
      axios.post(`${process.env.REACT_APP_BASE_URL}postHomepage`,HomePageContent)
      .then(res =>{
          toast.info("Home Page Content Posted!")
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
            <h2 className="content-header-title float-start mb-0">Page Content</h2>
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
                <h4 className="card-title">Pages Content</h4>
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
                       <option  value="0">Select</option>
                        <option value="1">Top Services</option>
                        <option value="2">Bottom Services</option>
                        <option value="3">Top Offers</option>
                         <option value="4">Bottom Offers</option>
                      </select>
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
                      <option value="0">Select</option>
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

                  
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b> Title One*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="title_One"  onChange={inputHandler} placeholder="Enter Title One" id="credit-card" required/>
                  </div>

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Sub Title One*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="subTitle_One"  onChange={inputHandler} placeholder="Enter SubTitle One" id="credit-card" required/>
                  </div>
                 
                    
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b> Title Two*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="title_Two"  onChange={inputHandler} placeholder="Enter Title Two" id="credit-card" required/>
                  </div>

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Sub Title Two*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="subTitle_Two"  onChange={inputHandler} placeholder="Enter SubTitle Two" id="credit-card" required/>
                  </div>  
                    
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b> Title Three*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="title_Three"  onChange={inputHandler} placeholder="Enter Title Three" id="credit-card" required/>
                  </div>
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Sub Title Three*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="subTitle_Three"  onChange={inputHandler} placeholder="Enter SubTitle Three" id="credit-card" required/>
                  </div>  
                  
                    
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b> Title Four*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="title_Four"  onChange={inputHandler} placeholder="Enter Title Four" id="credit-card" required/>
                  </div>
                      
                          
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Sub Title Four*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="subTitle_Four"  onChange={inputHandler} placeholder="Enter SubTitle Four" id="credit-card" required/>
                  </div>  
                  

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b> Title Five*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="title_Five"  onChange={inputHandler} placeholder="Enter Title Five" id="credit-card" required/>
                  </div>
                  
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Sub Title Five*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="subTitle_Five"  onChange={inputHandler} placeholder="Enter SubTitle Five" id="credit-card" required/>
                  </div>


                <div className="row">

                <h3 className="mt-2 mb-2"><b>How Services Work Title*</b></h3>
                <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Main Title*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="protoTitle"  onChange={inputHandler} placeholder="Enter Title" id="credit-card" required/>
                  </div>

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Title One*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="protoTitle_One"  onChange={inputHandler} placeholder="Enter Title One" id="credit-card" required/>
                  </div>
                  
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Sub Title One*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="protoSub_One"  onChange={inputHandler} placeholder="Enter Sub_Title One" id="credit-card" required/>
                  </div>

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Title Two*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="protoTitle_Two"  onChange={inputHandler} placeholder="Enter Title Two" id="credit-card" required/>
                  </div>

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Sub Title Two*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="protoSub_Two"  onChange={inputHandler} placeholder="Enter Sub_Title Two" id="credit-card" required/>
                  </div>

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Title Three*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="protoTitle_Three"  onChange={inputHandler} placeholder="Enter Title Three" id="credit-card" required/>
                  </div>

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b>Sub Title three*</b></label>
                    <input type="text" className="form-control credit-card-mask" name="protoSub_Three"  onChange={inputHandler}placeholder="Enter Sub_Title Three" id="credit-card" required/>
                  </div>

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

export default PagesContent