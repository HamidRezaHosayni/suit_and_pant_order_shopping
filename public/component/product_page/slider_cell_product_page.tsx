import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Navigation, Autoplay, Scrollbar } from 'swiper/modules';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


function Sider_cell_product_page(props: any) {
    console.log(props.picthure_product)
    return (
        <>
            <div className='h-[40vh] lg:h-[25rem] w-full lg:w-3/4 px-[0.5rem] lg:px-[unset]'>
                <Swiper className='h-[100%] rounded-lg'
                    modules={[A11y, Navigation, Pagination, Autoplay, Scrollbar]}
                    spaceBetween={50}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 10000,
                        pauseOnMouseEnter: true,
                        disableOnInteraction: false
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                        dynamicMainBullets: 1,
                        bulletClass: 'swiper-pagination-bullet bg-red-500 absolute !rounded-xl !w-10 !h-1'
                    }}

                >
                    {
                        props.picthure_product?.map((value: any, index: any) => {
                          
                            return (
                                <SwiperSlide key={index}><Image className='!h-[100%]' src={value !== "" ? `/img/upload_img/${value}` : `/img/upload_img/${ props.picthure_product[0]}`} layout="responsive" width={100} height={50} alt='picture_first_slider' /></SwiperSlide>
                            )
                        })
                    }

                    
                </Swiper>
            </div>
        </>
    )
}

export default Sider_cell_product_page