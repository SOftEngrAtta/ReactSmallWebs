import React from 'react';
import ReactDOM from 'react-dom';
// import HelloWorld from './helloworld/helloworld';
// import FaceBookLink  from './method';
import Clock from './clock/clock';


// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';



// var h1 = <h1>Hello World</h1>

ReactDOM.render(
    <div>
        {/* <HelloWorld href="http://www.google.com" title="Google Link" linkName="Google" /><br />
        <HelloWorld href="http://www.facebook.com" title="Google Link" linkName="Facebook" /><br />
        <HelloWorld href="http://www.youtube.com" title="Google Link" linkName="Youtube" />
        <FaceBookLink /> */}
        <Clock />
    </div>
    , document.getElementById('root'));
// registerServiceWorker();
