# Projet-3---Portfolio-architecte-sophie-bluel

/**********
  CONTEXT
**********/

In this bootcamp project, my task was to develop a functionnal front-end for an interior architect's website.
Starting from a a skeleton mark-up, I had to develop the following:
 * the presentation page of the architect's work (from the provided HTML )
 * a login page for the site administrator (the client) (code to be created from scratch)
 * the modals allowing to edit and upload new media (code to be created from scratch)

This project taught me how to:
* use API documentation and build fetch requests
* use Javascript to dynamically render data and manipulate the DOM
* use a Powershell terminal, node.js and npm

/**********
 RESOURCES
**********/

 * OpenClassrooms
 * Scrimba - Special thanks to @mykalimba for his support
 
 
/**********
   DEMO
**********/

![Alt Text](https://github.com/BuckyBuck135/Projet-3---Portfolio-architecte-sophie-bluel/blob/main/FrontEnd/assets/Sophie-Bluel-demo.gif)

/**********
   SPECS
**********/


```
API test account
email: sophie.bluel@test.tld
password: S0phie

Swagger:
http://localhost:5678/api-docs/

Specs:
https://course.oc-static.com/projects/D%C3%A9veloppeur+Web/IW_P6+JS+page+dynamique/E%CC%81tapes+cle%CC%81s+P6+Front-End+(3).pdf

Figma design 
https://www.figma.com/file/kfKHknHySoTibZfdolGAX6/Desktop?node-id=0%3A1&t=InDTCL2HfB49sGi5-0

/**********
 CHANGELOG
**********/
v1.0
* Updated index.html to include all login elements
* Created login.html
* Styled both pages

v1.0.1
* fixed spacing in the footer
* reorganized files and folders

v1.1
* feature: photo gallery rendered dynamically with API request
* feature: filter buttons with API request
* feature: admin login capability  with API request
* feature: admin delete capability

v1.2
* feature: admin delete all capability
* feature: admin upload new file capability

v1.2.1
* FILE INPUT: added disable on button
* FILE INPUT: added validation in JS for all 3 fields
 + check for file extension + check size < 4mo
* SELECT tag: added default/placeholder option
* added clear form on back or close
* refactored toaster function => add a "position" argument
* on photo delete: display success/error message
* on photo add: display message
* on login: display success/error message then go back to gallery
* modified login toaster to display after redirect
* removed logout button, replaced with anchor in nav bar
* added meta description and favicon


