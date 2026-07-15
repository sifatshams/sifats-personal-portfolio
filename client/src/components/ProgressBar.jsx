import NProgress from 'nprogress';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import 'nprogress/nprogress.css';
import '../styles/progress.css';

NProgress.configure({
  showSpinner: false,
  minimum: 0.2,
  trickleSpeed: 120,
});

const ProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

export default ProgressBar;
