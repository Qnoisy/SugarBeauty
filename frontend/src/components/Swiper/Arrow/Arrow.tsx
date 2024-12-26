import React from 'react';

interface ArrowProps {
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
	children?: React.ReactNode;
	direction?: 'left' | 'right';
}

const Arrow: React.FC<ArrowProps> = ({
	className,
	style,
	onClick,
	children,
	direction,
}) => {
	return (
		<div className={className} onClick={onClick}>
			{children}
		</div>
	);
};

export default Arrow;
