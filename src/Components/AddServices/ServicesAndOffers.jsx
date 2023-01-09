import manageBlog from '../../Images/manageBlogs.svg';
import manageFaq from '../../Images/manageFaq.svg';
import avtG from '../../Images/avtG.svg';
import {Link } from 'react-router-dom';
import React from 'react';


const ServicesAndOffers = () => {
  return (
    <>
    <div className="app-content content">
  <div className="content-wrapper container-xxl p-0">
   
    <div className="content-body">

      {/* Basic Vertical Navs start */}
      <section id="basic-nav-components">
        <div className="row match-height">
          {/* Vertical Nav starts */}
          <div className="col-lg-6 col-md-12">
            <div className="card p-3">
              {/* <Link to="/TopServiceTable" className="btn btn-outline-primary btn-sm-block col-6 mx-auto">Show table</Link> */}
              <div className="card-body">
                <div className="d-flex justify-content-center">
                <Link  to="/TopServiceTable"  className="avatar bg-light-primary p-2">
                    <span className="avatar-content">
                    <img src={manageBlog} alt="" />
                    </span>
                </Link>
                </div>
                <h3 className="text-center mt-2"style={{fontWeight:"700"}}>Top Services</h3>
                <p className="text-center mt-1">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                </p>

                
              </div>
            </div>
          </div>
          {/* Vertical Nav ends */}
          {/* Vertical Nav with Border starts */}
          <div className="col-lg-6 col-md-12">
          <div className="card p-3">
              
              <div className="card-body">
                <div className="d-flex justify-content-center">
                <Link to="/BottomServiceTable"  lassName="avatar bg-light-primary p-2">
                    <span className="avatar-content">
                    <img src={manageFaq} alt="" />
                    </span>
                </Link>
                </div>
                <h3 className="text-center mt-2"style={{fontWeight:"700"}}>Bottom Services</h3>
                <p className="text-center mt-1">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                </p>

                
              </div>
            </div>
          </div>
          {/* Vertical Nav with Border ends */}

          {/* Vertical Nav with Square Border starts */}
          <div className="col-lg-6 col-md-12">
          <div className="card p-3">
              
              <div className="card-body">
                <div className="d-flex justify-content-center">
                <Link to="/TopOfferTable"  state={{id:3, Headers:"Top Offers",Input:"Enter Top Offers"}} className="avatar bg-light-primary p-2">
                    <span className="avatar-content">
                    <img src={avtG} alt="" />
                    </span>
                </Link>
                </div>
                <h3 className="text-center mt-2"style={{fontWeight:"700"}}>Top Offers</h3>
                <p className="text-center mt-1">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                </p>

                
              </div>
            </div>
          </div>
          {/* Vertical Nav with Square Border ends */}

         
          {/* Vertical Nav with Square Border starts */}
          <div className="col-lg-6 col-md-12">
          <div className="card p-3">
              
              <div className="card-body">
                <div className="d-flex justify-content-center">
                <Link to="/BottomOfferTable"  className="avatar bg-light-primary p-2">
                    <span className="avatar-content">
                    <img src={avtG} alt="" />
                    </span>
                </Link>
                </div>
                <h3 className="text-center mt-2"style={{fontWeight:"700"}}  >Bottom Offers</h3>
                <p className="text-center mt-1">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                </p>

                
              </div>
            </div>
          </div>
          {/* Vertical Nav with Square Border ends */}

          <div className="col-lg-6 col-md-12">
          <div className="card p-3">
              
              <div className="card-body">
                <div className="d-flex justify-content-center">
                <Link to="/AssignmentTypeTable"  className="avatar bg-light-primary p-2">
                    <span className="avatar-content">
                    <img src={avtG} alt="" />
                    </span>
                </Link>
                </div>
                <h3 className="text-center mt-2"style={{fontWeight:"700"}}  >Assignment Type</h3>
                <p className="text-center mt-1">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                </p>

                
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
          <div className="card p-3">
              
              <div className="card-body">
                <div className="d-flex justify-content-center">
                <Link to="/ContentTypeTable"  className="avatar bg-light-primary p-2">
                    <span className="avatar-content">
                    <img src={avtG} alt="" />
                    </span>
                </Link>
                </div>
                <h3 className="text-center mt-2"style={{fontWeight:"700"}}>Content Type</h3>
                <p className="text-center mt-1">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                </p>

                
              </div>
            </div>
          </div>
         
        </div>
      </section>
      {/* Basic Vertical Navs end */}
    </div>
  </div>
</div>
    </>
  )
}

export default ServicesAndOffers