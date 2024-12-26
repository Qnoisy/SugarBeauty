// Swiper.tsx
import classNames from 'classnames';
import React, { useRef } from 'react';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Container } from '../Container';
import { CustomButton } from '../UI/CustomButton';
import Arrow from './Arrow/Arrow';
import styles from './Swiper.module.scss';

interface Slide {
	image: string;
}

interface SwiperProps {
	slides: Slide[];
	className?: string;
	title?: string;
}

const Swiper: React.FC<SwiperProps> = ({ slides, title, className }) => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		centerMode: true,
		centerPadding: '10%',
		autoplay: true,
		autoplaySpeed: 10000,
		responsive: [
			{
				breakpoint: 399.98,
				settings: {
					slidesToShow: 1,
					centerPadding: '10%',
				},
			},
			{
				breakpoint: 575.98,
				settings: {
					slidesToShow: 1,
					centerPadding: '15%',
				},
			},
			{
				breakpoint: 767.98,
				settings: {
					slidesToShow: 2,
					centerPadding: '0',
				},
			},
			{
				breakpoint: 991.98,
				settings: {
					slidesToShow: 2,
					centerPadding: '10%',
				},
			},
			{
				breakpoint: 1199.98,
				settings: {
					slidesToShow: 3,
					centerPadding: '0',
				},
			},
			{
				breakpoint: 1399.98,
				settings: {
					slidesToShow: 3,
					centerPadding: '10%',
				},
			},
		],
	};
	const sliderRef = useRef<Slider>(null);
	const handlePrev = () => {
		sliderRef.current?.slickPrev();
	};
	const handleNext = () => {
		sliderRef.current?.slickNext();
	};

	return (
		<div className={classNames(styles.swiperWrapper, className)}>
			{title && (
				<Container>
					<div className={styles.swiper__row}>
						<h2 className={styles.title}>
							<strong>{title}</strong>
						</h2>
						<CustomButton
							to='/gallery'
							text='zobacz więcej'
							className={styles.swiper__btn}
						/>
					</div>
				</Container>
			)}
			<Slider {...settings} className={styles.swiperBlock} ref={sliderRef}>
				{slides.map((slide, index) => (
					<div key={index} className={styles.slideContainer}>
						<img src={slide.image} alt={`Slide ${index + 1}`} />
					</div>
				))}
			</Slider>
			<Container>
				<div className={styles.row__arrow}>
					<Arrow
						direction='left'
						onClick={handlePrev}
						className={styles.arrows}
					>
						<FaArrowLeftLong />
					</Arrow>
					<Arrow
						direction='left'
						onClick={handleNext}
						className={styles.arrows}
					>
						<FaArrowRightLong />
					</Arrow>
				</div>
			</Container>
		</div>
	);
};

export default Swiper;
