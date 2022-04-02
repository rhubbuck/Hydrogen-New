import {Image, Link} from '@shopify/hydrogen';
import Bags from '../../public/images/bags.jpg';

/**
 * A shared component that defines a single featured collection to display on a storefront
 */
export default function FeaturedCollection({collection}) {
  return collection ? (
    <div className="shadow-xl rounded-xl grid grid-cols-1 lg:grid-cols-2 items-center bg-white overflow-hidden">
      <Image width="622" height="465" src={Bags} />
      <div className="px-10 py-10 lg:py-0">
        <h2 className="text-gray-700 text-3xl font-bold mb-5">Bags</h2>
        <p className="text-lg text-gray-500 mb-6">{collection.description}</p>
        <Link
          to={`/collections/bags`}
          className="inline-block bg-gray-900 text-white text-lg font-medium rounded-md py-4 px-16 uppercase"
        >
          Shop Collection
        </Link>
      </div>
    </div>
  ) : null;
}
