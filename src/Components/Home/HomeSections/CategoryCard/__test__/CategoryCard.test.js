import { render, screen } from '@testing-library/react';
import CategoryCard from '../CategoryCard';
import { BrowserRouter } from 'react-router-dom';



describe("CategoryCard", () =>{
const shuffledArray =[
    {
        catName: "Science",
        img: ''
    },
    {
        catName: "Children",
        img: ''
    },
    {
        catName: "Cooking",
        img: ''
    },
    {
        catName: "Science Fiction",
        img: ''
    },
    {
        catName: "Business",
        img: ''
    },
    {
        catName: "Architecture",
        img: ''
    },

]
    it('should render BookCard', () => {
        render(
             <BrowserRouter>
             <CategoryCard shuffledArray={shuffledArray}/>
             </BrowserRouter>
        );
        const imgElement = screen.getAllByRole('img');
        expect(imgElement).toBeTruthy();
        expect(screen.getByTestId('CategoryCard')).toBeInTheDocument();
    });
  
})

