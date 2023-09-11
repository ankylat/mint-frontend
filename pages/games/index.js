import React from 'react';

const GamesPage = () => {
  return (
    <div className='text-gray-300 md:p-8 p-2 pt-8 md:pt-2 md:w-3/5 mx-auto'>
      <h1 className='text-3xl font-bold'>GAMES</h1>

      <p className='mb-2 mt-4'>
        The ankyverse will be a catalyzer for human evolution. It will function
        in cycles of 96 days, called sojourns.
      </p>
      <p className='mb-2 mt-4'>
        The first one starts on the 10th of August, and throughout it I will
        develop a game called &quot;The Writing Dementor&quot;
      </p>
      <p>When you don&apos;t have time to think, your truth comes forth.</p>
      <p className='mb-2 mt-4'>
        You can start playing the game here:{' '}
        <a
          target='_blank'
          rel='noopener noreferrer'
          className='hover:opacity-70 text-gray-400'
          href='https://www.anky.lat'
        >
          https://www.anky.lat
        </a>
      </p>
      <p className='mb-6 mt-4'>
        Eventually, your anky will serve you as a companion in your life. It
        will know you. It will help you. It will show you what you cannot see
        from yourself.
      </p>
    </div>
  );
};

export default GamesPage;
