import React from 'react';
import { BrowserRouter as Router , 
    Route , 
    Link 
} from 'react-router-dom';

import App from '../App';
import  HomeComponent  from '../components/home';
import  AboutComponent  from '../components/about';
import ContactComponent from '../components/contact';

const CustomRoutes = ()=>(
    <Router>
        <div>
            <Link to='/home'>Home</Link>
            <Link to='/about'>About</Link>   
            <Link to='/contact'>Contact</Link>   
               
            <Route exact path="/" component={App}></Route>
            <Route path="/home" component={ HomeComponent }></Route>
            <Route path="/about" component={ AboutComponent }></Route>
            <Route path="/contact" component={ ContactComponent }></Route>
            
        </div>
    </Router>
)

export default CustomRoutes ;