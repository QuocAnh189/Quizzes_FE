'use client';

//hook
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useAuth } from 'src/hooks/useAuth';

//component
import Loading from 'src/app/loading';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user } = useAuth();

    const [isMounted, setIsMounted] = useState(false);
    const [canRenderChildren, setCanRenderChildren] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (user._id !== '' && user._id !== undefined && user._id !== null) {
            router.push('/home');
        } else {
            setCanRenderChildren(true);
        }
    }, [isMounted, user, router]);

    if (canRenderChildren)
        return (
            <div className='flex min-h-screen'>
                <Suspense fallback={<Loading />}>{children}</Suspense>
            </div>
        );
}
