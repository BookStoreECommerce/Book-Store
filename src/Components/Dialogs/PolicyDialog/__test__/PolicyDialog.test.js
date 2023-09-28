import { render, renderHook, screen } from '@testing-library/react';
import PolicyDialog from '../PolicyDialog';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import {dialogReducer,} from '../../../../Redux/Slicies/dialogSlice';


const ReduxProvider = ({ children, reduxStore }) => (
    < Provider store={reduxStore}>{children}</Provider>
)

describe("Navbar Content", () =>{
    const mockStore =()=> configureStore({
        reducer: {
            dialog: dialogReducer,
         }
    });

    const wrapper = ({ children }) => (
      <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
    );
    let store
    it('should render NavBar Component', () => {

        store = mockStore({
        privacyOpen:false,     
})

        renderHook(()=> {PolicyDialog},{wrapper});
        const Element = screen.queryByTestId('PolicyDialog')
        expect(Element).toBeNull()
    });
})
