import './App.css';
import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AsyncStorage } from 'AsyncStorage';
import CustomerLogin from '../src/Components/auth/CustomersLogin/Login.jsx';
import CustomerReg from '../src/Components/auth/CustomersLogin/RegLogin.jsx';
import SideBar from './Components/SideBar.jsx';
import Header from './Components/Header.jsx';
import UserProfile from './Components/UserProfile.jsx';
import ControlContent from './Components/ControlContent.jsx';
import BlogManageFrom from './Components/Blogs/BlogManagForm.jsx';
import UpdateBlogs from './Components/Blogs/UpdateBlogs.jsx';
import BlogManageTable from './Components/Blogs/BlogManageTable.jsx';
import FaqManageTable from './Components/Faqs/FaqManageTable.jsx';
import FaqManageForm from './Components/Faqs/FaqManageForm.jsx';
import UpdateFaq from './Components/Faqs/UpdateFaq.jsx';
import FaqWebForm from'./Components/Faqs/FaqWebForm.jsx';
import FaqWebTable from './Components/Faqs/FaqWebTable.jsx';
import UpdateFaqWeb from './Components/Faqs/UpdateFaqWeb.jsx';
import PageFaqManageForm from './Components/Faqs/PageFaqManageForm.jsx';
import PageFaqManageTable from './Components/Faqs/PageFaqManageTable.jsx';
import UpdatePageFaq from './Components/Faqs/UpdatePageFaq.jsx';

import ServicesAndOffers from './Components/AddServices/ServicesAndOffers.jsx';
import AddServicesAndOffers from './Components/AddServices/AddServicesAndOffers.jsx';
import UpdateServiceAndOffers from './Components/AddServices/UpdateServiceAndOffers.jsx';


import AssignmenType from './Components/AddServices/AssignmenType.jsx';
import AssignmentTypeTable from './Components/AddServices/AssignmentTypeTable.jsx';
import UpdateAssignmentType from './Components/AddServices/UpdateAssignmentType.jsx';

import ContenType from './Components/AddServices/ContenType.jsx';
import ContentTypeTable from './Components/AddServices/ContentTypeTable.jsx';
import UpdateContentType from './Components/AddServices/UpdateAssignmentType.jsx';

import TopServiceTable from './Components/AddServices/TopServiceTable.jsx';
import TopOfferTable from './Components/AddServices/TopOfferTable.jsx';
import BottomServiceTable from './Components/AddServices/BottomServiceTable.jsx';
import BottomOfferTable from './Components/AddServices/BottomOfferTable.jsx';


import PagesContent from './Components/AddServices/PagesContent.jsx';
import PageContentTable from './Components/AddServices/PageContentTable.jsx';

import WritesAndContent from './Components/ManageWriters/WritersAndContent.jsx';
import AddWriters from './Components/ManageWriters/AddWritersForm.jsx';
import UpdateWriters from './Components/ManageWriters/UpdateWriters.jsx';
import AddWritersContent from './Components/ManageWriters/AddWritersContent.jsx';
import AddWritersReviews from './Components/ManageWriters/AddWritersReviews.jsx';
import AddWritersReviewTable from './Components/ManageWriters/WritersReviewTable.jsx';
import WriterScreen from './Components/ManageWriters/WriterScreen.jsx';
import WritersTable from './Components/ManageWriters/WritersTable.jsx';
import WritersContentTable from './Components/ManageWriters/WritersContentTable.jsx';
import UpdateWritersContent from './Components/ManageWriters/UpdateWritersContent.jsx';


import CreateOrder from './Components/Order/CreateOrderForm.jsx';
import OrderFormSubReq from './Components/Order/OrderFormSubRequirements.jsx';

import Footer from './Components/Footer.jsx';


function App() {
  const [login,setLogin] = useState(false);

  const SetLocalLogin= async ()=>{
    try{
      let userLogin = await AsyncStorage.getItem('logIN');
      let parsed = JSON.parse(userLogin);
      if(parsed !== null){
        setLogin(parsed);
      }
    }catch{
        return null;
    }
  }
  useEffect(() => {
    SetLocalLogin()
  }, [])
  


  return (
    <div>
     {
        login === false?  
        <Router>
            <Routes>
            <Route path="/" element={<CustomerLogin/>}/>

            <Route path="/CustomerRegisteration" element={<CustomerReg/>}/>
          </Routes>
      </Router>
      : 
     
      <Router> 

      <Header/>
      <SideBar/>

      <Routes >
      <Route path="/" element={<UserProfile/>}/>
      <Route path="/ControlContent" element={<ControlContent/>}/>
      <Route path="/BlogManageTable" element={<BlogManageTable/>}/>
      <Route path="/BlogManageFrom" element={<BlogManageFrom/>}/>
      <Route path="/updateBlogs" element={<UpdateBlogs/>}/>
      <Route path="/FaqManageTable" element={<FaqManageTable/>}/>
      <Route path="/FaqManageForm" element={<FaqManageForm/>}/>
      <Route path="/UpdateFaq" element={<UpdateFaq/>}/>
      <Route path="/FaqWebForm" element={<FaqWebForm/>}/>
      <Route path="/FaqWebTable" element={<FaqWebTable/>}/>
      <Route path="/UpdateFaqWeb" element={<UpdateFaqWeb/>}/>
      <Route path="/PageFaqManageForm" element={<PageFaqManageForm/>}/>
      <Route path="/PageFaqManageTable" element={<PageFaqManageTable/>}/>
      <Route path="/UpdatePageFaq" element={<UpdatePageFaq/>}/>


      <Route path="/AssignmenType" element={<AssignmenType/>}/>
      <Route path="/AssignmentTypeTable" element={<AssignmentTypeTable/>}/>
      <Route path="/UpdateAssignmentType" element={<UpdateAssignmentType/>}/>



      <Route path="/ContenType" element={<ContenType/>}/>
      <Route path="/ContentTypeTable" element={<ContentTypeTable/>}/>
      <Route path="/UpdateContentType" element={<UpdateContentType/>}/>



      <Route path="/ServicesAndOffers" element={<ServicesAndOffers/>}/>
      <Route path="/AddServicesAndOffers" element={<AddServicesAndOffers/>}/>
      <Route path="/UpdateServiceAndOffers" element={<UpdateServiceAndOffers/>}/>

      
      <Route path="/TopServiceTable" element={<TopServiceTable/>}/>
      <Route path="/TopOfferTable" element={<TopOfferTable/>}/>
      <Route path="/BottomServiceTable" element={<BottomServiceTable/>}/>
      <Route path="/BottomOfferTable" element={<BottomOfferTable/>}/>

      
      <Route path="/PagesContent" element={<PagesContent/>}/>
      <Route path="/PageContentTable" element={<PageContentTable/>}/>



      <Route path="/WritesAndContent" element={<WritesAndContent/>}/>
      <Route path="/AddWriters" element={<AddWriters/>}/>
      <Route path="/UpdateWriters" element={<UpdateWriters/>}/>
      <Route path="/AddWritersContent" element={<AddWritersContent/>}/>

      <Route path="/AddWritersReviews" element={<AddWritersReviews/>}/>
      <Route path="/AddWritersReviewTable" element={<AddWritersReviewTable/>}/>


      <Route path="/WriterScreen" element={<WriterScreen/>}/>
      <Route path="/WritersTable" element={<WritersTable/>}/>

      <Route path="/WritersContentTable" element={<WritersContentTable/>}/>
      <Route path="/UpdateWritersContent" element={<UpdateWritersContent/>}/>

      <Route path="/CreateOrder" element={<CreateOrder/>}/>
      <Route path="/OrderFormSubReq" element={<OrderFormSubReq/>}/>

      

      
      </Routes>

      <Footer/>
      
    </Router>
    } 

    </div>
  );
}

export default App;
