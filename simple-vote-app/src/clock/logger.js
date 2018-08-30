import React , { Component } from 'react';

class Logger extends Component{

    constructor(props){
        super(props)
    }

    componentWillMount(){ 
        console.log('run this component after constructor and before rendor method ');
    }

    componentWillReceiveProps(){ console.log('component received props values ', this.props); }

    shouldComponentUpdate(newprops , newstate){
        console.log('new props ==> ', newprops);console.log('new state ==> ', newstate);
        return true ;
    }

    render(){
        return(
            <div>
                {this.props.time}
            </div>
        )
    }
}

export default Logger;