import { Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#242424]">
      <Header />
      <main className="flex-grow bg-[#0a0a0a] w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
