import { render, screen } from '@testing-library/react';
import Slider from '../Slider';


describe("SliderImg", () =>{

    it('should render Image in Slider Component', () => {
        render(<Slider />);
        const imgElement = screen.getAllByRole('img');
        expect(imgElement).toBeTruthy();
    });

})

describe("SliderButton", () =>{

    it('should render Button Element in Slider Component', () => {
        render(<Slider />);
        const headingElement = screen.getAllByRole("button");
        expect(headingElement).toBeTruthy();
    });

})

describe("SliderContent", () =>{

    it('should render Heading Element in Slider Component', () => {
        render(<Slider />);
        const headingElement = screen.getByRole("heading", {name: "Buy your favourite Book from Here"});
        expect(headingElement).toBeInTheDocument();
    });

    it('should render Heading Element in Slider Component', () => {
        render(<Slider />);
        const headingElement = screen.getByRole("heading", {name: "A book is a Dream that you Hold in your Hands"});
        expect(headingElement).toBeInTheDocument();
    });

    it('should render Heading Element in Slider Component', () => {
        render(<Slider />);
        const headingElement = screen.getByRole("heading", {name: "There is no friend as Loyal as a Book"});
        expect(headingElement).toBeInTheDocument();
    });

    it('should render Heading Element in Slider Component', () => {
        render(<Slider />);
        const headingElement = screen.getByRole("heading", {name: "Today a reader tomorrow a Leader"});
        expect(headingElement).toBeInTheDocument();
    });

})
