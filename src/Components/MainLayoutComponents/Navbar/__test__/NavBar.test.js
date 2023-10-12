import { render, renderHook, screen } from '@testing-library/react';
import NavBar from '../NavBar';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from '../../../../Redux/Slicies/appSlice';
import { authReducer } from '../../../../Redux/Slicies/authSlice';


const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
}));

const ReduxProvider = ({ children, reduxStore }) => (
    < Provider store={reduxStore}>{children}</Provider>
)

describe("Navbar Content", () => {
    const mockStore = () => configureStore({
        reducer: {
            auth: authReducer,
            app: appReducer
        }
    });

    const wrapper = ({ children }) => (
        <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
    );
    let store
    it('should render NavBar Component', () => {
        const ref = {
            current: {

                clientHeight: jest.fn()
            }
        }
        store = mockStore({
            user: ""
        })

        renderHook(() => { NavBar(ref) }, { wrapper });
        const Element = screen.queryByTestId('NavBar')
        expect(Element).toBeNull()
    });
})
