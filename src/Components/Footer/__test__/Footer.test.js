import { render, renderHook, screen } from '@testing-library/react';
import Footer from '../Footer';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from '../../../Redux/Slicies/appSlice';

const ReduxProvider = ({ children, reduxStore }) => (
    < Provider store={reduxStore}>{children}</Provider>
)

describe("FooterContent", () =>{
    const mockStore =()=> configureStore({
        reducer: {
            app: appReducer,        }
    });

    const wrapper = ({ children }) => (
      <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
    );
    let store
    it('should render Footer Component', () => {
        const ref = {
            current:{
           
            clientHeight: jest.fn()
            }
        }
        store = mockStore({
            footerMargin:10
        })

        renderHook(()=> {Footer(ref)},{wrapper});
      
        const Element = screen.queryByTestId('footer')
        expect(Element).toBeNull()
    });
})
