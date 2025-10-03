import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Homepage } from './pages/public/Homepage'
import { Layout } from './components/common/Layout'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { Cart } from './pages/public/Cart'
import Container from './components/common/Container'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { ResetPassword } from './pages/auth/ResetPassword'
import { Profile } from './pages/profile/Profile'
import { AuthorizationRoute } from './hooks/AuthorizationRoute'
import { VerifyAccount } from './pages/auth/VerifyAccount'
import { ShelterManager } from './pages/shelter/ShelterProfile'
import { CreateShelter } from './pages/shelter/CreateShelter'
import { NavigationProvider } from './utils/NavigationProvider'

export const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <NavigationProvider>
                <Routes>
                    <Route element={<Container />} >
                        <Route path='/' element={<Layout />} >
                            <Route index element={<Homepage />} />
                            <Route path='cart' element={
                                <AuthorizationRoute requireAuth={true}>
                                    <Cart />
                                </AuthorizationRoute>} />
                            <Route path='profile' element={
                                <AuthorizationRoute requireAuth={true}>
                                    <Profile />
                                </AuthorizationRoute>} />
                        </Route>

                        <Route path='/shelter' element={
                            <AuthorizationRoute requireAuth={true} requiredRoles={['SHELTER']} >
                                <ShelterManager />
                            </AuthorizationRoute>
                        } />

                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/reset-password' element={<ResetPassword />} />
                        <Route path='/verify-account' element={<VerifyAccount />} />4

                        <Route path='/new-shelter' element={<CreateShelter />} />
                    </Route>
                </Routes>
            </NavigationProvider>
        </BrowserRouter>
    )
}
