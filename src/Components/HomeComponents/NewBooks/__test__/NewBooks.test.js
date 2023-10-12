import { fireEvent, render, screen } from '@testing-library/react';
import NewBooks from '../NewBooks';
import { BrowserRouter } from 'react-router-dom';

const {newBooks} = require('../NewBooks');
const MockNewBooks =()=>{
    return(
        <BrowserRouter>
            <NewBooks />
        </BrowserRouter>
    )
}

describe("NewBooks Content", () =>{

    it('should render heading element in NewBooks Component', () => {
        render(<MockNewBooks />);
        const headingElement = screen.getByRole("heading", {name: "New Arrivals"})
        expect(headingElement).toBeInTheDocument();
    });

});

describe("NewBooksArray", () =>{

    it('should render Array not to be null', () => {
        render(<MockNewBooks />);
        expect(newBooks).not.toBeNull()
    });
  
});

describe("NewBooks Buttons", () =>{

    it('should render shiftRight and shiftLeft functions when on click left & right Btn', () => {
        render(<MockNewBooks />);
        const leftBtn = screen.getByTestId('left');
        const rightBtn = screen.getByTestId('right');
        fireEvent.click(leftBtn);
        fireEvent.click(rightBtn);
    });
  
})

