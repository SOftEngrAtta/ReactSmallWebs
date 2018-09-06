import React from 'react';
import { BrowserRouter as Router , Route  } from 'react-router-dom';

import Navbar from '../components/navbar';
import Home from '../components/home';
import About from '../components/about';
import Contact from '../components/contact';

import App from '../App';

const CustomRoutes = ()=>(

    <Router>
        <div>
            <Navbar />
            <Route exact path="/" component={ App }></Route>
            <Route exact path="/home" component={ Home }></Route>     
            <Route exact path="/about" component={ About }></Route>     
            <Route exact path="/contact" component={ Contact }></Route>     
                 
        </div>
    </Router>

)

export default CustomRoutes;
