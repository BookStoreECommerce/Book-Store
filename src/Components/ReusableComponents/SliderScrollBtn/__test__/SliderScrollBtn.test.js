import { render, screen } from '@testing-library/react';
import SliderScrollBtn from '../SliderScrollBtn';


describe("SliderScrollContent", () =>{

    it('should render Link element in SliderScroll Component', () => {
        render(<SliderScrollBtn />);
        const LinkElement = screen.getByRole('link')
        expect(LinkElement).toBeInTheDocument();
    });

})

  