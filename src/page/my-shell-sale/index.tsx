import React from 'react';
import useDynamicScript from '../../hook/useDynamicScript';

const SaleApp = () => {
  const remoteUrl = 'http://localhost:5001/assets/remoteEntry.js';
  const [Component, setComponent] = React.useState<any>(null);
  const { ready, errorLoading, loading } = useDynamicScript(remoteUrl);

  const key = `${remoteUrl}-sale`;
  React.useEffect(() => {
    if (ready && !Component) {
      const Comp = React.lazy(() => import('saleApp/Sale'))
      setComponent(Comp);
    }
    // key includes all dependencies (scope/module)
  }, [Component, ready, key]);

  return (
    <React.Suspense fallback={<div>loading</div>}>
      {Component && <Component />}
    </React.Suspense>
  );
};

export default SaleApp;
