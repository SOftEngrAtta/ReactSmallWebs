import React from 'react';
import Logger from './logger.js';

class Clock extends React.Component{

    constructor(){
        super();
        this.state = { currentTime : new Date().toLocaleString(),counter : 0}
        this.updateTime();  
    }

    updateTime(){
        setInterval(()=>{
            this.setState({
                currentTime : new Date().toLocaleString(),
                counter : this.state.counter + 1
            })
        },200)
    }

    render(){
        return(
            <div>
                {
                    (this.state.counter < 10)?
                    (<Logger time={this.state.currentTime}/>):
                    ('')
                }
            </div>
        )
    }

}


export default Clock;