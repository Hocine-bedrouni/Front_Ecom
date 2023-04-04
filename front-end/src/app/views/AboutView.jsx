import React from 'react';
import Button from '../components/Button';

const AboutView = () => {

    return (
        <div className="">



<div className="flex h-screen">
                <div className="w-full h-screen bg-carte4 bg-cover bg-center ">
                    <div className="w-full h-full  bg-dark-600/30 backdrop-brightness-50 relative">
                        <div className='absolute  top-[256px] left-[90px] w-full'>
                        <h1 className="text-white md:text-3xl font-rubik-500 font-[36px]  ">QUI SOMMES-NOUS ?</h1>
                        <div className="">
                        <p className=" w-1/3  invisible md:visible ">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam, fugiat unde 
                            consectetur dolor nostrum culpa excepturi, esse est eligendi asperiores labore
                             nihil harum pariatur rem aspernatur eum quisquam explicabo vero.
                             
                            </p>
                            <Button className='text-xs invisible md:visible  '>DÉCOUVREZ</Button>
                        </div>
                  
                        
                       
                        </div>
                        
                    </div>
                </div>
            </div>

            <div>

                <div className="pt-6 pb-12 bg-white">
                    <div >


                        <div className="container  m-auto  items-center ">

                            <div className="w-full  p-3">
                                <div className="w-full flex flex-col lg:flex-row rounded overflow-hidden h-auto min-h-[400px]  min-w-2/3 border shadow">
                                    <div className=' bg-[#F9F6EF] flex-1 '>
                                        <img className="block   flex-none w-full  " src="../img/Image carrée techniciens.png" />
                                    </div>

                                    <div className="bg-white    p-4 flex flex-col  flex-1 items-center justify-center">
                                        <div className="text-black font-bold text-xl mb-2 leading-tight">Can life make you a bitter developer?</div>
                                        <p className="text-grey-darker text-base">Read more</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full  p-3">
                                <div className="w-full flex flex-col  rounded lg:flex-row-reverse overflow-hidden h-auto min-h-[400px]  min-w-2/3 border shadow">
                                    <div className='bg-primary flex-1 '>
                                        <img className="block   flex-none w-full  " src="../img/Image carrée équipe.png" />
                                    </div>

                                    <div className="bg-white    p-4 flex flex-col  flex-1 items-center justify-center">
                                        <div className="text-black font-bold text-xl mb-2 leading-tight">Can life make you a bitter developer?</div>
                                        <p className="text-grey-darker text-base">Read more</p>
                                    </div>
                                </div>
                            </div>
     


                        </div>
                    </div>
                </div>

            </div>

            <div className='w-full   bg-[#F9F6EF] pt-3 '>
                <h2 className="text-center font-serif  uppercase text-4xl ">NOS VALEURS</h2>
                <div className=" flex lg:flex-row gap-10 justify-between md:flex-row-none max-md:flex-col max-md:items-center m-10">
                    <div className="card w-[382px] h-[562px]  lg:flex-1 bg-carte1 bg-cover bg-center  relative">
                        <div className='absolute bottom-0 right-2 bg-[#F9F6EF]'>
                            <h3 className='font-bold'>Title</h3>
                            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Temporibus hic libero numquam ex facere est molestias possimus
                                deserunt optio modi quae perspiciatis cum itaque, autem adipisci earum sint
                                sequi sed?</p>
                        </div>
                    </div>
                    <div className="card w-[382px] h-[562px]  lg:flex-1 bg-carte2 bg-cover bg-center  relative">
                        <div className='absolute bottom-0 right-2 bg-[#F9F6EF]'>
                            <h3 className='font-bold'>Title</h3>
                            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Temporibus hic libero numquam ex facere est molestias possimus
                                deserunt optio modi quae perspiciatis cum itaque, autem adipisci earum sint
                                sequi sed?</p>
                        </div>
                    </div>
                    <div className="card w-[382px] h-[562px]   lg:flex-1 bg-carte3 bg-cover bg-center relative">
                        <div className='absolute bottom-0 right-2 bg-[#F9F6EF]'>
                            <h3 className='font-bold'>Title</h3>
                            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Temporibus hic libero numquam ex facere est molestias possimus
                                deserunt optio modi quae perspiciatis cum itaque, autem adipisci earum sint
                                sequi sed?</p>
                        </div>
                    </div>


                </div>

            </div>

        </div>



    );
};

export default AboutView;

