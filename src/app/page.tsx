'use client';

//components
import Navbar from 'src/components/landing/Header/Navbar';
import Intro from 'src/components/landing/Intro/Intro';
import Footer from 'src/components/landing/Footer/Footer';
import AutomaticRun from 'src/components/landing/AutomaticRun/AutomaticRun';
import Manage from 'src/components/landing/Manage/Manage';

export default function Landing() {
    return (
        <main className='overflow-hidden bg-bgGray'>
            <Navbar />
            <Intro />
            <Manage />
            <AutomaticRun />
            <Footer />
        </main>
    );
}
