import React , { Component } from 'react';

class MyEvents extends Component{

    constructor(){ 
        super();
        this.state = { counter : 0 }
    }

    voteUp(){
        this.setState({ counter : this.state.counter +1 })
    }

    voteDown(){
        this.setState({ counter : this.state.counter -1 })
    }

    render(){
        let btn = { 'margin-left' : '5px' }
        return(
            <div>
                <button onClick={this.voteUp.bind(this)} style={ btn } > Vote Up </button>
                <button onClick={this.voteDown.bind(this)} style={ btn }> Vote Down </button>  
                <h1>Vote Counter : { this.state.counter } </h1>
            </div>
        )
    }

}

export default MyEvents