import { render, screen } from '@testing-library/react';
import BestSeller from '../BestSeller';
const {bestSeller} = require('../BestSeller');

describe("BestSellerArray", () =>{

    it('should render Array not to be null', () => {
        render(<BestSeller />);
        expect(bestSeller).not.toBeNull()
    });
  
})

describe("BestSellerContent", () =>{

    it('should render heading element in BestSeller Component', () => {
        render(<BestSeller />);
        const headingElement = screen.getByRole("heading", {name: "Best Seller"})
        expect(headingElement).toBeInTheDocument();
    });

})
