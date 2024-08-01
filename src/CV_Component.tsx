import "./Styles/CV_Style.css";
//@ts-ignore
import LeftArrow2 from "./Images/LeftArrow2.png";
//@ts-ignore
import printer from "./Images/printer.png";
//@ts-ignore
import big_git from "./Images/big_git.png";
//@ts-ignore
import big_link from "./Images/big_link.png";
//@ts-ignore
import source_code from "./Images/code.png";
//@ts-ignore
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';




function CV() {


    

    function Open_GitHub() {
        const githubUrl = "https://github.com/lleins";
        window.open(githubUrl, '_blank');
    }

    function openLinkedIn() {
        const linkedinUrl = "https://www.linkedin.com/in/lukas-leins-802474208";
        window.open(linkedinUrl, '_blank');
    }



    const navigate = useNavigate();

    function goBack(){

        navigate('/');

    }


    function openPDF() {
        const pdfUrl = process.env.PUBLIC_URL + '/Lukas%20Leins%20Resume%202024.pdf';
        window.open(pdfUrl, '_blank');
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'CV | Lukas Leins';
    }, []); 




    return (
        <div id="CV_Component">
          <div style={{ height: 'calc(100% + 100px)' }} className="Load_Item">
            <div id="top_nav">
              <p id="back_button" onClick={goBack}>
                <img id="Back_Arrow" src={LeftArrow2} onClick={goBack} /> Back
              </p>
              <img id="print_img" onClick={openPDF} src={printer} />
            </div>
    
            <div id="Resume_Container">
              <div style={{ position: 'relative', filter: 'brightness(95%)', boxShadow: '0px 0px 10px 5px rgba(255, 255, 255, 0)', width: '100%', height: "auto", paddingTop: '129.4118%', paddingBottom: 0, overflow: 'hidden' }}>
                <div id="Loader_container">
                  <div className="loader"></div>
                </div>
                <iframe style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }} src="https://www.canva.com/design/DAF_UzWmcss/wwH5mhgopx1uoQkAu1ROvw/view?embed"></iframe>
              </div>
            </div>
    
            <div id="bottom_socials_container_cv">
             
              <p id="source_code_text"> <img id="source_code_img" src={source_code}/> Source Code</p>
            </div>
          </div>
   
        </div>
      );
    }
    
    export default CV;
  