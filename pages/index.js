import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  BsInstagram,
  BsWhatsapp,
  BsTiktok,
  BsYoutube,
  BsTwitter,
  BsTelegram,
} from 'react-icons/bs';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { ethers, BigNumber } from 'ethers';
import contractAbi from '../contract-abi.json';
import {
  useContract,
  useContractRead,
  MediaRenderer,
} from '@thirdweb-dev/react';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { BiLogoTelegram } from 'react-icons/bi';
import { SiSubstack } from 'react-icons/si';
import AnkyModal from '../components/AnkyModal';

export default function Home(props) {
  const router = useRouter();
  const [socialsForDisplay, setSocialsForDisplay] = useState(false);
  const [socialsLink, setSocialsLink] = useState('');
  const [contract, setContract] = useState(null);
  const [totalSupplyData, setTotalSupplyData] = useState(null);
  const [lastMintedIndex, setLastMintedIndex] = useState(null);
  const [handleMintLink, setHandleMintLink] = useState(false);
  const [handleWikiLink, setHandleWikiLink] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [lastMinted, setLastMinted] = useState(null);
  const sdk = new ThirdwebSDK('ethereum', {
    clientId: '599b25aaf4ecdc0bd8bcb2dfc50000a9',
  });

  const socials = social => {
    switch (social) {
      case 'instagram':
        return setSocialsLink('https://www.instagram.com/ankyerestu');
      case 'tiktok':
        return setSocialsLink('https://www.tiktok.com/@ankyerestu');
      case 'whatsapp':
        return setSocialsLink('https://wa.me/56985491126');
      case 'youtube':
        return setSocialsLink(
          'https://www.youtube.com/channel/UCsO2sX4NjuIOy8Yx0m5n02w'
        );
      case 'twitter':
        return setSocialsLink('https://www.twitter.com/kithkui');
      case 'substack':
        return setSocialsLink('https://jpfraneto.substack.com');
      case 'telegram':
        return setSocialsLink('https://t.me/jpfraneto');
    }
  };

  useEffect(() => {
    const loadContract = async () => {
      const thisContract = await sdk.getContract(
        '0x5806485215C8542C448EcF707aB6321b948cAb90',
        contractAbi
      );
      setContract(thisContract);
      console.log(thisContract);

      const data = await thisContract.call('totalSupply');
      const totalSupply = BigNumber.from(data._hex).toString();
      setLastMintedIndex(totalSupply);
    };
    loadContract();
  }, []);

  useEffect(() => {
    if (lastMintedIndex) {
      fetchMetadataFromLastMinted(lastMintedIndex);
    }
    async function fetchMetadataFromLastMinted(lastOne) {
      const metadata = await fetch(
        `https://599b25aaf4ecdc0bd8bcb2dfc50000a9.ipfscdn.io/ipfs/${process.env.NEXT_PUBLIC_METADATA_IPFS_CID}/${lastMintedIndex}`
      );
      const jsonResponse = await metadata.json();
      console.log('the json response is: ', jsonResponse);
      setLastMinted(jsonResponse);
    }
  }, [lastMintedIndex]);

  if (!lastMinted)
    return (
      <div className='flex flex-col justify-center items-center text-gray-400 w-screen pb-8'>
        <div className='h-screen flex flex-col pt-16 px-3 mx-auto w-screen items-center'>
          <h1 className='text-xl md:text-4xl  md:w-1/2 font-bold mb-4 text-center '>
            Retrieving the last minted Anky...
          </h1>
          <div role='status'>
            <svg
              aria-hidden='true'
              class='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
          </div>
        </div>
      </div>
    );
  return (
    <div className='flex flex-col fade-in justify-center items-center text-gray-400 w-screen pb-8'>
      <div className='h-screen flex flex-col pt-16 px-3 mx-auto w-screen items-center'>
        <h1 className='text-3xl md:text-4xl  md:w-1/2 font-bold mb-4 text-center '>
          your uniqueness is a gift
        </h1>
        <div className='flex flex-col md:flex-row relative'>
          <div className='-top-1 md:absolute md:-left-80 md:top-0.5 text-gray-600'>
            <p className='flex space-x-2 items-center'>
              This is {lastMinted.name}, the last minted Anky.
            </p>
            <p
              onClick={() => setModalOpen(true)}
              className='hover:text-gray-200 hover:cursor-pointer'
            >
              Click here to read its story.
            </p>
          </div>
          <div className='relative mt-4 md:mt-2 w-full aspect-square md:w-96 md:h-96 overflow-hidden rounded-xl mx-auto'>
            <Image
              fill
              alt='Last minted anky'
              src={lastMinted.image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
            />
          </div>
        </div>
        <p className='text-gray-400 md:w-1/2 text-xl my-4'>
          Inside you there are unique internal powers that can&apos;t be taken
          away. This is the source of your inner strength. Anky is here to help
          you remember that.
        </p>

        <div className='flex space-x-8'>
          <button
            onMouseEnter={() => setHandleMintLink(true)}
            onMouseLeave={() => setHandleMintLink(false)}
            onClick={() => router.push('/mint')}
            className=' w-28 text-2xl py-2 rounded-xl border-white border  hover:bg-gray-300 hover:text-black'
          >
            {handleMintLink ? '/mint' : 'mint'}
          </button>
        </div>
        <p className='mt-4'>TL;DR: One mint per wallet, 0.01618 eth.</p>
      </div>
      <div className='min-h-screen px-4 flex w-full flex-col items-center pt-16 mx-auto '>
        <h1 className='text-3xl md:text-5xl font-bold mb-4 '>
          enter the ankyverse
        </h1>
        <div className='w-full flex justify-center  flex-wrap items-center'>
          {[
            'primordia',
            'emblazion',
            'chryseos',
            'eleasis',
            'voxlumis',
            'insightia',
            'claridium',
            'poiesis',
          ].map((name, i) => {
            return <KingdomCard key={i} kingdomName={name} />;
          })}
        </div>

        <p className='mt-4'>8 unique worlds inside the otherside</p>
        <p className='mt-2'>One for working each aspect of your being.</p>
        <p className='mt-2'>
          These NFTs are going to be purchased with the proceeds of the mint
          process.
        </p>
      </div>
      <div className=' flex flex-col items-center pt-16  mx-auto '>
        <h1 className='text-3xl md:text-5xl font-bold mb-8 '>anky is you</h1>

        <p className='w-4/5 text-gray-400 text-xl text-center mb-2'>
          we are wired for stories, and you are the protagonist in this one.
        </p>

        <div className='flex flex-col m-2 space-x-2 md:flex-row w-full flex-wrap items-center justify-center'>
          {[1, 2, 3, 4].map((x, i) => (
            <div key={i} className='m-2 relative w-64 aspect-square '>
              <Image src={`/images/${x}.png`} fill alt={`Anky number ${x}}`} />
            </div>
          ))}
        </div>
        <button
          onMouseEnter={() => setHandleMintLink(true)}
          onMouseLeave={() => setHandleMintLink(false)}
          onClick={() => router.push('/mint')}
          className=' w-28 mt-4 md:mt-8 mb-8 text-2xl py-2 rounded-xl border-white border  hover:bg-gray-300 hover:text-black'
        >
          {handleMintLink ? '/mint' : 'mint'}
        </button>
      </div>
      <div className='px-3 md:w-10/12 mx-auto mb-4'>
        <hr className='h-px my-4 bg-gray-200 border-0 dark:bg-gray-700' />
        <small className='mt-4'>
          This project is built with a fundamental goal in mind: erradicate
          depression from humanity.
        </small>

        <hr className='h-px mt-4 mb-8 bg-gray-200 border-0 dark:bg-gray-700' />
        <div className='flex justify-center space-x-4 mt-4'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='hover:opacity-70 text-black'
            href='https://opensea.io/collection/anky-genesis'
          >
            <Image src='/images/opensea-logo.svg' width={36} height={36} />
          </a>
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='bg-white rounded-full h-fit border-black border hover:opacity-70 text-gray-400'
            href='https://etherscan.io/address/0x5806485215c8542c448ecf707ab6321b948cab90'
          >
            <Image src='/images/etherscan.svg' width={34} height={34} />
          </a>
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='bg-white rounded-full h-fit border-black border hover:opacity-70 text-gray-400'
            href='https://twitter.com/kithkui'
          >
            <Image src='/images/x.png' width={40} height={40} />
          </a>
        </div>
      </div>

      <AnkyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        anky={lastMinted}
      />
    </div>
  );
}

const MovingImageRow = ({ start, direction }) => {
  const images = [];

  for (let i = start; i < start + 11; i++) {
    images.push(`/images/ankys/${i}.png`);
  }

  const doubleImages = [...images, ...images];
  const imageRefs = useRef([]);

  useEffect(() => {
    const tick = () => {
      imageRefs.current.forEach((img, i) => {
        if (direction === 'right' && img.getBoundingClientRect().right <= 0) {
          img.style.transition = 'none';
          img.style.transform = `translateX(${
            img.offsetWidth * (doubleImages.length / 2 - 1)
          }px)`;
        } else if (
          direction === 'left' &&
          img.getBoundingClientRect().left >= window.innerWidth
        ) {
          img.style.transition = 'none';
          img.style.transform = `translateX(-${
            img.offsetWidth * (doubleImages.length / 2 - 1)
          }px)`;
        }
        // force a reflow
        void img.offsetWidth;
        img.style.transition = 'transform 40s linear';
        img.style.transform = `translateX(${direction === 'right' ? '-' : ''}${
          img.offsetWidth
        }px)`;
      });
    };

    const interval = setInterval(tick, 1000); // check every second

    return () => clearInterval(interval);
  }, [direction, doubleImages.length]);

  return (
    <div className={`image-row ${direction}`}>
      {doubleImages.map((image, index) => (
        <div
          ref={el => (imageRefs.current[index] = el)}
          className='relative w-96 md:w-48 aspect-square'
          key={index}
        >
          <Image src={image} alt={`Anky ${index + 1}`} layout='fill' />
        </div>
      ))}
    </div>
  );
};

const KingdomCard = ({ kingdomName, key }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className={`right p-4 border m-2 rounded-xl border-black  shadow-lg`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={`https://wiki.anky.lat/docs/ankyverse/Kingdoms/${kingdomName}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='relative w-64 aspect-square border-2 border-black'>
          <Image
            src={`/images/ankyverse/${kingdomName}.png`}
            alt={kingdomName}
            fill
          />
        </div>
        <h2
          className={`text-center uppercase text-2xl ${
            isHovered ? 'text-gray-700' : ''
          }`}
        >
          {kingdomName}
        </h2>
      </a>
    </div>
  );
};
