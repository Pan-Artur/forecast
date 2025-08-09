import styles from "./Nature.module.scss";
import img1 from "../../../assets/images/Nature/img1.webp";
import img2 from "../../../assets/images/Nature/img2.webp";
import img3 from "../../../assets/images/Nature/img3.webp";
import img4 from "../../../assets/images/Nature/img4.webp";
import img5 from "../../../assets/images/Nature/img5.webp";
import { Container } from "../../../components/Container/Container";
import { useState } from "react";

export function Nature() {
	const images = [img1, img2, img3, img4, img5]
	const [currentIndex, setCurrentIndex] = useState(2)

	const handlePrev = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		)
	}

	const handleNext = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		)
	}

	const handleImageClick = index => {
		setCurrentIndex(index)
	}

	const getImageClass = index => {
		const total = images.length
		const diff = (index - currentIndex + total) % total

		if (diff === 0) return 'center'
		if (diff === 1) return 'right'
		if (diff === 2) return 'right2'
		if (diff === total - 1) return 'left'
		if (diff === total - 2) return 'left2'
		return 'hidden'
	}

	return (
		<section className={styles.slider}>
			<Container>
				<div className={styles.sliderContainer}>
					<h1 className={styles.title}>Beautiful nature</h1>
					<ul className={styles.sliderList}>
						{images.map((image, index) => (
							<li
								key={index}
								className={`${styles.sliderImage} ${
									styles[getImageClass(index)]
								}`}
								onClick={() => handleImageClick(index)}
							>
								<img src={image} alt={`Slide ${index}`} />
							</li>
						))}
					</ul>
				</div>
			</Container>
		</section>
	)
}