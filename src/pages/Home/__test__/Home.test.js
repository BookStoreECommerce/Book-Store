import { render, screen } from '@testing-library/react';
import Home from '../Home';
import { BrowserRouter } from 'react-router-dom';


describe("Home", () =>{

    it('should render slider inside Home', () => {
        render(
        <BrowserRouter>
        <Home />
        </BrowserRouter>
        );
        expect(screen.getByTestId('Slider')).toBeInTheDocument();
    });

    it('should render NewBooks inside NewBooks', () => {
        render(
        <BrowserRouter>
        <Home />
        </BrowserRouter>
        );
        expect(screen.getByTestId('NewBooks')).toBeInTheDocument();
    });

    it('should render NewBooks inside Categories', () => {
        render(
        <BrowserRouter>
        <Home />
        </BrowserRouter>
        );
        expect(screen.getByTestId('Categories')).toBeInTheDocument();
    });

    it('should render NewBooks inside AboutUs', () => {
        render(
        <BrowserRouter>
        <Home />
        </BrowserRouter>
        );
        expect(screen.getByTestId('AboutUs')).toBeInTheDocument();
    });

    it('should render NewBooks inside BestSeller', () => {
        render(
        <BrowserRouter>
        <Home />
        </BrowserRouter>
        );
        expect(screen.getByTestId('BestSeller')).toBeInTheDocument();
    });
  
    it('should render NewBooks inside Reviews', () => {
        render(
        <BrowserRouter>
        <Home />
        </BrowserRouter>
        );
        expect(screen.getByTestId('Reviews')).toBeInTheDocument();
    });

    it('should render NewBooks inside ScrollToTop', () => {
        render(
        <BrowserRouter>
        <Home />
        </BrowserRouter>
        );
        expect(screen.getByTestId('ScrollToTop')).toBeInTheDocument();
    });

  
})
