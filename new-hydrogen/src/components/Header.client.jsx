import {useEffect, useState} from 'react';
import {Link, Image} from '@shopify/hydrogen/client';
import CartToggle from './CartToggle.client';
import {useCartUI} from './CartUIProvider.client';
import Navigation from './Navigation.client';
import MobileNavigation from './MobileNavigation.client';
import Logo from '/images/logo.png';
import '../../src/custom.css';

/**
 * A client component that specifies the content of the header on the website
 */
export default function Header({collections, storeName}) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);
  const {isCartOpen} = useCartUI();

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    setScrollbarWidth(scrollbarWidth);
  }, [isCartOpen]);

  return (
    <header className="h-20 lg:h-32 absolute top-0" role="banner">
      <div
        className={`fixed z-20 h-20 lg:h-36 w-full border-b shadow border-gray-200 px-6 md:px-8 md:py-6 lg:pt-8 lg:pb-0 mx-auto bg-white ${
          isMobileNavOpen ? '' : 'bg-opacity-95'
        }`}
      >
        <div
          className="h-full flex lg:flex-col place-content-between"
          style={{
            paddingRight: isCartOpen ? scrollbarWidth : 0,
          }}
        >
          <div className="text-center w-full flex justify-between items-center">
            {/* <CountrySelector /> */}
            <Image
              src={Logo}
              width={65}
              height={65}
              className="hidden md:block"
            />
            <MobileNavigation
              collections={collections}
              isOpen={isMobileNavOpen}
              setIsOpen={setIsMobileNavOpen}
            />
            <Link
              className="title-pink uppercase text-3xl tracking-widest"
              to="/"
            >
              {storeName}
            </Link>
            <CartToggle
              handleClick={() => {
                if (isMobileNavOpen) setIsMobileNavOpen(false);
              }}
            />
          </div>
          <Navigation
            collections={collections}
            storeName={storeName}
            className="md:mx-3"
          />
        </div>
      </div>
    </header>
  );
}
