import { render, screen } from '@testing-library/react';
import Rating from '../Rating';


describe("Rating", () =>{
const rate = [1, 2 ,3,4,5]

const renderRating = () => 
render(
    <Rating rate={rate[0]}/> 
)
    it('should render Rating Component', () => {
        renderRating();
       screen.debug();
       expect(screen.getByTestId('rate')).toBeInTheDocument();
    });

})
