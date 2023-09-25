import { render, screen, fireEvent } from '@testing-library/react';
import PolicyDialog from '../PolicyDialog';

describe("PolicyDialog", () =>{

    it('should render PolicyDialog', () => {
        render(
        <PolicyDialog />
        );
        expect(screen.getByTestId('PolicyDialog')).toBeInTheDocument();
    });
})

describe("PolicyContent", () =>{

    it('should render Heading Element in Slider Component', () => {
        render(<PolicyDialog />);
        const headingElement = screen.getByRole("heading", {name: "1. Terms of Service"});
        expect(headingElement).toBeInTheDocument();
    });

    it('should render Heading Element in Slider Component', () => {
        render(<PolicyDialog />);
        const headingElement = screen.getByRole("heading", {name: "2. Privacy policy"});
        expect(headingElement).toBeInTheDocument();
    });

    it('should render Heading Element in Slider Component', () => {
        render(<PolicyDialog />);
        const headingElement = screen.getByRole("heading", {name: "3. Returns and exchanges policy"});
        expect(headingElement).toBeInTheDocument();
    });

    it('should render Heading Element in Slider Component', () => {
        render(<PolicyDialog />);
        const headingElement = screen.getByRole("heading", {name: "4. Shipping policy"});
        expect(headingElement).toBeInTheDocument();
    });

    it('should render Heading Element in Slider Component', () => {
        render(<PolicyDialog />);
        const headingElement = screen.getByRole("heading", {name: "5. Taxes"});
        expect(headingElement).toBeInTheDocument();
    });
})

describe("PolicyDialog Buttons", () =>{

    it('should render return btn and fire event handleClose function', () => {
        render(<PolicyDialog />);
        const returnBtn = screen.getByTestId('return');
        fireEvent.click(returnBtn);
    });

    it('should render closeIcon btn and fire event handleClose function', () => {
        render(<PolicyDialog />);
        const closeIcon = screen.getByTestId('closeIcon');
        fireEvent.click(closeIcon);
    });
  
})
