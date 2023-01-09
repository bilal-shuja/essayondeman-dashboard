import React from 'react';
import {Link } from 'react-router-dom';


const WritersAndContent = () => {
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
              
              <div className="card-body">
                <div className="d-flex justify-content-center">
                <Link  to="/WritersTable" className="avatar bg-light-primary p-2">
                    <span className="avatar-content">
                    <i className="fa-solid fa-users" style={{fontSize:"3em"}}></i>
                    </span>
                </Link>
                </div>
                <h3 className="text-center mt-2"style={{fontWeight:"700"}}>Add Writers</h3>
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
                <Link to="/WritersContentTable" className="avatar bg-light-primary p-2">
                    <span className="avatar-content">
                    <i className="fa-solid fa-user-pen" style={{fontSize:"2.7em"}}></i>
                    </span>
                </Link>
                </div>
                <h3 className="text-center mt-2"style={{fontWeight:"700"}}>Add Content</h3>
                <p className="text-center mt-1">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                </p>

                
              </div>
            </div>
          </div>
          {/* Vertical Nav with Border ends */}

             {/* Vertical Nav with Border starts */}
             <div className="col-lg-6 col-md-12">
          <div className="card p-3">
              
              <div className="card-body">
                <div className="d-flex justify-content-center">
                <Link to="/AddWritersReviews" className="avatar bg-light-primary p-2">
                    <span className="avatar-content">
                    <i className="fa-solid fa-chalkboard-user" style={{fontSize:"2.7em"}}></i>
                    </span>
                </Link>
                </div>
                <h3 className="text-center mt-2"style={{fontWeight:"700"}}>Add Writer Reviews</h3>
                <p className="text-center mt-1">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                </p>

                
              </div>
            </div>
          </div>
          {/* Vertical Nav with Border ends */}

        </div>
      </section>
      {/* Basic Vertical Navs end */}
    </div>
  </div>
</div>
    </>
  )
}

export default WritersAndContent