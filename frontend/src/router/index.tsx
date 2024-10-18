import { GallerySection } from 'components/sections/GallerySection';
import Main from '../components/sections/Main/Main';
import Test from '../pages/Test';
import Test2 from '../pages/Test2';
import { Profile } from './Profile';
import { ResetPassword } from './ResetPassword';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export const privateRoutes = [
	{ path: '/', component: <Main /> },
	{ path: '/test', component: <Test /> },
	{ path: '/test2', component: <Test2 /> },
	{ path: '/signIn', component: <SignIn /> },
	{ path: '/profile', component: <Profile /> },
	{ path: '/signUp', component: <SignUp /> },
	{ path: '/resetPassword', component: <ResetPassword /> },
	{ path: 'gallery', component: <GallerySection /> },
];

export const publicRoutes = [
	{ path: '/', component: <Main /> },
	{ path: '/test', component: <Test /> },
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
	{ path: '/test', title: 'Test' },
	{ path: '/test2', title: 'Test2' },
	{ path: '/signIn', title: 'In' },
	{ path: '/signUp', title: 'Up' },
	{ path: '/profile', title: 'Profile' },
];
