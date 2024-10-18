import styles from './GallerySection.module.scss';

const slides = [
	{ image: 'https://picsum.photos/800/400?random=1' },
	{ image: 'https://picsum.photos/800/400?random=2' },
	{ image: 'https://picsum.photos/800/400?random=3' },
	{ image: 'https://picsum.photos/800/400?random=4' },
	{ image: 'https://picsum.photos/800/400?random=5' },
	{ image: 'https://picsum.photos/800/400?random=16' },
	{ image: 'https://picsum.photos/800/400?random=23' },
	{ image: 'https://picsum.photos/800/400?random=32' },
	{ image: 'https://picsum.photos/800/400?random=41' },
	{ image: 'https://picsum.photos/800/400?random=52' },
	{ image: 'https://picsum.photos/800/400?random=16' },
	{ image: 'https://picsum.photos/800/400?random=23' },
	{ image: 'https://picsum.photos/800/400?random=31' },
	{ image: 'https://picsum.photos/800/400?random=42' },
	{ image: 'https://picsum.photos/800/400?random=52' },
	{ image: 'https://picsum.photos/800/400?random=16' },
	{ image: 'https://picsum.photos/800/400?random=23' },
	{ image: 'https://picsum.photos/800/400?random=22' },
	{ image: 'https://picsum.photos/800/400?random=41' },
	{ image: 'https://picsum.photos/800/400?random=40' },
];

export const GallerySection = () => {
	return (
		<div className={styles.gallerySection}>
			<h2 className={styles.gallerySection__title}>
				<strong>Our Gallery</strong>
			</h2>
			<div className={styles.gallerySection__grid}>
				{slides.map((slide, index) => (
					<div key={index} className={styles.gallerySection__slide}>
						<img
							src={slide.image}
							alt={`Gallery Slide ${index + 1}`}
							loading='lazy'
						/>
					</div>
				))}
			</div>
		</div>
	);
};
