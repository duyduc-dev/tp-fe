import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { publicRoute } from '@/routes/public.tsx';

const rootRouter = createBrowserRouter([...publicRoute]);

export default function RootRouteProvider() {
  return <RouterProvider router={rootRouter} />;
}
