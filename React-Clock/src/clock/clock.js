import React , { Component } from 'react';
import DigitalClock from './digitalclock';
import AnalogClock from './analogclock.js';

class Clock extends Component{

    constructor(){
        super();
        this.state = { currentTime : new Date().toLocaleString() }
        this.updateTime();
    }

    updateTime(){
        setInterval(()=>{ 
            this.setState({currentTime : new Date().toLocaleString()})
        },200)
    }

    render(){
        
        return (
            <div>
                <DigitalClock time={ this.state.currentTime }/>
                <AnalogClock time={ this.state.currentTime } />
            </div>
        )
    }
    
}

export default Clock ;