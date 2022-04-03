import {
  useShopQuery,
  flattenConnection,
  Link,
  Seo,
  CacheDays,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Layout from '../components/Layout.server';
import FeaturedCollection from '../components/FeaturedCollection';
import FeaturedCollectionTwo from '../components/FeaturedCollectionTwo';
import FeaturedCollectionThree from '../components/FeaturedCollectionThree';
import ProductCard from '../components/ProductCard';
import Welcome from '../components/Welcome.server';
import ProductList from '../components/ProductList';
import LoadMore from '../components/LoadMore.client';
import '../custom.css';
import {Suspense} from 'react';

export default function Index({first = 6, country = {isoCode: 'US'}}) {
  const {data} = useShopQuery({
    query: QUERYTWO,
    variables: {
      first,
    },
  });
  const products = flattenConnection(data.products);

  return (
    <div className="mt-36">
    <div className="hero-background">
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
          </div>
    <Layout hero={<GradientBackground />}>
    {/* <div className="hero-background static top-0 left-0">
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
      <Suspense fallback={null}>
        <SeoForHomepage />
      </Suspense>
      <div className="relative mb-12">
        <Welcome />
        <Suspense fallback={<BoxFallback />}>
        <LoadMore current={first}>
        <ProductList products={products} />
      </LoadMore>
          {/* <FeaturedProductsBox country={country} /> */}
        </Suspense>
        <Suspense fallback={<BoxFallback />}>
          <FeaturedCollectionBox country={country} />
          <FeaturedCollectionBoxTwo country={country} />
          <FeaturedCollectionBoxThree country={country} />
        </Suspense>
      </div>
    </Layout>
    </div>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {title, description},
    },
  } = useShopQuery({
    query: SEO_QUERY,
    cache: CacheDays(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title,
        description,
      }}
    />
  );
}

function BoxFallback() {
  return <div className="bg-white p-12 shadow-xl rounded-xl mb-10 h-40"></div>;
}

function FeaturedProductsBox({country}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredProductsCollection = collections[3];
  const featuredProducts = featuredProductsCollection
    ? flattenConnection(featuredProductsCollection.products)
    : null;

  return (
    <div className="bg-white p-12 shadow-xl rounded-xl mb-10">
      {featuredProductsCollection ? (
        <>
          <div className="flex justify-between items-center mb-8 text-md font-medium">
            <span className="text-black uppercase">
              {featuredProductsCollection.title}
            </span>
            <span className="hidden md:inline-flex">
              <Link
                to={`/collections/${featuredProductsCollection.handle}`}
                className="text-blue-600 hover:underline"
              >
                Shop all
              </Link>
            </span>
          </div>
          <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="md:hidden text-center">
            <Link
              to={`/collections/${featuredProductsCollection.handle}`}
              className="text-blue-600"
            >
              Shop all
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

function FeaturedCollectionBox({country}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredCollection =
    collections && collections.length > 1 ? collections[1] : collections[0];

  return <FeaturedCollection collection={featuredCollection} />;
}

function FeaturedCollectionBoxTwo({country}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredCollectionTwo =
    collections && collections.length > 1 ? collections[0] : collections[0];

  return <FeaturedCollectionTwo collection={featuredCollectionTwo} />;
}

function FeaturedCollectionBoxThree({country}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      country: country.isoCode,
    },
    preload: true,
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredCollectionTwo =
    collections && collections.length > 1 ? collections[0] : collections[0];

  return <FeaturedCollectionThree collection={featuredCollectionTwo} />;
}

function GradientBackground() {
  return (
    <div className="fixed top-0 w-full h-32 overflow-hidden">
      {/* <div className="absolute w-full h-full bg-gradient-to-t from-gray-50 z-10" /> */}

      {/* <svg
        viewBox="0 0 960 743"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="filter blur-[30px]"
        aria-hidden="true"
      >
        <defs>
          <path fill="#fff" d="M0 0h960v540H0z" id="reuse-0" />
        </defs>
        <g clipPath="url(#a)">
          <use xlinkHref="#reuse-0" />
          <path d="M960 0H0v743h960V0Z" fill="#7CFBEE" />
          <path
            d="M831 380c200.48 0 363-162.521 363-363s-162.52-363-363-363c-200.479 0-363 162.521-363 363s162.521 363 363 363Z"
            fill="#4F98D0"
          />
          <path
            d="M579 759c200.479 0 363-162.521 363-363S779.479 33 579 33 216 195.521 216 396s162.521 363 363 363Z"
            fill="#7CFBEE"
          />
          <path
            d="M178 691c200.479 0 363-162.521 363-363S378.479-35 178-35c-200.4794 0-363 162.521-363 363s162.5206 363 363 363Z"
            fill="#4F98D0"
          />
          <path
            d="M490 414c200.479 0 363-162.521 363-363S690.479-312 490-312 127-149.479 127 51s162.521 363 363 363Z"
            fill="#4F98D0"
          />
          <path
            d="M354 569c200.479 0 363-162.521 363-363 0-200.47937-162.521-363-363-363S-9 5.52063-9 206c0 200.479 162.521 363 363 363Z"
            fill="#7CFBEE"
          />
          <path
            d="M630 532c200.479 0 363-162.521 363-363 0-200.4794-162.521-363-363-363S267-31.4794 267 169c0 200.479 162.521 363 363 363Z"
            fill="#4F98D0"
          />
        </g>
        <path fill="#fff" d="M0 540h960v203H0z" />
        <defs>
          <clipPath id="a">
            <use xlinkHref="#reuse-0" />
          </clipPath>
        </defs>
      </svg> */}
    </div>
  );
}

const SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      description
    }
  }
`;

const QUERY = gql`
  query indexContent($country: CountryCode) @inContext(country: $country) {
    collections(first: 4) {
      edges {
        node {
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
          products(first: 6) {
            edges {
              node {
                handle
                id
                title
                variants(first: 1) {
                  edges {
                    node {
                      id
                      title
                      availableForSale
                      image {
                        id
                        url
                        altText
                        width
                        height
                      }
                      priceV2 {
                        currencyCode
                        amount
                      }
                      compareAtPriceV2 {
                        currencyCode
                        amount
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
// Define the GraphQL query.
const QUERYTWO = gql`
  query HomeQuery(
    $first: Int!
  ) {
    products(first: $first) {
      edges {
        node {
          handle
          id
          media(first: 10) {
            edges {
              node {
                ... on MediaImage {
                  mediaContentType
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
          }
          priceRange {
            maxVariantPrice {
              currencyCode
              amount
            }
            minVariantPrice {
              currencyCode
              amount
            }
          }
          title
          variants(first: 250) {
            edges {
              node {
                id
                title
                availableForSale
                image {
                  id
                  url
                  altText
                  width
                  height
                }
                priceV2 {
                  currencyCode
                  amount
                }
                compareAtPriceV2 {
                  currencyCode
                  amount
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`