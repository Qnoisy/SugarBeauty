import { GallerySection } from 'components/sections/GallerySection';
import Main from '../components/sections/Main/Main';

import { Course } from 'pages/Course';
import { Profile } from 'pages/Profile';
import { ResetPassword } from '../pages/ResetPassword';

import AdminPanel from 'pages/AdminPanel/AdminPanel';
import SignIn from 'pages/SignIn/SignIn';
import { SignUp } from '../pages/SignUp';

export const privateRoutes = [
	{ path: '/', component: <Main /> },
	{ path: '/profile', component: <Profile /> },
	{ path: '/admin', component: <AdminPanel />, isAdmin: true },
	{ path: '/course', component: <Course /> },
	{ path: '/signIn', component: <SignIn /> },
	{ path: '/signUp', component: <SignUp /> },
	{ path: '/resetPassword', component: <ResetPassword /> },
	{ path: '/gallery', component: <GallerySection /> },
];

export const publicRoutes = [
	{ path: '/', component: <Main /> },
	{ path: '/signIn', component: <SignIn /> },
	{ path: '/signUp', component: <SignUp /> },
	{ path: '/resetPassword', component: <ResetPassword /> },
	{ path: '/gallery', component: <GallerySection /> },
];

export interface MenuItem {
	title: string;
	path: string;
}

export const menuItems: MenuItem[] = [
	{ path: '/', title: 'Home' },
	{ path: '/signIn', title: 'In' },
	{ path: '/signUp', title: 'Up' },
	{ path: '/profile', title: 'Profile' },
];
