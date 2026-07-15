import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';
// @ts-ignore
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// @ts-ignore
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      {/* toaster */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        newestOnTop
      />
    </QueryClientProvider>
  );
};

export default App;
