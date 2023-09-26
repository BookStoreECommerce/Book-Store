import { render, screen } from '@testing-library/react';
import Categories from '../Categories';
const {category} = require('../Categories');

describe("categoryArray", () =>{

    it('should render Array not to be null', () => {
        render(<Categories />);
        expect(category).not.toBeNull()
    });
  
})

describe("categoryContent", () =>{

    it('should render heading element in Categories Component', () => {
        render(<Categories />);
        const headingElement = screen.getByRole("heading", {name: "Categories"})
        expect(headingElement).toBeInTheDocument();
    });

})
