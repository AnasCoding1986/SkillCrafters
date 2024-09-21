import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from './JobCard';

const TabCategories = () => {
    return (
        <div className='container mx-auto px-12'>
            <Tabs>
                <div className='flex items-center justify-center'>
                    <TabList>
                        <Tab>Web Development</Tab>
                        <Tab>Web Design</Tab>
                        <Tab>Digital Marketing</Tab>
                    </TabList>
                </div>

                <TabPanel>
                    <h2><JobCard></JobCard></h2>
                </TabPanel>
                <TabPanel>
                    <h2><JobCard></JobCard></h2>
                </TabPanel>
                <TabPanel>
                    <h2><JobCard></JobCard></h2>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TabCategories;