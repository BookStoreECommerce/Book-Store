import { render, screen } from '@testing-library/react';
import Loading from '../Loading';


describe("Loading Content", () =>{

    it('should render Loading Component', () => {
        render(<Loading />);
        const LoadingElement = screen.getByTestId('Loading');
        expect(LoadingElement).toBeInTheDocument();
    });

})
