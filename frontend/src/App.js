// import React from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css"

// import UsersList from './components/Users/UsersList'
// import Home from './components/Common/Home'
// import Register from './components/Common/Register'
// import Navbar from './components/templates/Navbar'
// import Login from './components/Common/Login'
// import Profile from './components/Users/Profile'

// function App() {
//   return (
//     <Router>
//       <div className="container">
//         <Navbar/>
//         <br/>
//         <Route path="/" exact component={Home}/>
//         {/* <Route path="/users" exact component={UsersList}/> */}
//         <Route path="/register" component={Register}/>
//         <Route path="/login" component={Login}/>
//         {/* <Route path="/profile" component={Profile}/> */}
//       </div>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Button} from "react-router-dom";

import Applicant_Navbar from './components/templates/Applicant_Navbar'
import Recruiter_Navbar from './components/templates/Recruiter_Navbar'
import AddJob from './components/templates/Add_job'
import RListings from './components/templates/RJob_listings'
import AListings from './components/templates/AJob_listings'
import Register from './components/Common/Register'
import Login from './components/Common/Login'
import Home from './components/Common/Home'
import Navbar from './components/templates/Navbar'
import RecruiterProfile from './components/Users/RProfile'
import ApplicantProfile from './components/Users/AProfile'
import Edit from './components/templates/R_editprofile'
import EditA from './components/templates/A_editprofile'
// import CustomerNavbar from "./components/customer-navbar.component"
// import VendorNavbar from "./components/vendor-navbar.component"
// import Register from "./components/register.component";
// import Login from "./components/login.component";
// import Search from "./components/product-search.component";
// import Listings from "./components/product-listings.component";
// import AddProduct from "./components/add-product.component";
// import Orders from "./components/order.component";
// import Front from "./components/front.component";
// import Dispatch from "./components/dispatch.component";
// import Reviews from "./components/review.component";
// import ProductReview from "./components/product-review.component";
// import VendorReview from "./components/vendor-review.component";
// import Edit from "./components/edit.component"



class App extends React.Component {
  render() {
    let user_type = localStorage.getItem('user_type');  
    let navbar = null;
  
    if(user_type === "Applicant")
      navbar = <Applicant_Navbar />;
    else if(user_type === "Recruiter")
      navbar = <Recruiter_Navbar />;
    else
      navbar = <Navbar />;

    
    return (
      <Router>
        <div className="container">
          {navbar}
          <br></br>
          <Route exact path="/" render={()=> {
            if(user_type === "Applicant") 
            {
              console.log("1");
              // return <AddProduct/>
            }
              else if(user_type === "Recruiter") 
              {
                console.log("2");
                // return <Orders/>
              }

            // else return <Front/>
          }}  />
          {/* <Route path="/front" component={Front} /> */}
          <Route path="/" exact component={Home}/>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/rprofile" component={RecruiterProfile}/>
          <Route path="/aprofile" component={ApplicantProfile}/>
          <Route path="/add" component={AddJob}/>
          <Route path="/rlistings" component={RListings}/>
          <Route path="/alistings" component={AListings}/>
          <Route path="/recruiterprofileedit" component={Edit}/>
          <Route path="/applicantprofileedit" component={EditA}/>
          
          {/* <Route path="/search" component={Search} />
          <Route path="/listings" component={Listings} />
          <Route path="/add-product" component={AddProduct} />
          <Route path="/orders" component={Orders} />
          <Route path="/dispatch" component={Dispatch} />
          <Route path="/vendor" component={Reviews} />
          <Route path="/product-review" component={ProductReview} />
          <Route path="/vendor-review" component={VendorReview} />
          <Route path="/edit" component={Edit} /> */}

        </div>

      </Router>
    );
  }
}

export default App;
