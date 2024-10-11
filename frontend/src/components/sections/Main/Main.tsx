import React from 'react';
import Swiper from '../../Swiper/Swiper';
import { BigBlockInfo } from './BigBlockInfo';
import { MainInfo } from './MainInfo';

const slides = [
	{
		image: 'https://picsum.photos/800/400?random=1',
	},
	{
		image: 'https://picsum.photos/800/400?random=2',
	},
	{
		image: 'https://picsum.photos/800/400?random=3',
	},
	{
		image: 'https://picsum.photos/800/400?random=4',
	},
	{
		image: 'https://picsum.photos/800/400?random=5',
	},
];
const testData = [
	{
		id: 1,
		title: 'Consectetur adipisicing elit.',
		description:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quam eius, soluta fuga adipisci doloribus, aperiam provident quos, deserunt incidunt quasi nostrum impedit nihil accusamus architecto in illum. Aliquid, quibusdam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio quam eius, soluta fuga adipisci doloribus, aperiam provident quos, deserunt incidunt quasi nostrum impedit nihil accusamus architecto in illum. Aliquid, quibusdam!',
		additionalText:
			'Это дополнительный текст, который будет отображен при наличии.',
		image: 'img/frame1.jpg',
	},
	{
		id: 2,
		title: 'Consectetur adipisicing elit.',
		description:
			'Distinctio quam eius, soluta fuga adipisci doloribus, aperiam provident quos, deserunt incidunt quasi nostrum impedit nihil accusamus architecto in illum. Aliquid, quibusdam!',
		additionalText:
			'Это дополнительный текст, который будет отображен при наличии.',
		image: 'img/frame2.jpg',
	},
];
const Main: React.FC = () => {
	return (
		<main>
			<MainInfo data={testData[0]} imagePosition='right' />
			<Swiper slides={slides} title={'test'} />
			<MainInfo data={testData[1]} />
			<BigBlockInfo />
			<Swiper slides={slides} title={'test2'} />
		</main>
	);
};

export default Main;
