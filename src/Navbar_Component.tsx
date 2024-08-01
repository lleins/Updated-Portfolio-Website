import "./Styles/Navbar_Style.css";
//@ts-ignore
import menu_mobile from "./Images/menu_mobile.png";
//@ts-ignore
import close_mobile from "./Images/close_mobile.png";
//@ts-ignore
import right_arrow_mobile from "./Images/right_arrow_mobile.png";
//@ts-ignore
import port_pic from "./Images/port_pic.png";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {

  function scrollintoview_Home() {
    const targetDiv = document.getElementById("Main_home_tab");
    if(targetDiv)targetDiv.scrollIntoView({ behavior: 'smooth' });
  }

  function scrollintoview_projects() {
      const targetDiv = document.getElementById("Projects_tab");
      if(targetDiv)targetDiv.scrollIntoView({ behavior: 'smooth' });
  }

  function scrollintoview_resume() {
      const targetDiv = document.getElementById("scroll_resume_container");
      if(targetDiv)targetDiv.scrollIntoView({ behavior: 'smooth' });
  }

  function scrollintoview_contact() {
      const targetDiv = document.getElementById("Marker");
      if(targetDiv)targetDiv.scrollIntoView({ behavior: 'smooth' });
  }




  function go_home() {
    const targetDiv = document.getElementById("top_marker_home");
    if(targetDiv)targetDiv.scrollIntoView({ behavior: 'smooth' });
  }


  function scrollintoview_contact_mobile() {
    const targetDiv = document.getElementById("Marker");
    if(targetDiv)targetDiv.scrollIntoView({ behavior: 'instant' });
  }

  function scrollintoview_projects_mobile() {
    const targetDiv = document.getElementById("Projects_tab");
    if(targetDiv)targetDiv.scrollIntoView({ behavior: 'instant' });
  }

    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('NavBar_Component');
        const mobile_navbar = document.getElementById("mobile_navbar");
        if (window.scrollY > 50) {
           if(navbar)navbar.style.backgroundColor = 'rgba(25, 25, 25, 1)'; 
           if(mobile_navbar)mobile_navbar.style.backgroundColor = 'rgba(25, 25, 25, 1)'; 
           const mobile_nav = document.getElementById("mobile_navbar");
           if(mobile_nav){
             const mobile_nav_style = getComputedStyle(mobile_nav);
             if(mobile_nav_style.height === "0px"){
              if(mobile_navbar)mobile_navbar.style.borderBottom = "0px solid rgb(25, 25, 25)";
             }else{
              if(mobile_navbar)mobile_navbar.style.borderBottom = "0px solid rgb(25, 25, 25)";
             }
           }
        } else {
            if(navbar)navbar.style.backgroundColor = 'rgba(25, 25, 25, 0)'; 
            if(mobile_navbar)mobile_navbar.style.backgroundColor = 'rgba(20, 20, 20, 0)'; 
            if(mobile_navbar)mobile_navbar.style.borderBottom = "0px solid rgb(25, 25, 25)";
        }
    });
    

    function check_open_close_mobile(){

      const mobile_nav = document.getElementById("mobile_navbar");
      if(mobile_nav){
        const mobile_nav_style = getComputedStyle(mobile_nav);
        if(mobile_nav_style.height === "0px"){
          open_navbar_mobile();
        }else{
          close_navbar_mobile();
        }
      }
      

    }


    function open_navbar_mobile(){
      const proj_mobile = document.getElementById("proj_mobile");
      const contact_mobile = document.getElementById("contact_mobile");
      const resume_mobile = document.getElementById("resume_mobile");

      const mobile_navbar = document.getElementById("mobile_navbar");
      if(mobile_navbar)mobile_navbar.classList.remove("mobile_menu_comes_out");
      if(mobile_navbar)mobile_navbar.classList.add("mobile_menu_comes_in");
      if(mobile_navbar)mobile_navbar.style.borderBottom = "0px solid rgb(30, 30, 30)";

      setTimeout(() => {
        if(resume_mobile)resume_mobile.style.display = "flex";
        if(contact_mobile)contact_mobile.style.display = "flex";
        if(proj_mobile)proj_mobile.style.display = "flex";
        setTimeout(() => {
          if(resume_mobile)resume_mobile.style.opacity = "1";
          if(contact_mobile)contact_mobile.style.opacity = "1";
          if(proj_mobile)proj_mobile.style.opacity = "1";
        }, 1);
      }, 100);
  
    }

     
  
    function close_navbar_mobile(){
      
      const proj_mobile = document.getElementById("proj_mobile");
      const contact_mobile = document.getElementById("contact_mobile");
      const resume_mobile = document.getElementById("resume_mobile");
      const mobile_navbar = document.getElementById("mobile_navbar");
      const mobile_nav = document.getElementById("mobile_navbar");
      if(mobile_nav){
        const mobile_nav_style = getComputedStyle(mobile_nav);
        if(mobile_nav_style.height === "0px"){
        }else{
          if(mobile_navbar)mobile_navbar.classList.remove("mobile_menu_comes_in");
          if(mobile_navbar)mobile_navbar.classList.add("mobile_menu_comes_out");
          if(mobile_navbar)mobile_navbar.style.borderBottom = "0px solid rgb(30, 30, 30)";
          setTimeout(() => {
            if(resume_mobile)resume_mobile.style.opacity = "0";
            if(contact_mobile)contact_mobile.style.opacity = "0";
            if(proj_mobile)proj_mobile.style.opacity = "0";
            setTimeout(() => {
              if(resume_mobile)resume_mobile.style.display = "none";
              if(contact_mobile)contact_mobile.style.display = "none";
              if(proj_mobile)proj_mobile.style.display = "none";
            }, 1);
          }, 450);
        }
      }

    }


  const navigate = useNavigate();

  function go_to_cv(){

      navigate('/cv');

  }

    document.body.addEventListener('click', function(event) {
      var targetElement = event.target as Element; 
      
      if (targetElement) {
  
          if (!targetElement.closest('#mobile_navbar') && targetElement.id !== 'menu_img') {
    
            close_navbar_mobile();
          }
      }
    });


    return (
      <div id="NavBar_Component">
        <div id="Navbar_Parent_Container">
            <p id="top_name" onClick={() => {go_home(); close_navbar_mobile();}}>LUKAS LEINS</p>
            <div id="Nav_Bar_Links">
                <button className="bottom_nav_items" onClick={scrollintoview_projects}>PROJECTS</button>
                <button className="bottom_nav_items" onClick={scrollintoview_contact}>CONTACT</button>
                <button id="resume_top" className="bottom_nav_items" onClick={go_to_cv}>CV</button>
                <img id="menu_img" onClick={check_open_close_mobile} src={menu_mobile}/>
            </div>
        </div>

        <div id="mobile_navbar">
          <div id="mobile_navbar_secondary">
            <button id="proj_mobile" className="bottom_nav_items_mobile" onClick={() => {scrollintoview_projects(); check_open_close_mobile();}}>PROJECTS</button>
            <button id="contact_mobile" className="bottom_nav_items_mobile" onClick={() => {scrollintoview_contact(); check_open_close_mobile();}}>CONTACT</button>
            <button id="resume_mobile" className="bottom_nav_items_mobile" onClick={() => {go_to_cv(); check_open_close_mobile();}}>CV</button>
          </div>
        </div>

      </div>
    );
  }
  
  export default Navbar;
  