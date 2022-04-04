import Layout from './Layout.server';

export default function About() {
  return (
    <Layout>
      <div className="py-10 border-b border-gray-200">
        <div className="max-w-3xl text-center mx-4 md:mx-auto">
          <h1 className="font-bold text-4xl md:text-5xl text-gray-900 mb-6 mt-6">
            Classic styles since 2016
          </h1>
          <p className="text-lg m-8 text-gray-500">
            As a small start-up company, our mission is and always has been
            providing the most sought after skateboarding and lifestyle products
            possible. Our store is empowered by Shopify, so you can trust all
            payments, shipping, and products to be top-tier quality.
          </p>
          <p className="text-lg m-8 text-gray-500">
            All orders placed before 9 PM Eastern Time will be processed the
            same day, and will ship within 3 business days. Shipping within the
            continental United States is always free.
          </p>
          <p className="text-lg m-8 text-gray-500">
            We are a small start-up of enthusiasts, which means our inventory is
            constantly changing to go along with whatever style we are feeling
            or what is trending. Please reach out with any suggestions or
            questions, and follow our social media accounts to interact with us
            and stay up to date on announcements!
          </p>
        </div>
      </div>
    </Layout>
  );
}
