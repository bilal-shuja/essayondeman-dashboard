import React,{useState} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseUrl from './GettingURLTwo.js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';


const BlogManagForm = () => {
  const [blogImage, setBlogImage] = useState('');
  const [autherImg , setAutherImg] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [blogDetails, setBlogDetails] = useState({
    title:'',
    category:'',
    autherName:'',
  });

  const inputHandler = (e) => {
    setBlogDetails({ ...blogDetails, [e.target.name]: e.target.value });
  };

//   const uploadImage = async (e)=>{
//     const file =e.target.files[0]; 
//     const base64 = await convertBase64(file);
//     setProfileImage(base64);
//   }


//   const convertBase64 = (file)=>{
//       return new Promise((resolve,reject)=>{
//         const fileReader = new FileReader();
//         fileReader.readAsDataURL(file);

//         fileReader.onload= ()=>{
//           resolve(fileReader.result)
//         };
        
//         fileReader.onerror=(error)=>{
//           reject(error)
//         };

        
// })
//   }


  const blogContent = draftToHtml(convertToRaw(editorState.getCurrentContent()))
  const submitBlogs = ()=>{
    var formdata = new FormData();
formdata.append("role_id", "4");
formdata.append("auther_name", blogDetails.autherName);
formdata.append("auther_image", autherImg);
formdata.append("title", blogDetails.title);
formdata.append("permalink", "Something");
formdata.append("category", blogDetails.category);
formdata.append("content", blogContent);
formdata.append("image", blogImage);



    axios.post(`${BaseUrl}postblog`,formdata)
    .then(res =>{
      toast.info("Blog Posted!")
      console.log(formdata)
        window.location.reload(true);
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
    <div>
       {/* BEGIN: Content*/}
<div className="app-content content ">
  <div className="content-wrapper container-xxl p-0">
    <div className="content-header row">
      <div className="content-header-left col-md-9 col-12 mb-2">
        <div className="row breadcrumbs-top">
          <div className="col-12">
            <h2 className="content-header-title float-start mb-0">Enter Blog Details</h2>
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
    <div className="content-body">
      {/* Input Mask start */}
      <section id="input-mask-wrapper">
        <div className="row">
          <div className="col-md-12">
            <div className="card " >
              <div className="card-header">
                <h4 className="card-title">Blog Details </h4>
              </div>
              <div className="card-body">
                <div className="row">

                <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b> Auther*</b></label>
                    <input type="text" className="form-control credit-card-mask" maxLength={35} name="autherName" value={blogDetails.autherName} onChange={inputHandler} placeholder="Enter blog Title" id="credit-card" />
                  </div>

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="blocks"> <b>Auther Image*</b></label>
                    <input type="file" className="form-control block-mask"  onChange={(e)=>{
                      setAutherImg(e.target.files[0])
                    }} id="blocks" />
                  </div>

                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="credit-card"> <b> Blog Title*</b></label>
                    <input type="text" className="form-control credit-card-mask" maxLength={40} name="title" value={blogDetails.title} onChange={inputHandler} placeholder="Enter blog Title" id="credit-card" />
                  </div>
                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="phone-number"> <b>Blog Category*</b> </label>
                    <div className="input-group input-group-merge">
                      {/* <span className="input-group-text">US (+1)</span> */}
                      <input type="text" maxLength={28}className="form-control phone-number-mask" name="category"  value={blogDetails.category} onChange={inputHandler} placeholder="Enter Category" id="phone-number" />
                    </div>
                  </div>


                  <div className="col-xl-4 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="blocks"> <b>Blog Image*</b></label>
                    <input type="file" className="form-control block-mask"  onChange={(e)=>{
                      setBlogImage(e.target.files[0])
                    }} id="blocks" />
                  </div>

               
                <div className="col-xl-12 col-md-6 col-sm-12 mb-2">
                    <label className="form-label" htmlFor="blocks"> <b>Blog Content*</b> </label>
                    <Editor  
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={setEditorState}
               
                    />
                  </div>

                 
                  <div className="text-end">
                    <div className="btn btn-primary" onClick={submitBlogs}>Submit</div>
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
{/* END: Content*/}

    </div>
  )
}

export default BlogManagForm