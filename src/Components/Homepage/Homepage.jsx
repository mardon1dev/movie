import React, { useContext } from 'react'
import { WatchContext } from '../../UseContext/useContext';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';

import './Homepage.scss'
import 'swiper/css';


const Homepage = () => {

    const { data } = useContext(WatchContext);
    // const {loading, setLoading} = useContext(WatchContext);

    if (data) {
        var showData = data.map((item, index) => {
            return (
                <div className="col-md-3 col-sm-4 col-6" key={index}>
                    <div className="video">
                        <div className="video__body">
                            <Link to={`/${item.youtubeTrailerVideoId}`} className="video__body--link">
                                <img src={item.posterURLs.original} alt="Photo" style={{width: "100%"}} className="rounded"/>
                            </Link>
                        </div>
                        <div className='video__info'>
                            <h3 className='video__info--title'>{item.originalTitle}</h3>
                        </div>
                    </div>
                </div>
            )
    })
        
    }

    return (
        <>
            <div className='main'>
                <div className='container'>
                    <div className='genres'>
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={7}>                   
                                <SwiperSlide>Detectiv</SwiperSlide>
                                <SwiperSlide>Drama</SwiperSlide>
                                <SwiperSlide>Fantastika</SwiperSlide>
                                <SwiperSlide>Harbiy</SwiperSlide>
                                <SwiperSlide>Jangari</SwiperSlide>
                                <SwiperSlide>Komediya</SwiperSlide>
                                <SwiperSlide>Kriminal</SwiperSlide>
                                <SwiperSlide>Multfilimlar</SwiperSlide>
                                <SwiperSlide>Sarguzasht</SwiperSlide>
                                <SwiperSlide>Tarixiy</SwiperSlide>
                                <SwiperSlide>Triller</SwiperSlide>
                                <SwiperSlide>Ujas</SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <section>
                    <div className='container'>
                        <div className='row g-3'>
                            {
                                showData
                            }
                        </div>  
                    </div>
                </section>
            </div>

        </>
    )
}

export default Homepage;