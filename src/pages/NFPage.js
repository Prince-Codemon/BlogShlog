import React from 'react'
import { Link } from 'react-router-dom'
import RHelmet from '../components/Helmet';

const NFPage = () => {
  return (
    <section className="flex items-center h-5/6 p-16  text-gray-100">
      <RHelmet title="404" />
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl text-gray-600">
            <span className="sr-only text-gray-600">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl text-gray-600">
            Sorry, we couldn't find this page.
          </p>
          <p className="mt-4 mb-8 text-gray-400">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Link
            rel="noopener noreferrer"
            to={"/"}
            className="px-8 py-3 font-semibold rounded bg-indigo-500 hover:bg-indigo-600"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NFPage