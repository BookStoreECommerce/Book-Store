import { render, screen } from '@testing-library/react';
import ScrollToTop from '../ScrollToTop';
const {showTopBtn} = require('../ScrollToTop');

describe("ScrollToTop", () =>{

    it('should render ScrollToTop', () => {
        render(<ScrollToTop />);
        expect(showTopBtn).toBeFalsy();
    });
      

})
