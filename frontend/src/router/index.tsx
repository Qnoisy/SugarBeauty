import Main from '../components/sections/Main/Main';
import Test from '../pages/Test';
import Test2 from '../pages/Test2';
import { Profile } from './Profile';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

export const privateRoutes = [
	{ path: '/', component: <Main /> },
	{ path: '/test', component: <Test /> },
	{ path: '/test2', component: <Test2 /> },
	{ path: '/signIn', component: <SignIn /> },
	{ path: '/profile', component: <Profile /> },
];

export const publicRoutes = [
	{ path: '/', component: <Main /> },
	{ path: '/test', component: <Test /> },
	{ path: '/signIn', component: <SignIn /> },
	{ path: '/signUp', component: <SignUp /> },
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
