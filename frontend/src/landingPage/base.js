import React from "react";
import Signin from "./signin";
const Home = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src="https://raw.githubusercontent.com/AbhinavS99/PlegBloc/main/images/Logo.png"
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              PlegBloc - Trustful Crowdfunding
            </h1>
            <p className="mb-8 leading-relaxed">
              PlegBloc is a trustful crowdfunding platform i.e. it enables the
              funding partners to know and check as to where and how their
              funding is used or is proposed to be used by the venture. PlegBloc
              upholds the principle of trustful crowdfunding by enabling the
              investors to decide the place where the capital can be spent.
            </p>
            <div className="flex justify-center">
              <button
                className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
                onClick={<Signin />}
              >
                Sign In
              </button>
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
