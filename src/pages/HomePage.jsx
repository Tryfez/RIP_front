import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../api';
import { ProductCard } from '../components/ProductCard';
import { resetCategory, setCategories, setCategory, setProducts } from '../store/reducers/productReducer';

export const HomePage = () => {
    const { categories, category: selectedCategory, products } = useSelector((store) => store.product);
    const dispatch = useDispatch();
    const [q, setQ] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [value, setValue] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            await axiosInstance.get('categories').then((response) => dispatch(setCategories(response?.data)));
        };

        const fetchProducts = async (id) => {
            await axiosInstance
                .get('items-depth', { params: value })
                .then((response) => dispatch(setProducts({ products: response?.data, id })));
        };

        fetchCategories();
        fetchProducts(selectedCategory.id_category);
    }, [dispatch, selectedCategory, value]);

    const handleReset = () => {
        setQ('');
        setMax('');
        setMin('');
        setValue('');
    };

    const handleCategory = async (id) => {
        setQ('');
        setMin('');
        setMax('');
        setValue('');
        if (id === selectedCategory.id_category) {
            dispatch(resetCategory());
        } else {
            await axiosInstance.get(`categories/${id}`).then((response) => dispatch(setCategory(response?.data)));
        }
    };

    return (
        <div className='m-8'>
            <div className='flex gap-1'>
                <Link to='#'>{selectedCategory.title ? selectedCategory.title : 'Главная'}</Link> <p>/</p>
            </div>
            <div className='flex gap-2 my-8'>
                {categories.map((category) => (
                    <button
                        key={category.id_category}
                        className={`py-4 px-8 border rounded-xl ${
                            category.title === selectedCategory.title && 'bg-gray-500 text-white'
                        }`}
                        onClick={() => handleCategory(category.id_category)}
                    >
                        {category.title}
                    </button>
                ))}
            </div>
            <div>
                <div>
                    <p>Название</p>
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder='Введите значение...'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-500 outline-none placeholder-gray-300 text-white'
                    />
                </div>
                <div>
                    <p>Минимальная стоимость</p>
                    <input
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                        placeholder='Введите значение...'
                        type='number'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-500 outline-none placeholder-gray-300 text-white'
                    />
                </div>
                <div>
                    <p>Максимальная стоимость</p>
                    <input
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                        placeholder='Введите значение...'
                        type='number'
                        className='py-1 px-3 w-80 rounded-lg bg-gray-500 outline-none placeholder-gray-300 text-white'
                    />
                </div>
                <div className='mt-2 flex gap-2'>
                    <button
                        onClick={() => setValue({ q, min_cost: min, max_cost: max })}
                        className='py-1 px-4 bg-gray-500 rounded-xl text-white'
                    >
                        Искать
                    </button>
                    <button onClick={handleReset} className='py-1 px-4 bg-gray-500 rounded-xl text-white'>
                        Сбросить
                    </button>
                </div>
            </div>
            {products.length > 0 && (
                <div className='flex gap-y-2 flex-wrap'>
                    {products.map((product) => (
                        <ProductCard key={product.id_item} {...product} />
                    ))}
                </div>
            )}
        </div>
    );
};
