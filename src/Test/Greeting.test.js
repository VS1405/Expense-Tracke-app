import Greeting from "./Greeting"
import {render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

describe('Greeting Component Test', ()=>{

    test('render greeting component', ()=>{
        render(<Greeting />)
       const helloElement = screen.getByText('Hello World!');
    
       expect(helloElement).toBeInTheDocument()
    });

   
})