import React from 'react'

const Footer = () => {
  return (
    <>
         <footer className="footer footer-static footer-light" style={{marginTop:"10em"}}>
    <p className="clearfix mb-0"><span className="float-md-start d-block d-md-inline-block mt-25">COPYRIGHT © 2021<a className="ms-25" href="https://alphanites.netlify.app/" target="_blank">Alphanites Pvt ltd</a><span className="d-none d-sm-inline-block">, All rights Reserved</span></span><span className="float-md-end d-none d-md-block">Hand-crafted<i data-feather="heart" /></span></p>
  </footer>
  <button className="btn btn-primary btn-icon scroll-top" type="button"><i data-feather="arrow-up" /></button>
    </>
  )
}

export default Footer