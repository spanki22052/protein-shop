import React from "react";
import { Link } from "react-router-dom";
import './aboutUsPage.scss';

const AboutUsPage = () => {
	return (
		<div className='aboutUsWrapper'>
			<div className='aboutUsTitle'>
				<span className='bio'>BIO</span>
				<span>MART</span>
			</div>
			<div className='aboutUsSupTitle'>
				Наши магазины
			</div>
			<div className='LocationCards'>
				<div className='aboutUsCard'>
					<img className='cardPhoto' src='/svg/street.png'></img>
					<div className='cardAdress'>г. Махачкала</div>
					<div className='cardAdressSup'>ул. Титова, 1</div>
					<img className='cardSvg' src='/svg/Vectormaps-1.svg'></img>
				</div>
				<div className='aboutUsCard'>
					<img className='cardPhoto' src='/svg/street.png'></img>
					<div className='cardAdress'>г. Махачкала</div>
					<div className='cardAdressSup'>ул. Титова, 1</div>
					<img className='cardSvg' src='/svg/Vectormaps-1.svg'></img>
				</div>
			</div>
			<div className='aboutUsSupTitle'>
				Наши клиенты
			</div>
			<div className='photoWrapper'>
				<img className='aboutUsPhoto' src='/svg/client1.jpg'></img>
				<img className='aboutUsPhoto' src='/svg/client2.jpg'></img>
				<img className='aboutUsPhoto' src='/svg/client3.jpg'></img>
			</div>
			<div><Link>Instagram</Link></div>
			<div className='aboutUsSupTitle'>
				Наши сотрудники
				</div>
			<div className='photoWrapper'>
				<div className='abousUsMan'>
					<img className='aboutUsPhoto' src='/svg/client4.jpg'></img>
					<div className='ManName'>Султан</div>
					<div className='ManTitle'>Один из лучших фитнес тренеров в Дагестане</div>
				</div>
				<div className='abousUsMan'>
					<img className='aboutUsPhoto' src='/svg/client5.jpg'></img>
					<div className='ManName'>Султан</div>
					<div className='ManTitle'>Один из лучших фитнес тренеров в Дагестане</div>
				</div>
			</div>
		</div >
	)
}

export default AboutUsPage;