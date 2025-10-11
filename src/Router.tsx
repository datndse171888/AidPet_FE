import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Homepage } from './pages/public/Homepage'
import { Layout } from './components/common/layout/Layout'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import Container from './components/common/Container'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { ResetPassword } from './pages/auth/ResetPassword'
import { Profile } from './pages/profile/Profile'
import { AuthorizationRoute } from './hooks/AuthorizationRoute'
import { VerifyAccount } from './pages/auth/VerifyAccount'
import { CreateShelter } from './pages/shelter/CreateShelter'
import { NavigationProvider } from './utils/NavigationProvider'
import { Unauthorized } from './pages/error/Unauthorized'
import { News } from './pages/public/News'
import { NewsDetail } from './pages/public/NewsDetail'
import { Notfound } from './pages/error/Notfound'
import { AdminLayout } from './components/common/layout/AdminLayout'
import { PostManager } from './pages/admin/PostManager'
import { Dashboard } from './pages/admin/Dashboard'
import { AdminProfile } from './pages/admin/AdminProfile'
import { AdminSetting } from './pages/admin/AdminSetting'
import { AnimalManager } from './pages/admin/AnimalManager'
import { Animal } from './pages/public/Animal'
import { Product } from './pages/public/Product'

export const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <NavigationProvider>
                <Routes>
                    <Route element={<Container />} >
                        {/* Public Routes */}
                        <Route path='/' element={<Layout />} >
                            <Route index element={<Homepage />} />
                            <Route path='news' element={<News />} />
                            <Route path='news/:id' element={<NewsDetail />} />
                            <Route path='product' element={<Product />} />
                            <Route path='animal' element={<Animal />} />
                            <Route path='profile' element={
                                <AuthorizationRoute requireAuth={true}>
                                    <Profile />
                                </AuthorizationRoute>} />
                        </Route>

                        {/* Shelter Routes */}

                        {/* Admin Routes */}
                        <Route path='/admin' element={
                            <AuthorizationRoute requireAuth={true} requiredRoles={['ADMIN']}>
                                <AdminLayout />
                            </AuthorizationRoute>
                        }>

                            <Route index element={<Dashboard />} />
                            <Route path='dashboard' element={<Dashboard />} />
                            <Route path='posts' element={<PostManager />} />
                            <Route path='animals' element={<AnimalManager />} />
                            <Route path='profile' element={<AdminProfile />} />
                            <Route path='settings' element={<AdminSetting />} />
                        </Route>

                        {/* Auth Routes */}
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/reset-password' element={<ResetPassword />} />
                        <Route path='/verify-account' element={<VerifyAccount />} />

                        {/* Create Routes */}
                        <Route path='/new-shelter' element={<CreateShelter />} />

                        {/* Error Routes */}
                        <Route path='/unauthorized' element={<Unauthorized />} />
                    </Route>

                    <Route path='*' element={<Notfound />} />
                </Routes>
            </NavigationProvider>
        </BrowserRouter>
    )
}
