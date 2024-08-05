import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import AuthWrapper from '../components/authWrapper/index';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const QuotationPage = lazy(() => import('src/pages/quotation'));
export const QuotationCreatePage = lazy(() => import('src/pages/quotation-create'));
export const QuotationUpdatePage = lazy(() => import('src/pages/quotation-update'));
export const QuotationPrintPage = lazy(() => import('src/pages/quotation-print'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <AuthWrapper>
              <Outlet />
            </AuthWrapper>
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'quotation', element: <QuotationPage /> },
        { path: 'quotation/create', element: <QuotationCreatePage /> },
        { path: 'quotation/:id', element: <QuotationUpdatePage /> },
        { path: 'generate/document/:id', element: <QuotationPrintPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
