import { render, screen } from '@testing-library/react';
import AboutUs from '../AboutUs';


describe("AboutUsContent", () =>{

    it('should render heading element in AboutUs Component', () => {
        render(<AboutUs />);
        const headingElement = screen.getByRole("heading", {name: "About Us"})
        expect(headingElement).toBeInTheDocument();
    });
      
    it('should render paragraph element in AboutUs Component', () => {
        render(<AboutUs />);
        const paragraphElement = screen.getByText('Since its inception, SAYEGH is committed to the advancement of culture and education, through the provision of quality educational content, assessment and professional development to serve learners, educators and future generations.')
        expect(paragraphElement).toBeInTheDocument();
    });
})

  

