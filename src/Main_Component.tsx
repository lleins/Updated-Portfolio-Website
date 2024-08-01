import "./Styles/Main_Style.css";
//@ts-ignore
import main_vid from "./Videos/Back_2_slower.mp4";
//@ts-ignore
import big_git from "./Images/big_git.png";
//@ts-ignore
import big_link from "./Images/big_link.png";
//@ts-ignore
import big_email from "./Images/big_email.png";
//@ts-ignore
import big_cv from "./Images/big_cv.png";
//@ts-ignore
import port_pic from "./Images/port_pic.png";
//@ts-ignore
import NewLogo from "./Images/NewLogo.png";
//@ts-ignore
import Logo_XLarge from "./Images/Logo_XLarge.png";
//@ts-ignore
import sent_1 from "./Images/sent_1.png";
//@ts-ignore
import sent_0 from "./Images/sent_0.png";
//@ts-ignore
import logo_white from "./Images/logo_white.png";
//@ts-ignore
import logo from "./Images/logo.png";
//@ts-ignore
import Logo_iron from "./Images/Logo_iron.png";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';




function Main() {
    var screenWidth = window.innerWidth;
    function calls_dots(){
        function return_screen_value(){
            if(screenWidth >= 950){
                //console.log("here 7");
                return 7;
            }else{
                //console.log("here 2");
                return 2;
            }
        }

        function return_screen_value_count(){
            if(screenWidth >= 950){
           
                return 200;
            }else{
         
                return 100;
            }
        }

        function return_screen_value_speed(){
            if(screenWidth >= 950){
           
                return 0.09;
            }else{
         
                return 0.03;
            }
        }

        var size_value = return_screen_value();
        var size_value_count = return_screen_value_count();
        var size_value_speed = return_screen_value_speed();
   
        var maxx = document.body.clientWidth;
        var maxy = document.body.clientHeight;
        var halfx = maxx / 2;
        var halfy = maxy / 2;
        var canvas = document.getElementById("canvas_main") as HTMLCanvasElement;

        if (canvas) {
            canvas.width = maxx;
            canvas.height = maxy;
            var context = canvas.getContext("2d");

            if (context) {
                var dotCount = size_value_count;
                var dots: Dot[] = [];

        
                context.fillStyle = "rgb(20, 20, 20)";
                context.fillRect(0, 0, maxx, maxy);

            
                for (var i = 0; i < dotCount; i++) {
                    dots.push(new Dot());
                }

        
                function render() {
                    if (context) {
                        context.fillStyle = "rgb(20, 20, 20)";
                        context.fillRect(0, 0, maxx, maxy);
                        for (var i = 0; i < dotCount; i++) {
                            dots[i].draw(context); 
                            dots[i].move();
                        }
                        requestAnimationFrame(render);
                    }
                }

                // Define Dot type
                interface Dot {
                    rad_x: number;
                    rad_y: number;
                    alpha: number;
                    speed: number;
                    size: number;
                    color: number;
                    draw(ctx: CanvasRenderingContext2D): void;
                    move(): void;
                }
    
      
              
                console.log(size_value);

                function Dot(this: Dot) {
                    this.rad_x = 2 * Math.random() * halfx + 1;
                    this.rad_y = 1.2 * Math.random() * halfy + 1;
                    this.alpha = Math.random() * 360 + 1;
                    this.speed = Math.random() * 100 < 50 ? 1 : -1;
                    this.speed *= size_value_speed;
                    this.size = Math.random() * size_value  + 1;
                    console.log( this.size );
                    this.color = Math.floor(Math.random() * 256);
                }

                Dot.prototype.draw = function (this: Dot, ctx: CanvasRenderingContext2D) {
                    var dx = halfx + this.rad_x * Math.cos(this.alpha / 180 * Math.PI);
                    var dy = halfy + this.rad_y * Math.sin(this.alpha / 180 * Math.PI);

                
                    ctx.fillStyle = "rgb(" + this.color + "," + this.color + "," + this.color + ")";

                
                    ctx.beginPath();
                    ctx.arc(dx, dy, this.size, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                };

                // Update dot position in polar coordinates
                Dot.prototype.move = function (this: Dot) {
                    this.alpha += this.speed;

                    // Change color
                    if (Math.random() * 100 < 50) {
                        this.color += 1;
                    } else {
                        this.color -= 1;
                    }
                };


                render();
            
            }
        }
    }

    function Call_Flask(): void {
        const button = document.getElementById('MainButton') as HTMLButtonElement | null;
        const buttonText = button?.innerHTML ?? '';
    
        // Early return if button is not found
        if (!button) return;
    
        // Disable button while sending
        button.disabled = true;
    
        // Change text to "Sending..."
        button.innerHTML = 'Sending';
    
        // Add dots every half second
        let dots = '';
        const interval = setInterval(() => {
            // Add a dot
            dots += '.';
            button.innerHTML = 'Sending' + dots;
    
            // After 3 dots, reset
            if (dots.length === 3) {
                dots = '';
            }
        }, 500);
    
        const TimetoHide = 6000; // TypeScript will infer type based on usage, but this is currently unused in your code
    
        // Element references
        const sent_1 = document.getElementById("sent_1") as HTMLElement | null;
        const sent_0 = document.getElementById("sent_0") as HTMLElement | null;
        const Fail = document.getElementById('fail_notif') as HTMLElement | null;
        const Success = document.getElementById('success_notif') as HTMLElement | null;
        const Main_Button = document.getElementById("MainButton") as HTMLButtonElement | null;
        const Loader_Contact = document.getElementById("MainButton") as HTMLElement | null;
    
        // Input values and elements
        const NameText = (document.getElementById('NameTextBox') as HTMLInputElement).value;
        const ClearNameText = document.getElementById('NameTextBox') as HTMLInputElement;
    
        const EmailText = (document.getElementById('EmailTextBox') as HTMLInputElement).value;
        const ClearEmailText = document.getElementById('EmailTextBox') as HTMLInputElement;
    
        const BodyText = (document.getElementById('MessageTextBox') as HTMLInputElement).value;
        const ClearBodyText = document.getElementById('MessageTextBox') as HTMLInputElement;
    
        // Initial text color settings
        ClearNameText.style.color = "rgb(150, 150, 150)";
        ClearBodyText.style.color = "rgb(150, 150, 150)";
        ClearEmailText.style.color = "rgb(150, 150, 150)";
    
        const Data = { Name: NameText, Email: EmailText, Body: BodyText };
    
        if (NameText === "" && EmailText === "" && BodyText === "") {
            // All 3 fields are empty
            ClearNameText.style.border = "1px solid rgba(255, 50, 50, .8)";
            ClearEmailText.style.border = "1px solid rgba(255, 50, 50, .8)";
            ClearBodyText.style.border = "1px solid rgba(255, 50, 50, .8)";
            if(Main_Button)Main_Button.style.color = "rgba(10, 10, 10, 1)";
            clearInterval(interval); // Stop adding dots
            button.innerHTML = buttonText; // Reset button text
            button.disabled = false; // Enable button
            ClearNameText.style.color = "rgb(255, 255, 255)";
            ClearBodyText.style.color = "rgb(255, 255, 255)";
            ClearEmailText.style.color = "rgb(255, 255, 255)";
            setTimeout(() => {
                ClearNameText.style.border = "0px solid rgba(10, 10, 10, .7)";
                ClearEmailText.style.border = "0px solid rgba(10, 10, 10, .7)";
                ClearBodyText.style.border = "0px solid rgba(10, 10, 10, .7)";
            }, 3000);
        } else if (NameText === "" && EmailText === "" && BodyText !== "") {
            // Name and Email are empty
            ClearNameText.style.border = "1px solid rgba(255, 50, 50, .8)";
            ClearEmailText.style.border = "1px solid rgba(255, 50, 50, .8)";
            if(Main_Button)Main_Button.style.color = "rgba(10, 10, 10, 1)";
            clearInterval(interval); // Stop adding dots
            button.innerHTML = buttonText; // Reset button text
            button.disabled = false; // Enable button
            ClearNameText.style.color = "rgb(255, 255, 255)";
            ClearBodyText.style.color = "rgb(255, 255, 255)";
            ClearEmailText.style.color = "rgb(255, 255, 255)";
            setTimeout(() => {
                ClearNameText.style.border = "0px solid rgba(10, 10, 10, .7)";
                ClearEmailText.style.border = "0px solid rgba(10, 10, 10, .7)";
            }, 3000);
        } else if (NameText === "" && EmailText !== "" && BodyText === "") {
            // Name and Body are empty
            ClearNameText.style.border = "1px solid rgba(255, 50, 50, .8)";
            ClearBodyText.style.border = "1px solid rgba(255, 50, 50, .8)";
            if(Main_Button)Main_Button.style.color = "rgba(10, 10, 10, 1)";
            clearInterval(interval); // Stop adding dots
            button.innerHTML = buttonText; // Reset button text
            button.disabled = false; // Enable button
            ClearNameText.style.color = "rgb(255, 255, 255)";
            ClearBodyText.style.color = "rgb(255, 255, 255)";
            ClearEmailText.style.color = "rgb(255, 255, 255)";
            setTimeout(() => {
                ClearNameText.style.border = "0px solid rgba(10, 10, 10, .7)";
                ClearBodyText.style.border = "0px solid rgba(10, 10, 10, .7)";
            }, 3000);
        } else if (NameText !== "" && EmailText === "" && BodyText === "") {
            // Email and Body are empty
            ClearEmailText.style.border = "1px solid rgba(255, 50, 50, .8)";
            ClearBodyText.style.border = "1px solid rgba(255, 50, 50, .8)";
            if(Main_Button)Main_Button.style.color = "rgba(10, 10, 10, 1)";
            clearInterval(interval); // Stop adding dots
            button.innerHTML = buttonText; // Reset button text
            button.disabled = false; // Enable button
            ClearNameText.style.color = "rgb(255, 255, 255)";
            ClearBodyText.style.color = "rgb(255, 255, 255)";
            ClearEmailText.style.color = "rgb(255, 255, 255)";
            setTimeout(() => {
                ClearEmailText.style.border = "0px solid rgba(10, 10, 10, .7)";
                ClearBodyText.style.border = "0px solid rgba(10, 10, 10, .7)";
            }, 3000);
        } else if (NameText !== "" && EmailText !== "" && BodyText === "") {
            // Body is empty
            ClearBodyText.style.border = "1px solid rgba(255, 50, 50, .8)";
            if(Main_Button)Main_Button.style.color = "rgba(10, 10, 10, 1)";
            clearInterval(interval); // Stop adding dots
            button.innerHTML = buttonText; // Reset button text
            button.disabled = false; // Enable button
            ClearNameText.style.color = "rgb(255, 255, 255)";
            ClearBodyText.style.color = "rgb(255, 255, 255)";
            ClearEmailText.style.color = "rgb(255, 255, 255)";
            setTimeout(() => {
                ClearBodyText.style.border = "0px solid rgba(10, 10, 10, .7)";
            }, 3000);
        } else if (NameText !== "" && EmailText === "" && BodyText !== "") {
            // Email is empty
            ClearEmailText.style.border = "1px solid rgba(255, 50, 50, .8)";
            if(Main_Button)Main_Button.style.color = "rgba(10, 10, 10, 1)";
            clearInterval(interval); // Stop adding dots
            button.innerHTML = buttonText; // Reset button text
            button.disabled = false; // Enable button
            ClearNameText.style.color = "rgb(255, 255, 255)";
            ClearBodyText.style.color = "rgb(255, 255, 255)";
            ClearEmailText.style.color = "rgb(255, 255, 255)";
            setTimeout(() => {
                ClearEmailText.style.border = "0px solid rgba(10, 10, 10, .7)";
            }, 3000);
        } else if (NameText === "" && EmailText !== "" && BodyText !== "") {
            // Name is empty
            ClearNameText.style.border = "1px solid rgba(255, 50, 50, .8)";
           if(Main_Button)Main_Button.style.color = "rgba(10, 10, 10, 1)";
            clearInterval(interval); // Stop adding dots
            button.innerHTML = buttonText; // Reset button text
            button.disabled = false; // Enable button
            ClearNameText.style.color = "rgb(255, 255, 255)";
            ClearBodyText.style.color = "rgb(255, 255, 255)";
            ClearEmailText.style.color = "rgb(255, 255, 255)";
            setTimeout(() => {
                ClearNameText.style.border = "0px solid rgba(10, 10, 10, .7)";
            }, 3000);
        } else if (NameText !== "" && EmailText !== "" && BodyText !== "") {
            // All fields are filled
            fetch('https://Luke2324.pythonanywhere.com/process_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Data)
            })
            .then(response => response.json())
            .then(data => {
                ClearNameText.style.color = "rgb(255, 255, 255)";
                ClearBodyText.style.color = "rgb(255, 255, 255)";
                ClearEmailText.style.color = "rgb(255, 255, 255)";
                clearInterval(interval); // Stop adding dots
                button.innerHTML = buttonText; // Reset button text
                button.disabled = false; // Enable button
                sent_1?.classList.remove("bounce_out");
                sent_1?.classList.remove("bounce_in");
                sent_1?.classList.add("bounce_in");
                ClearNameText.value = '';
                ClearEmailText.value = '';
                ClearBodyText.value = '';
                setTimeout(() => {
                    sent_1?.classList.remove("bounce_in");
                    sent_1?.classList.add("bounce_out");
                }, 5000);
            })
            .catch(error => {
                console.error('An error occurred:', error);
                ClearNameText.style.color = "rgb(255, 255, 255)";
                ClearBodyText.style.color = "rgb(255, 255, 255)";
                ClearEmailText.style.color = "rgb(255, 255, 255)";
                clearInterval(interval); // Stop adding dots
                button.innerHTML = buttonText; // Reset button text
                button.disabled = false; // Enable button
                sent_0?.classList.remove("bounce_in");
                sent_0?.classList.remove("bounce_out");
                sent_0?.classList.add("bounce_in");
                setTimeout(() => {
                    sent_0?.classList.remove("bounce_in");
                    sent_0?.classList.add("bounce_out");
                }, 5000);
            });
        }
    }
    



    function MenuButton() {
        const MenuContainer = document.getElementById("MenuButtonMenuContainer");
        if(MenuContainer)MenuContainer.style.display = "flex";
    }

    function CloseMenuButton() {
        const MenuContainer = document.getElementById("MenuButtonMenuContainer");
        if(MenuContainer)MenuContainer.style.display = "none";
    }

    function scrollintoview_Hi() {
        const targetDiv = document.getElementById("marker_hi");
        if(targetDiv)targetDiv.scrollIntoView({ behavior: 'smooth' });
    }


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

    function Open_GitHub() {
        const githubUrl = "https://github.com/lleins";
        window.open(githubUrl, '_blank');
    }

    function openLinkedIn() {
        const linkedinUrl = "https://www.linkedin.com/in/lukas-leins-802474208";
        window.open(linkedinUrl, '_blank');
    }


    function visit_Raven() {
        const RavenUrl = "http://50.18.247.63:3000/";
        window.open(RavenUrl, '_blank');
    }


    const navigate = useNavigate();

    function go_to_cv(){

        navigate('/cv');

    }




    function visit_ComicFinds() {
        const RavenUrl = "http://3.21.165.54/Home.html";
        window.open(RavenUrl, '_blank');
    }


    function visit_PixelPeak() {
        const RavenUrl = "http://18.225.95.230:5173/";
        window.open(RavenUrl, '_blank');
    }

    function Open_GitHub_Comic_finds() {
        const githubUrl = "https://github.com/lleins/Comic-Finds";
        window.open(githubUrl, '_blank');
    }

    function Open_GitHub_Pixel_Peak() {
        const githubUrl = "https://github.com/lleins/Pixel-Peak";
        window.open(githubUrl, '_blank');
    }

    function Open_GitHub_Number() {
        const githubUrl = "https://github.com/lleins/Messaging-App";
        window.open(githubUrl, '_blank');
    }



    

    document.addEventListener('scroll', function () {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const maxTranslateY = windowHeight * 0.2; 
        const translateYValue = Math.min(scrollY * 0.2, maxTranslateY); 
        const videoMain = document.getElementById('canvas_main');
        if (videoMain) {
            videoMain.style.transform = `translateY(-${translateYValue}px)`;
        }
    });

  


    useEffect(() => {
        calls_dots();
        window.scrollTo(0, 0);
        document.title = 'Lukas Leins';
    }, []); 


    return (
      <div id="Main_Component">
        <p id="top_marker_home"></p>
         <div id="back_main_container" className="Load_Item">
            <video id="Video_Main" src={main_vid} autoPlay muted loop/>
            <canvas id="canvas_main"></canvas>
        </div>
            <div className="Load_Item">

            <div id="sent_1" className="Notifs_class">
                <img className="notif_imgs" src={sent_1}/>
                <p id="success_notif">Message sent!</p>
            </div>

            <div id="sent_0" className="Notifs_class">
                <img className="notif_imgs" src={sent_0}/>
                <p id="fail_notif">Error occured</p>
            </div>

            <div id="Home_tab">
    
                <p id="MainTextTop">Web Developer</p>

                <p id="SummaryTextBottom">My name is Lukas Leins and I am a web developer</p>
    
                <div id="top_socials_container">
                    <img className="top_links_style" onClick={Open_GitHub} src={big_git}/>
                    <img className="top_links_style" onClick={openLinkedIn} src={big_link}/>
                    
                </div>
                
                <button id="Learn_more_btn" onClick={scrollintoview_Hi}>LEARN MORE</button>

            </div>

            <div id="Hi_tab">
                <div id="Hi_tab_Secondary">
                    <p id="marker_hi"></p>
                    <img id="Porfolio_Img" src={port_pic}/>
                    
                    <div id="container_text">
                        <p id="hi_title">Hello there!</p>
                        <p id="hi_text">My name is Lukas Leins and I am a web developer. I am proficient in a number of languages, libraries, and frameworks. Some of which include Typescript, React, Flask, SQL and much more! Feel free to check out my top projects below that showcase these and check out my Github for more! Please contact me at my Linkedin or use the contact form located at the bottom of the page.</p>
                    </div>
                    <div id="idk"></div>
                </div>
            </div>

            <div id="links_tab">
                <img className="links_style" onClick={Open_GitHub} src={big_git}/>
                <img className="links_style" onClick={openLinkedIn} src={big_link}/>
                <img className="links_style" onClick={scrollintoview_contact} src={big_email}/>
                <img className="links_style" onClick={go_to_cv} src={big_cv}/>
            </div>


            <div id="Projects_tab">
                <div id="Title_Projects">
                    <p className="Top_Project_text">My top projects<span className="BottomText"></span><br/></p>
                </div>

                <div id="Projects_Main_Container">
                    <div id="projects_1_2_container">

                        <div id="project_5_container" className="project_container_style">
                            <img id="Pixel_Logo" src={Logo_iron}/>
                            <p className="Title_projects_2">Iron Library</p>
                            <p className="stack">React | Typescript | PostgreSQL</p>
                            <p className="text_projects"> Iron Library is a fitness resource, offering programs in powerlifting, strongman, and more. Also movement guides and a one-rep max calculator. 
                            </p>
                            <div className="bottom_project_links_3">
                                <p className="visit_website" id="Visit_number" onClick={visit_PixelPeak}>VISIT WEBSITE</p>
                                <p className="visit_website" onClick={Open_GitHub_Pixel_Peak} id="Visit_git_number">GITHUB</p>
                            </div>
                        </div>

                        <div id="project_2_container" className="project_container_style">
                            <img id="Pixel_Logo" src={logo}/>
                            <p className="Title_projects_2">Pixel Peak</p>
                            <p className="stack">MERN stack | Typescript</p>
                            <p className="text_projects"> Pixel Peak is a photo video browser made with the Pexels API call
                                services. This was my first major project using the MERN stack and Typescript.
                            </p>
                            <div className="bottom_project_links_3">
                                <p className="visit_website" id="Visit_number" onClick={visit_PixelPeak}>VISIT WEBSITE</p>
                                <p className="visit_website" onClick={Open_GitHub_Pixel_Peak} id="Visit_git_number">GITHUB</p>
                            </div>
                        </div>
                    
                    </div>


                    <div id="second_project_container">
                        <div id="project_1_container" className="project_container_style">
                            <img id="Comic_Logo" src={NewLogo}/>
                            <p className="Title_projects_2">Comic Finds</p>
                            <p className="stack">Javascript | Flask | NodeJS | MongoDB</p>
                            <p className="text_projects">Comic Finds is a comic book webscraper that allows users to search the
                                entire internet for comic books in one convenient place.</p>
                            <div className="bottom_project_links">
                                <p className="visit_website" onClick={visit_ComicFinds} id="Visit_Comic">VISIT WEBSITE</p>
                                <p className="visit_website" onClick={Open_GitHub_Comic_finds} id="Visit_git_comic">GITHUB</p>
                            </div>
                        </div>

    
                
                    </div>
                </div>

                <div id="Marker"></div>
            </div>




            <div id="Contact_tab">
                <div id="Contact_tab_secondary">
                    <p id="Contact_Title">Contact me</p>
                    <p id="Contact_Title_secondary">Please feel free to contact me using the contact form below. I will get back
                        to
                        you
                        as soon as possbile! </p>

                    <div id="ContactFormContainer">

                        <div id="name_email_container">
                            <input type="text" id="NameTextBox" className="InputBox" placeholder="Name"/>
                            <input type="text" id="EmailTextBox" className="InputBox" placeholder="Email"/>
                        </div>

                        <div id="NameInput">
                            <textarea id="MessageTextBox" className="InputMessageBox" placeholder="Message"></textarea>
                        </div>

                        <div id="SendButton">
                            <button id="MainButton" onClick={Call_Flask}>SEND</button>
                        </div>
                    </div>
                    
                    <div id="Email_Phone_Container">
                        <div id="Email">
                            <p className="Email_Phone_title">Email Address</p>
                            <p className="Email_Phone">lleins237@gmail.com</p>
                            <p className="Email_Phone">Alternate: llleins23@gmail.com</p>
                        </div>
                        <div id="Phone">
                            <p className="Email_Phone_title">Phone Number</p>
                            <p className="Email_Phone">604-701-7527</p>
                            <p className="Email_Phone">Alternate: 604-796-2941</p>
                        </div>
                    </div>

                    <p id="Copyright_text">Copyright © 2024 - Lukas Leins - All Rights Reserved</p>
                    <div id="bottom_socials_container">
                        <img className="bottom_socials_imgs" onClick={Open_GitHub} src={big_git}/>
                        <img className="bottom_socials_imgs" onClick={openLinkedIn} src={big_link}/>
                    </div>
                </div>
            </div>

        </div>

      </div>
    );
  }
  
  export default Main;
  