import { render, screen } from '@testing-library/react';
import CategoryCard from '../CategoryCard';



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

]
    it('should render BookCard', () => {
        render(
             <CategoryCard shuffledArray={shuffledArray}  />
        );
        const imgElement = screen.getAllByRole('img');
        expect(imgElement).toBeTruthy();
        expect(screen.getByTestId('CategoryCard')).toBeInTheDocument();
    });
  
})

