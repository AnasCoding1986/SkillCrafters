import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TabCategories = () => {

    const [jobs,setJobs] = useState([]);

    useEffect(()=>{
        const getData = async () => {
            const {data} = await axios(`${import.meta.env.VITE_API_URL}/jobs`);
            setJobs(data)
        }
        getData()
    },[])
    return (
        <div className='container mx-auto px-12'>
            <Tabs>
                <div className='flex items-center justify-center'>
                    <TabList>
                        <Tab>Web Development</Tab>
                        <Tab>Graphics Design</Tab>
                        <Tab>Digital Marketing</Tab>
                    </TabList>
                </div>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-7 lg:mt-10'>
                        {jobs
                            .filter(j => j.category === "Web Development")
                            .map(job =>
                                (<JobCard key={job._id} job={job}></JobCard>)
                            )}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-7 lg:mt-10'>
                        {jobs
                            .filter(j => j.category === "Graphics Design")
                            .map(job =>
                                (<JobCard key={job._id} job={job}></JobCard>)
                            )}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 md:mt-7 lg:mt-10'>
                        {jobs
                            .filter(j => j.category === "Digital Marketing")
                            .map(job =>
                                (<JobCard key={job._id} job={job}></JobCard>)
                            )}
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TabCategories;