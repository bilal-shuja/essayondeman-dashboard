import WindowDimension from '../WindowDimension';
import React,{useState, useEffect} from 'react';
import Avatar from '../../Images/Avatar.png';
import Rating from '../../Images/Rating.svg';
import { AsyncStorage } from 'AsyncStorage';
import axios from 'axios';


const UserProfile = () => {
  const { height, width } = WindowDimension();
  const[userName, setUserName] = useState();

  const SetLocalLogin= async ()=>{
    try{
      let id = await AsyncStorage.getItem('id');
      if(id !== null ){      
        getUserProfile(id)
      }
    }catch{
      return null;
    }
    
  }
  
    const getUserProfile = (id)=>{
      axios.get(`${process.env.REACT_APP_BASE_URL}fetchusers/${id}`)
    .then(res =>{
      setUserName(res.data.username);
    })
    .catch(error =>{
      console.log(error);
    })
  }



  useEffect(() => {
    SetLocalLogin()
  }, [])
  
 


  return (
    <>
    
  {/* BEGIN: Content*/}
<div className="app-content content ">
  <div className="content-overlay" />
  {/* <div className="header-navbar-shadow" /> */}
  <div className="content-wrapper container-xxl p-0">
    {/* <div className="content-header row">
    </div> */}
    <div className="content-body">
      {/* users list start */}
      <section className="app-user-list">
        <div className="row">
      
                <div className="col-lg-5 col-sm-6">
            <div className="card" style={{paddingBottom:"1em"}}>
              <div className="card-body d-flex justify-content-start mt-2">
              <div className="avatar bg-light-primary" style={{width:"6em",height:"6em"}}>
                  <span className="avatar-content mx-auto">
                     <img src={Avatar} alt="" className="mt-5" style={{width:"7.7em",height:"7.4em"}}/>
                  </span>
                </div>
                <div className="row">
                <h3 className="ms-2" style={{fontSize:"17px", color:"#7367F0"}}>{userName}</h3>
                {/*  style={{marginTop:"-1.5em"}} */}
                <div className="Rating">
                <p className="ms-2">5.0 <img src={Rating} alt="" className="img-fluid" /></p>
                {/* <div className="d-flex ms-2" style={{marginTop:"-0.4em"}}>Qualification:&nbsp;<p style={{ color:"#7367F0"}}>Software Engineering</p></div> */}
                <div className="d-flex ms-2" style={{marginTop:"-0.4em"}}><p style={{fontWeight:"700", color:"#000"}}>Admin</p></div>

                </div>
                </div>

              </div>
            </div>
          </div>
          
          <div className="col-lg-7 col-sm-6">
            <div className="card">
              <div className="card-body">

                <div>
                  <h3 className="fw-bolder mb-75">Statistics</h3>
                </div>

                <div className="row mt-2">

                <div className="col-lg-4 col-sm-6">
                  <div className="card">
                    <div className="d-flex align-items-center justify-content-between">
                     
                      <div className="avatar bg-light-primary p-50">
                        <span className="avatar-content">
                          <i data-feather="check-square" className="font-medium-4" />
                        </span>
                      </div>

                      <div>
                        <span>Total Orders</span>
                        <h4 className="fw-bolder">21,459</h4>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="card">
                    <div className="d-flex align-items-center justify-content-between">
                      
                      <div className="avatar bg-light-danger p-50">
                        <span className="avatar-content">
                          <i data-feather="user-x" className="font-medium-4" />
                        </span>
                      </div>

                      <div style={{marginRight:height<=900 && width<=500?"1.4em":"1.6em"}}>
                        <span>Disputed</span>
                        <h3 className="fw-bolder">4,567</h3>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-sm-6">
                  <div className="card">
                    <div className="d-flex align-items-center justify-content-between">
                     
                      <div className="avatar bg-light-success p-50">
                        <span className="avatar-content">
                          <i data-feather="dollar-sign" className="font-medium-4" />
                        </span>
                      </div>
                      <div style={{marginRight:height<=900 && width<=500?"1.4em":"1.6em"}}>
                        <span>Revenue</span>
                        <h3 className="fw-bolder">19,860</h3>
                      </div>

                    </div>
                  </div>
                </div>

                    
                
                </div>
          

              </div>
            </div>
          </div>
        </div>
       
       {/* Hoverable rows start */}
<div className="row" id="table-hover-row">
  <div className="col-12">
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Orders</h4>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Status</th>
              <th>Writer</th>
              <th>Paid</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
           <tr>
             <td>1</td>
             <td>3/30/2022</td>
             <td style={{color:"green"}}>Completed</td>
             <td>Bilal Shuja</td>
             <td>Lorem Ipsum</td>
             <td><img src={Rating} alt="" /></td>
           </tr>

           <tr>
           <td>2</td>
             <td>3/30/2022</td>
             <td style={{color:"red"}}>Not Completed</td>
             <td>Affan Sheikh</td>
             <td>Lorem Ipsum</td>
             <td><img src={Rating} alt="" /></td>

           </tr>

           <tr>
           <td>3</td>
             <td>3/30/2022</td>
             <td style={{color:"red"}}>Not Completed</td>
             <td>Fahad Arif</td>
             <td>Lorem Ipsum</td>
             <td><img src={Rating} alt="" /></td>

           </tr>
      
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
{/* Hoverable rows end */}



      </section>
      {/* users list ends */}
    </div>
  </div>
</div>
{/* END: Content*/}


    </>
  )
}

export default UserProfile