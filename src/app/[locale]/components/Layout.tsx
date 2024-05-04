import React from 'react';
import Header from '@/app/[locale]/components/Header';
// import Footer from '@/app/[locale]/components/Footer';

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            {/*<Footer />*/}
        </div>
    );
};
export default Layout;
