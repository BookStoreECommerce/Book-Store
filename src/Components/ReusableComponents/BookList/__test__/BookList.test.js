import { render, screen } from '@testing-library/react';
import BookList from '../BookList';
const {NewBooks} = require('../BookList');

describe("BookList", () =>{

    it('should render Array not to be null', () => {
        render(<BookList  />);
        expect(NewBooks).not.toBeNull()
    });
  
})

