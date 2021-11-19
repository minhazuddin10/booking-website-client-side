import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footerarea">
          <div className="container">
            <div className="topfooter">
              <div className="row">
                 
 
                <div className="col-lg-6 col-md-10 footerlink">
                  <h5>Quick Links</h5>
                  <ul>
                     
                    <li>Sales</li>
                    <li>Contact</li>
                    <li>Our blog</li>
                  </ul>
                </div>
                <div className="col-lg-6 col-md-10">
                  <h5>About us</h5>
                  <p>
                    consectetur adipiscing elit. Purus commodo ipsum duis
                    laoreet maecenas.
                  </p>
                   
                </div>
              </div>
              <div className="botomfooter   text-start ">
                <p>Copyright &copy; by || minhaz 2021</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
