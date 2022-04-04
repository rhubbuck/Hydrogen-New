import {
  useShopQuery,
  flattenConnection,
  LocalizationProvider,
  CacheHours,
  Link,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Header from './Header.client';
import Footer from './Footer.server';
import Cart from './Cart.client';
import {Suspense} from 'react';
import '../custom.css';

/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */
export default function Layout({children, hero}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      numCollections: 3,
    },
    cache: CacheHours(),
    preload: '*',
  });
  const collections = data ? flattenConnection(data.collections) : null;
  const products = data ? flattenConnection(data.products) : null;
  const storeName = data ? data.shop.name : '';

  return (
    <LocalizationProvider preload="*">
      <div className="absolute top-0 left-0">
        <a
          href="#mainContent"
          className="p-4 focus:block sr-only focus:not-sr-only"
        >
          Skip to content
        </a>
      </div>
      <div className="min-h-screen max-w-screen text-gray-700 font-sans">
        {/* TODO: Find out why Suspense needs to be here to prevent hydration errors. */}
        <Suspense fallback={null}>
          <Header collections={collections} storeName={storeName} />
          <Cart />
        </Suspense>
        <main role="main" id="mainContent" className="relative bg-gray-50 mx-auto p-4 md:px-8 main-margin max-w-7xl">
          {/* <div className="hero-background">
            <h1 className="text-6xl text-white font-sans pt-36 tracking-wider text-center">
              Underground Skate Co.
            </h1>
            <p className="text-white text-2xl pt-2 text-center font-sans tracking-wider">
              Live your lifestyle
            </p>
            <div className="flex items-center justify-center pt-4">
              <Link to={`/collections/all`}>
                <button className="mx-auto text-white border p-2 rounded-sm content-center hover:bg-white hover:text-sky-500">
                  Shop Now
                </button>
              </Link>
            </div>
          </div> */}
          {hero}
          <div className="mx-auto md:pb-5 main-content">
            <Suspense fallback={null}>{children}</Suspense>
          </div>
        </main>
        <Footer collection={collections[0]} product={products[0]} />
      </div>
    </LocalizationProvider>
  );
}

const QUERY = gql`
  query layoutContent($numCollections: Int!) {
    shop {
      name
    }
    collections(first: $numCollections) {
      edges {
        node {
          description
          handle
          id
          title
          image {
            id
            url
            altText
            width
            height
          }
        }
      }
    }
    products(first: 1) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;
