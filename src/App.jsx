import React from "react";

// function ref(){
    
// }

const SlotM = () => {
    // let x='😁';
    // let y='😁';
    // let z='😁';
    let icons=["❤️","💔"]
    let x=icons[Math.floor(Math.random()*icons.length)];
    let y=icons[Math.floor(Math.random()*icons.length)];;
    let z=icons[Math.floor(Math.random()*icons.length)];;

    if((x===y) && (y===z)){
        return(
            <div className="slot_inner">
                <h1> {x} {y} {z}</h1>
                <h1>This is matching</h1>
                <hr />
            </div>
        )
    }
    else{
        return(
            <div className="slot_inner">
                <h1> {x} {y} {z}</h1>
                <h1>This is not matching</h1>
                <hr />
            </div>
        )
    }
}

const App = () => {
    return (
        <>
        <h1 className="heading_style">
            🎰 Welcome to <span style={{fontWeight:"bold"}}>Slot Machine Game</span> 🎰
        </h1>
        <div className="slotmachine">
        {/* <SlotM x="😁" y="😁" z="😁" />
        <SlotM x="😁" y="🤣" z="😁" />
        <SlotM x="❤️" y="💘" z="❤️" />
        <SlotM x="😭" y="😭" z="😭" /> */}
        <SlotM />
        <SlotM />
        <SlotM />
        <br />
        <button type="button" onClick={()=>window.location.reload()}>Play Again!</button>

        </div>
        </>
    )
}
export default App;