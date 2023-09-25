import { render, screen } from '@testing-library/react';
import BookCard from '../BookCard';
import { MemoryRouter } from 'react-router-dom';


describe("BookCard", () =>{
const book=[
    {
        id:1,
        image:"",
        name:"Our World Our Life",
        price:310,
        author:"Lembid Noissa",
        ratr:1

    }
]
    it('should render BookCard', () => {
        render(
        <MemoryRouter>
        <BookCard key={book[0].id} image ={book[0].image} name={book[0].name} price={book[0].price} author={book[0].author} rate={book[0].rate} section="newBooks"/>
        </MemoryRouter>
        
        );
        expect(screen.getByTestId('BookCard')).toBeInTheDocument();
    });
  
})


describe("Rating", () =>{
    const book=[
        {
            id:1,
            image:"",
            name:"Our World Our Life",
            price:310,
            author:"Lembid Noissa",
            ratr:1
    
        }
    ]
        it('should render Rating inside BookCard', () => {
            render(
            <MemoryRouter>
            <BookCard key={book[0].id} image ={book[0].image} name={book[0].name} price={book[0].price} author={book[0].author} rate={book[0].rate} section="newBooks"/>
            </MemoryRouter>
            
            );
            expect(screen.getByTestId('rate')).toBeInTheDocument();
        });
      
    })
