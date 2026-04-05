
import './Styles/Main_Style.css';


import LinksImage from "./Images/external-link.png";
import HomeImage from "./Images/home-button.png";
import ImageGallery from "./Images/image-gallery.png";
import MoreImage from "./Images/more.png";
import PhoneImage from "./Images/telephone2.png";
import GearsImage from "./Images/settings.png";
import BgImage from "./Images/bg.jpg";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';




function Main() {
    
    setInterval(() => {
    const el = document.getElementById("time");
    if (el) {
    el.innerText = new Date().toLocaleTimeString();
    }
    }, 1000);
  


     const scrollToHome = () => {
        const element = document.getElementById("Home");
        if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        }
    };

      const scrollToAbout = () => {
        const element = document.getElementById("About");
        if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        }
    };



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
        
        <div id='main_container'>
            <div id='side_navbar'>
                
                <img className='side-bar-imgs' src={MoreImage}></img>

                <div className='nav-images-container' onClick={scrollToHome}>
                    <div className='nav-items'>
                        <img className='side-bar-imgs-alt' src={HomeImage}></img>
                    </div>

                    <div className='nav-items' onClick={scrollToAbout}>
                        <img className='side-bar-imgs-alt' src={GearsImage}></img>
                    </div>
                    
                    <div className='nav-items'>
                        <img className='side-bar-imgs-alt' src={ImageGallery}></img>
                    </div>

                    <div className='nav-items'>
                        <img className='side-bar-imgs-alt' src={PhoneImage}></img>
                    </div>

                   
                 
                </div>

                <img className='side-bar-imgs' src={LinksImage}></img>
            
            </div>
            <div id='content_container'>


            <div className='fixed_navbar fade-in-up'>
                <p className='navbar_name'>Canada, BC</p>
                <div id="time"></div>
            </div>

            <div id='Home' className='hero_container fade-in-up'>
                <h1 id='hero_title' className=''>Lukas Leins - Web / Full <br></br>Stack Developer</h1>
                <p id='hero_sub_text'>about me</p>
                <p id='about_me_text'>I studied Computer Science for two years before droppping out and teaching myself full-stack development. I’ve now been working professionally as a web developer for over two years, building and maintaining modern web and full stack applications.</p>

            </div>

           
            <div id='About' className='about-container fade-in-up'>
                <h1 id='about_title' className=''>What I <br></br>Specialize In</h1>
                <div className='Skills_container'>
                    <div className='Skills'>React.js</div>
                    <div className='Skills'>Next.js</div>
                    <div className='Skills'>Javascript</div>
                    <div className='Skills'>Typescript</div>
                    <div className='Skills'>SQL</div>
                    <div className='Skills'>PHP</div>
                    <div className='Skills'>CSS</div>
                    <div className='Skills'>More...</div>
                   
                </div>

                <div className="container">
                    <div className="grid">

                
                    <div className="card">
                        <img className='card-bg' src={BgImage}></img>
                    <div className="icon-wrapper">
                            <img className='icon' src={PhoneImage}></img>
                        </div>
                        <h3>Full-Stack Applications</h3>
                        <p>We help you to design a single web pages and will convert your designated visitors into potential customers.</p>
                    </div>


                    <div className="card">
                        <img className='card-bg' src={BgImage}></img>
                    <div className="icon-wrapper">
                            <img className='icon' src={PhoneImage}></img>
                        </div>
                        <h3>Custom Wordpress</h3>
                        <p>Complete business websites with complex and multiple pages, CMS and high SEO performance.</p>
                    </div>

                
                    <div className="card">
                        <img className='card-bg' src={BgImage}></img>
                        <div className="icon-wrapper">
                            <img className='icon' src={PhoneImage}></img>
                        </div>
                        <h3>Elementor Websites</h3>
                        <p>Building web design I made into fully functional websites, using (no)Code platform. Ensuring seamless UX.</p>
                    </div>

                    <div className="card">
                        <img className='card-bg' src={BgImage}></img>
                        <div className="icon-wrapper">
                            <img className='icon' src={PhoneImage}></img>
                        </div>
                        <h3>Shopify & Woocommerce</h3>
                        <p>We help you to design a single web pages which convert visitors into potential customers.</p>
                    </div>

                
                    <div className="card">
                        <img className='card-bg' src={BgImage}></img>
                        <div className="icon-wrapper">
                            <img className='icon' src={PhoneImage}></img>
                        </div>
                        <h3>Custom Jetengine Websites</h3>
                        <p>Aesthetic yet user-friendly interface to help users achieve their goals in a pleasing and memorable way.</p>
                    </div>


                    <div className="card">
                        <img className='card-bg' src={BgImage}></img>
                        <div className="icon-wrapper">
                            <img className='icon' src={PhoneImage}></img>
                        </div>
                        <h3>Client Management & Relations</h3>
                        <p>Aesthetic yet user-friendly interface to help users achieve their goals in a pleasing and memorable way.</p>
                    </div>

                    </div>
                </div>


            </div>






            </div>
        </div>


     

     


      </div>
    );
  }
  
  export default Main;
  