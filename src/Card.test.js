import React from "react";
import {render} from "@testing-library/react"
import Card from "./Card";


//smoke test
test ("renders without crushing", () => {
    render (<Card caption= "testing image"  src="testing.com" currNum={1} totalNum={3}/>)
})

//snapshot test 
test ("should match to snapshot ", () =>{
    const {asFragment, debug} = render (<Card caption= "testing image"  src="testing.com" currNum={1} totalNum={3}/>)
    debug();
    expect (asFragment()).toMatchSnapshot();
})