import { render, screen } from '@testing-library/react';
import Categories from '../Categories';
import { BrowserRouter } from 'react-router-dom';
const {category} = require('../Categories');

describe("categoryArray", () =>{

    it('should render Array not to be null', () => {
        render(<BrowserRouter>
        <Categories />
        </BrowserRouter>);
        expect(category).not.toBeNull()
    });
  
})

describe("categoryContent", () =>{

    it('should render heading element in Categories Component', () => {
        render(<BrowserRouter>
            <Categories />
            </BrowserRouter>);
        const headingElement = screen.getByRole("heading", {name: "Categories"})
        expect(headingElement).toBeInTheDocument();
    });

})
