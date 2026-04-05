
import './Styles/Main_Style.css';


import LinksImage from "./Styles/Images/external-link.png";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';




function Main() {
    
    setInterval(() => {
    const el = document.getElementById("time");
    if (el) {
    el.innerText = new Date().toLocaleTimeString();
    }
    }, 1000);
  




    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Lukas Leins';
          const elements = document.querySelectorAll(".fade-in-up");

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
            });
        });

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
            }, []); 


    return (
      <div id="Main_Component">
        
        <div className='main_container'>
            <div id='side_navbar'><img src={LinksImage}></img></div>
            <div id='content_container'>


            <div className='fixed_navbar fade-in-up'>
                <p className='navbar_name'>Canada, BC</p>
                <div id="time"></div>
            </div>

            <div className='hero_container fade-in-up'>
                <h1 id='hero_title' className=''>Lukas Leins - Web / Full <br></br>Stack Developer</h1>
                <p id='hero_sub_text'>about me</p>
                <p id='about_me_text'>I studied Computer Science for two years before droppping out and teaching myself full-stack development. I’ve now been working professionally as a web developer for over two years, building and maintaining modern web and full stack applications.</p>

            </div>


            </div>
        </div>


     

     


      </div>
    );
  }
  
  export default Main;
  