import React from 'react';
import { Link } from 'react-router-dom'

import HomeComponent from './home';
import AboutComponent from './about';
import ContactComponent from './contact';

const Navbar=()=>(
    <ul>
        <li><Link to='/'>App</Link></li>            
        <li><Link to='/home'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/contact'>Contact</Link></li>       
    </ul>
) 

export default Navbar;