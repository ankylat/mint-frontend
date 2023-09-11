import { useState } from 'react';
import Image from 'next/image';
import { Righteous } from 'next/font/google';
import { MediaRenderer } from '@thirdweb-dev/react';
import { useRouter } from 'next/router';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const AnkyModal = ({ isOpen, onClose, children, anky }) => {
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 z-10  h-screen w-screen flex items-center justify-center bg-opacity-70 bg-black '>
      <div className='bg-black flex flex-col md:flex-row justify-start items-center border-thewhite border-2 text-thewhite h-4/5 md:h-3/5 px-4 md:max-h-96 overflow-y-scroll py-4 relative rounded-lg w-10/12 md:w-3/5  my-2 overflow-auto'>
        <div>
          <MediaRenderer src={anky.image} />
        </div>
        <div className='flex flex-col px-2  w-full md:w-3/5 overflow-y-scroll h-full pb-2 items-start mb-auto pt-1 '>
          <div className='mt-2 text-left overflow-y-scroll h-full w-full'>
            {anky.description.split('\n').map((x, i) => {
              return (
                <p key={i} className={`${righteous.className} mb-2 `}>
                  {x}
                </p>
              );
            })}
            <hr className='mb-2' />
            <p className={`${righteous.className} mb-2`}>
              As you see, each Anky has its unique lore.
            </p>
            <p className={`${righteous.className} mb-2`}>
              Are you ready to get yours?
            </p>
            <button
              onClick={() => router.push('/mint')}
              className=' w-28 text-2xl py-1 rounded-xl border-white border  hover:bg-gray-300 hover:text-black'
            >
              Mint
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          type='button'
          className='absolute top-1 right-0 mx-4 text-red-600 hover:text-red-800 font-bold text-xl'
        >
          close
        </button>
      </div>
    </div>
  );
};

export default AnkyModal;
