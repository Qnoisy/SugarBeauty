import classNames from 'classnames';
import { ChangeEvent, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import styles from './Search.module.scss';

export const Search = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [search, setSearch] = useState('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const toggleSearch = () => {
		setIsExpanded(prev => !prev);
		if (isExpanded) {
			console.log(search);
			setSearch('');
		}
	};

	return (
		<div
			className={classNames(styles.search, { [styles.expanded]: isExpanded })}
		>
			<input
				className={styles.search__input}
				onChange={handleChange}
				value={search}
				name='search'
				type='text'
				placeholder='Search...'
			/>
			<button className={styles.search__btn} onClick={toggleSearch}>
				<FaMagnifyingGlass className={styles.search__icon} />
			</button>
		</div>
	);
};
