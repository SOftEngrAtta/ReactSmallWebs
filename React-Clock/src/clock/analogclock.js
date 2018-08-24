import React from 'react';

function AnalogClock(props){

    console.log(props);

    let time = new Date(props.time);

    let ClockContainer = {
        position : 'relative',
        top : 0,
        left : 0,
        width : 200,
        height: 200,
        borderRadius: 20000,
        borderStyle: 'solid',
        borderColor: 'Black'
    }

    let SecondHand = {
        position: 'relative',
        top: 100,
        left: 100,
        border: '1px solid red',
        width: '40%',
        height: 1,
        transform: 'rotate('+((time.getSeconds()/60)*360-90).toString()+'deg)',
        transformOrigin: '0% 0%',
        backgroundColor: 'red'
    }
    let MinuteHand = {
        position: 'relative',
        top: 100,
        left: 100,
        border: '1px solid gray',
        width: '40%',
        height: 1,
        transform: 'rotate('+((time.getMinutes()/60)*360-90).toString()+'deg)',
        transformOrigin: '0% 0%',
        backgroundColor: 'gray'
    }
    let HourHand = {
        position: 'relative',
        top: 100,
        left: 100,
        border: '1px solid gray',
        width: '20%',
        height: 7,
        transform: 'rotate('+((time.getHours()/12)*360-90).toString()+'deg)',
        transformOrigin: '0% 0%',
        backgroundColor: 'gray'
    }

    return (
        <div style={ClockContainer}>
            <div style={SecondHand}></div>
            <div style={MinuteHand}></div>
            <div style={HourHand}></div>            
        </div>
    )

}

export default AnalogClock;