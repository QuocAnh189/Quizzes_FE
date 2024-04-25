'use client';
import { Suspense } from 'react';

//component
import Loading from 'src/app/loading';
import SideBar from 'src/components/common/SideBar';
import WithAuth from 'src/components/common/WithAuth';

export default function PagesWithSidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <WithAuth>
            <SideBar>
                <Suspense fallback={<Loading />}>{children}</Suspense>
            </SideBar>
        </WithAuth>
    );
}
