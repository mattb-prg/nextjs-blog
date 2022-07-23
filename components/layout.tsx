import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { NextRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Social } from './social';
import { Sidebar } from './sidebar';

const name = 'Your Name';
export const siteTitle = 'Next.js Sample Website';

interface ILayoutProps {
  children: React.ReactNode
  home?: boolean
}

const Layout: FC<ILayoutProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const onShowSidebar = () => {
    setShowSidebar(true)
  }

  return (
    <>
      <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
      <div onClick={() => showSidebar && setShowSidebar(!showSidebar)}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle,
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <div className='container mx-auto justify-center items-center'>
          <header className='grid grid-cols-3 items-center py-6 px-3'>
            <span className='w-4 cursor-pointer hover:fill-orange-700' onClick={onShowSidebar}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" /></svg>
            </span>
            <Link href={'/'}>
              <a className='font-extrabold text-lg text-center'>MYBLOG</a>
            </Link>
            <div className='space-x-4 flex justify-end'>
              <Social />
            </div>
          </header>
        </div>
        <div className='border-b'></div>
        <main className='py-4 px-3'>{children}</main>
        <div className='border-b-4'></div>
        <div className='py-4 flex flex-col space-y-4 bg-slate-700'>
          <div className='space-x-4 flex justify-center fill-white'>
            <Social />
          </div>
          <p className='text-center text-white'>Copyright © 2022 All rights reserved </p>
        </div>
      </div>
    </>
  );
}

export default Layout