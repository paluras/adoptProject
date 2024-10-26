import React from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

interface SwipperProps {
    img: string[]
}
const SwiperComponent: React.FC<SwipperProps> = ({ img }) => {

    if (!img) return (<div>.....</div>)
    return (
        <>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={4}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    img.map((item: string | undefined, index) => (
                        <SwiperSlide key={index}> <img width={300}
                            height={300}
                            className='object-cover aspect-[3/2] '
                            src={`${import.meta.env.VITE_API_URL}/uploads/${item}`}
                            alt={item} /></SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
}

export default SwiperComponent