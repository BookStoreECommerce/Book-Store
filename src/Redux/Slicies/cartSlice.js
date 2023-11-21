import { createSlice } from "@reduxjs/toolkit";
import {
  getCart,
  addCartWithToken,
  updateCart,
  clearCart,
  deleteCartItem,
  createCart,
} from "./cartAction";
const initialState = {
  books: [],
  localStorageCart: { books: [] },
  discount: 0,
  totalAmount: 0,
  totalAmountAfterDisc: 0,
  isLoading: false,
  msgError: null,
  totalQty: 0,
  coupon_code: "",
  totalbooks: 0,
  loading: {},
  buyBook: null,
};

function getBook(payload) {
  return {
    book: {
      image: payload?.image?.secure_url,
      _id: payload._id,
      price: payload.variation_price,
      name: payload.name,
      slug: payload.slug,
    },
    price: payload.variation_price,
    qty: 1,
    totalPrice: payload.variation_price,
    coupon_code: "",
    variation_name: payload.variation_name,
  };
}

function getCartFromLocalStorage() {
  if (localStorage.getItem("cartDetails")) {
    return JSON.parse(localStorage.getItem("cartDetails"));
  } else {
    return false;
  }
}
function setCartFromLocalStorage(cart) {
  localStorage.setItem("cartDetails", JSON.stringify(cart));
}

function calcBookPrice(price, qty) {
  return price * qty;
}

const cartSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    calcPrice: (state) => {
      state.totalAmount = state.localStorageCart.books.reduce(
        (partialSum, book) => partialSum + book.totalPrice,
        0
      );
    },
    getCartWithoutToken: (state) => {
      state.isLoading = false;
      if (localStorage.getItem("cartDetails")) {
        state.localStorageCart.books = getCartFromLocalStorage().books;
      }
    },
    setCartInLocalStorage: (state, action) => {
      if (action.payload) {
        // state.localStorageCart = action.payload;
      }
      // localStorage.setItem('cartDetails', JSON.stringify(state.localStorageCart))
      state.msgError = action.payload.message;
    },
    clearLocalStorageCArt: (state, action) => {
      if (action.payload) {
        // localStorage.removeItem(action.payload);
        state.localStorageCart.books = [];
      }
      // state.isLoading = false;
      // state.msgError = action.payload.error;
    },
    addToCart: (state, { payload }) => {
      console.log(payload);
      const i = state.localStorageCart?.books?.findIndex(
        (el) =>
          el.book._id === payload._id &&
          el.variation_name === payload.variation_name
      );
      if (i === undefined)
        state.localStorageCart = { books: [{ ...getBook(payload) }] };
      else if (i === -1)
        state.localStorageCart?.books.push({ ...getBook(payload) });
      else {
        if (state.localStorageCart.books[i].variation_name === "hardcover") {
          state.localStorageCart.books[i].qty++;
          state.localStorageCart.books[i].coupon_code = "3agoooooz";
          const { price, qty } = state.localStorageCart?.books[i];
          state.localStorageCart.books[i].totalPrice = calcBookPrice(
            price,
            qty
          );
        }
      }

      setCartFromLocalStorage(state.localStorageCart);
    },
    increaseCartQty: (state, { payload }) => {
      const i = state.localStorageCart?.books?.findIndex(
        (el) => el.book._id === payload && el.variation_name === "hardcover"
      );
      if (state.localStorageCart.books[i].variation_name == "hardcover") {
        state.localStorageCart.books[i].qty++;
        state.localStorageCart.books[i].coupon_code = "agooooz";
        const { price, qty } = state.localStorageCart?.books[i];
        state.localStorageCart.books[i].totalPrice = calcBookPrice(price, qty);
        setCartFromLocalStorage(state.localStorageCart);
      }
    },
    decreaseCartQty: (state, { payload }) => {
      const i = state.localStorageCart?.books?.findIndex(
        (el) => el.book._id === payload && el.variation_name === "hardcover"
      );
      if (state.localStorageCart.books[i].variation_name == "hardcover") {
        state.localStorageCart.books[i].qty--;
        state.localStorageCart.books[i].coupon_code = "agooooz";
        const { price, qty } = state.localStorageCart?.books[i];
        state.localStorageCart.books[i].totalPrice = calcBookPrice(price, qty);
        setCartFromLocalStorage(state.localStorageCart);
      }
    },
    deletFromCart: (state, { payload }) => {
      console.log(payload);
      state.localStorageCart.books = state.localStorageCart?.books?.filter(
        (el) =>
          el.book._id !== payload.id ||
          el.variation_name !== payload.variation_name
      );
      setCartFromLocalStorage(state.localStorageCart);
      if (state.localStorageCart.books.length === 0) {
        localStorage.removeItem("cartDetails");
      }
    },
    addBookForBuy: (state, { payload }) => {
      state.buyBook = payload;
    },
  },
  extraReducers: (builder) => {
    // get cart with token
    builder.addCase(getCart.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.cart.books) {
        state.books = action.payload.cart.books;
        state.localStorageCart.books = action.payload.cart.books;
      }
      state.discount = action.payload.cart.discount;
      state.totalAmount = action.payload.cart.totalAmount;
      state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;
      state.msgError = action.payload.message;
      setCartFromLocalStorage(state.localStorageCart);
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.isLoading = false;
      state.msgError = action.payload.error;
    });

    // add cart with token
    builder.addCase(addCartWithToken.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addCartWithToken.fulfilled, (state, action) => {
      if (action.payload.cart) {
        state.books = action.payload.cart.books;
        state.localStorageCart.books = action.payload.cart.books;
        state.discount = action.payload.cart.discount;
        state.totalAmount = action.payload.cart.totalAmount;
        state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;
      }
      state.isLoading = false;
      state.msgError = action.payload.error;
      setCartFromLocalStorage(state.localStorageCart);
    });
    builder.addCase(addCartWithToken.rejected, (state, action) => {
      state.isLoading = false;
      // state.msgError = action.payload.error
    });

    // update Cart with token
    builder.addCase(updateCart.pending, (state, action) => {
      // state.isLoading = true;
      state.loading["cart/patchData"] = true;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.books = action.payload.cart.books;
      state.localStorageCart.books = action.payload.cart.books;
      state.discount = action.payload.cart.discount;
      state.totalAmount = action.payload.cart.totalAmount;
      state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;
      state.isLoading = false;
      state.msgError = action.payload.error;
      setCartFromLocalStorage(state.localStorageCart);
    });
    builder.addCase(updateCart.rejected, (state, action) => {
      state.isLoading = false;
      state.msgError = action.payload.error;
    });

    // delete CartItem with token
    builder.addCase(deleteCartItem.pending, (state, action) => {
      // state.isLoading = true;
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.books = action.payload.cart.books;
      state.localStorageCart.books = action.payload.cart.books;
      state.discount = action.payload.cart.discount;
      state.totalAmount = action.payload.cart.totalAmount;
      state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;
      state.isLoading = false;
      state.msgError = action.payload.error;
      setCartFromLocalStorage(state.localStorageCart);
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.isLoading = false;
      // state.msgError = action.payload.error
    });

    // clear Cart with token
    builder.addCase(clearCart.pending, (state, action) => {
      // state.isLoading = true;
    });
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.books = action.payload.cart.books;
      state.localStorageCart.books = action.payload.cart.books;
      state.discount = action.payload.cart.discount;
      state.totalAmount = action.payload.cart.totalAmount;
      state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;
      state.isLoading = false;
      state.msgError = action.payload.error;
      setCartFromLocalStorage(state.localStorageCart);
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.isLoading = false;
      // state.msgError = action.payload.error
    });

    // create cart with token
    builder.addCase(createCart.pending, (state, action) => {
      // state.isLoading = true;
    });
    builder.addCase(createCart.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload.cart) {
        state.books = action.payload.cart.books;
        state.localStorageCart.books = action.payload.cart.books;
        state.discount = action.payload.cart.discount;
        state.totalAmount = action.payload.cart.totalAmount;
        state.totalAmountAfterDisc = action.payload.cart.totalAmountAfterDisc;
        localStorage.removeItem("cartDetails");
      }
      state.isLoading = false;
      state.msgError = action.payload.error;
    });
    builder.addCase(createCart.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      // state.msgError = action.payload.error
    });
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  clearLocalStorageCArt,
  setCartInLocalStorage,
  getCartWithoutToken,
  addToCart,
  increaseCartQty,
  decreaseCartQty,
  deletFromCart,
  addBookForBuy,
  calcPrice,
} = cartSlice.actions;
// export const getCart = cartSlice.actions.getCart;
