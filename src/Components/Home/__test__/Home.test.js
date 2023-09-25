import { render, screen } from '@testing-library/react';
import Home from '../Home';
import { MemoryRouter } from 'react-router-dom';


describe("Home", () =>{

    it('should render slider inside Home', () => {
        render(
        <MemoryRouter>
        <Home />
        </MemoryRouter>
        );
        expect(screen.getByTestId('Slider')).toBeInTheDocument();
    });

    it('should render NewBooks inside NewBooks', () => {
        render(
        <MemoryRouter>
        <Home />
        </MemoryRouter>
        );
        expect(screen.getByTestId('NewBooks')).toBeInTheDocument();
    });

    it('should render NewBooks inside Categories', () => {
        render(
        <MemoryRouter>
        <Home />
        </MemoryRouter>
        );
        expect(screen.getByTestId('Categories')).toBeInTheDocument();
    });

    it('should render NewBooks inside AboutUs', () => {
        render(
        <MemoryRouter>
        <Home />
        </MemoryRouter>
        );
        expect(screen.getByTestId('AboutUs')).toBeInTheDocument();
    });

    it('should render NewBooks inside BestSeller', () => {
        render(
        <MemoryRouter>
        <Home />
        </MemoryRouter>
        );
        expect(screen.getByTestId('BestSeller')).toBeInTheDocument();
    });
  
    it('should render NewBooks inside Reviews', () => {
        render(
        <MemoryRouter>
        <Home />
        </MemoryRouter>
        );
        expect(screen.getByTestId('Reviews')).toBeInTheDocument();
    });

    it('should render NewBooks inside ScrollToTop', () => {
        render(
        <MemoryRouter>
        <Home />
        </MemoryRouter>
        );
        expect(screen.getByTestId('ScrollToTop')).toBeInTheDocument();
    });

    it('should render NewBooks inside PolicyDialog', () => {
        render(
        <MemoryRouter>
        <Home />
        </MemoryRouter>
        );
        expect(screen.getByTestId('PolicyDialog')).toBeInTheDocument();
    });
  
})
