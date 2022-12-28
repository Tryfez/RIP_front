import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    category: {},
    products: [],
    product: {},
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCategories: (state, { payload }) => {
            state.categories = payload;
        },
        setCategory: (state, { payload }) => {
            state.category = payload;
        },
        setProducts: (state, { payload }) => {
            if (!!payload?.id) {
                state.products = payload.products.filter((product) => +product.category.id_category === +payload.id);
            } else if (!payload.products) {
                state.products = payload;
            } else {
                state.products = payload.products;
            }
        },
        setProduct: (state, { payload }) => {
            state.product = payload;
        },
        resetCategory: (state) => {
            state.category = {};
        },
    },
});

export const productReducer = productSlice.reducer;

export const { setCategory, setCategories, setProduct, setProducts, resetCategory } = productSlice.actions;
