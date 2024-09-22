import React from 'react';
import Carosal from '../components/Carosal';
import TabCategories from '../components/TabCategories';
import { useLoaderData } from 'react-router-dom';

const Home = () => {
    const jobs = useLoaderData();
    console.log(jobs);
    

    return (
        <div>
            <Carosal></Carosal>
            <TabCategories></TabCategories>
        </div>
    );
};

export default Home;