import React , { Component } from 'react';

class FaceBookLink extends Component{
    
    myfacebookId(){return 'www.facebook.com'}

    myfacebook(){return 'Atta Ur Rehman';}
    
    render(){
        return (
            <div>
               My facebook Id: <a href={ this.myfacebookId() }> { this.myfacebook() } </a>   
            </div>
        )
    }
}

export default FaceBookLink;