import FormContainer from 'components/FormContainer/FormContainer';
import useAdminCheck from 'hooks/useAdminCheck';
import Dashboard from 'pages/AdminPanel/Dashboard/Dashboard';
import UserManagement from 'pages/AdminPanel/UserManagement/UserManagement';
import React from 'react';
import Gallery from './GalleryManagement/Gallery/Gallery';
import { default as GalleryManagement } from './GalleryManagement/GalleryManagement';

const AdminPanel: React.FC = () => {
	const isAdmin = useAdminCheck();

	if (!isAdmin) {
		return <p>Access denied. Admins only.</p>;
	}

	return (
		<FormContainer title='Admin Panel'>
			<Dashboard />
			<UserManagement />
			<section>
				<GalleryManagement />
				<Gallery />
			</section>
		</FormContainer>
	);
};

export default AdminPanel;
