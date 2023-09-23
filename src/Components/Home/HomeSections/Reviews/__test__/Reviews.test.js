import { render, screen } from '@testing-library/react';
import Reviews from '../Reviews';
const {review} = require('../Reviews');

describe("ReviewsArray", () =>{

    it('should render Array not to be null', () => {
        render(<Reviews />);
        expect(review).not.toBeNull()
    });
  
})


