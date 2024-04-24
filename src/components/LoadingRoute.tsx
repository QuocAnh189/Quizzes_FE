import Image from 'next/image';
import rolling from '../../public/assets/images/rolling.svg';

const LoadingRoute = () => {
    return (
        <div className='fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-bgModel'>
            <Image src={rolling} alt='' className='h-[180px] w-[180px]' />
        </div>
    );
};

export default LoadingRoute;
