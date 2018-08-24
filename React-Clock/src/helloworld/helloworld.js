import React , { Component } from 'react';
import './helloworld.css'

class HelloWorld extends Component{
    
    constructor(props){
        super(props);
        console.log('this.props ==>',this.props);
    }
    
    anchorTag = { color : 'green' };
    render(){
        return (<a href={this.props.href} title={this.props.title} style={ this.anchorTag } > { this.props.linkName } </a>)
    }
}


export default HelloWorld