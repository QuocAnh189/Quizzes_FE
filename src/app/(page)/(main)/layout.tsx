import { Suspense } from 'react';

//component
import Loading from 'src/app/loading';
import WithAuth from 'src/components/common/WithAuth';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <WithAuth>
            <Suspense fallback={<Loading />}>{children}</Suspense>
        </WithAuth>
    );
}
