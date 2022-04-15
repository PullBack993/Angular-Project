
<p align="center" border="circle">
  <a href="https://real-estate-upload-bucket.s3.eu-central-1.amazonaws.com/6878-1650019189415.png"></a>
</p>

---

# **Full stack application with Angular and Node JS**


<h2 text="bold">Tech Stack: </h2>
<h3 align="center">Client:</h3>
<p align="center"> <a href="https://angular.io" target="_blank" rel="noreferrer"> <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="angular" width="40" height="40"/> </a>
 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
 <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a>  <a href="https://getbootstrap.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://sass-lang.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" alt="sass" width="40" height="40"/> </a><a href="https://www.primefaces.org/primeng/" target="_blank" rel="noreferrer"> <img src="https://www.primefaces.org/wp-content/uploads/2018/05/primeng-sidebar.svg" alt="javascript" width="40" height="40"/> </a> 
 </p>
 
 ----
 <h3  align="center">Server:</h3>
 <p  align="center">
 <a  href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a>
 <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>

</p>

---
 <h3 align="center">Services:</h3>
 <p  align="center">
  <a href="https://heroku.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a>  <a href="https://aws.amazon.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="aws" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a></p>


----

## 🔗 **Links:** 
### API-Heroku : <a href="https://real-estate-upload-bucket.s3.eu-central-1.amazonaws.com/Server-Rest-Api-Endpoints.docx">*(web api endpoints)*</a>
[![Heroku server API](https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg)](https://real-estate-angular-project.herokuapp.com/)

### Client-AWS:<a href="http://real-estate-properties.s3-website.eu-west-3.amazonaws.com/"> *(website)*</a>
[![Clien-AWS](https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg)](http://real-estate-properties.s3-website.eu-west-3.amazonaws.com/)


---

# Permissions:

| **Permissions**          | Logged in User | Guest | 
| ------------------------ | -------------- | ----- | 
| Home page                | ✅            | ✅    | 
| All posts(properties)    | ✅            | ✅    | 
| Detail property          | ✅            | ✅    | 
| Login/ Register          | ❌            | ✅    |
| Search                   | ✅            | ❌    | 
| Create property          | ✅            | ❌    | 
| Profile                  | ✅(owner)     | ❌    | 
| Profile edit(upload img) | ✅(owner)     | ❌    | 
| Property edit            | ✅(owner)     | ❌    | 
| Property delete          | ✅(owner)     | ❌    | 



# **About This Project:**

The project is for creating and sharing real estate ads. Тhis project is for my exam which is in SoftUni, but I think to continue to develop my project, as I think there are many things that could be improved.Which would help many people find the right property.

I used almost all the knowledge I acquired in SoftUni
and many different new technologies and services for me (which was quite difficult), but I think that only in this way we can improve and progress.
I didn't want to do just one app and pass the exam, what is more important for me is what I learn.

---

# **What I used ?**
-Server side:
  * CRUD + (search,sort,pagination) operations using mongoose orm and mongodb
  * Custom error handling in express
  * Routing in express
  * User authentication:
    * JWT token
    * Bcrypt
    * ExpressJWT
   * User authorization:
        * Custom authorization
   * Route middlewares
   * AWS-SDK images upload and delete
   * Multer-S3 for images

-Client side:
* Angular
    * Error handling(with interseptor)
    * Authentication:
        * Local Storage *(it was very difficult)*
    * Lazy loading
    * RxJS
    * Handling Forms
        * Reactive forms
    * Router Guards *(isAuthenticated)*
    * Router Module *(link,redirect,query params)*
    * Subjects
    * Observables
    * Pipe
    * Angular Animation
    * Helpers:
        * Bootstrap
        * Prime NG
    * Custom loader spinner
    * Custom validation alerts
    * Custom pagination
    * Custom search
    * Custom image upload

# TODO:
- [ ] Confirm email
- [ ] Change password
- [ ] Admin panel
- [ ] Register Broker
- [ ] Property statistics
- [ ] Register Brokers firm
- [ ] Customer reviews(brokers)
- [ ] Customer reviews(brokers firm)
- [ ] Payment
    
   
    

    
     

