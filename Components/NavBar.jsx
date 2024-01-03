import React, { useContext, useState } from "react";

import { CrowdFundingContext } from "../Context/CroudFunding";
import { Logo, Menu } from '../Components/index'

const NavBar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menulist = ["White Paper", "Project", "Donation", "Members"];

  return (
    <div className="backgroundMain">
      <div className="px-4 py-5 mx-auto sm: max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="/"
              aria-label="Company"
              title="Company"
              className="inline-flex items-center mr-8">
              <Logo color="text-white" />
              <span className="ml-2 text-xl font-bold tracking-wide text-gray-100 uppercase">
                Pursuit Coin
              </span>
            </a>
            <ul className="flex items-center hidden space-x-8 lg:flex">
              {menulist.map((menu, index) => (
                <li key={index + 1}>
                  <a
                    href="/"
                    aria-label="Our product"
                    title="Our product"
                    className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-teal-accent-400"
                  >
                    {menu}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {
            !currentAccount && (
              <ul className="flex items-center space-x-8 lg:flex">
                <li>
                  <button
                    onClick={() => connectWallet()}
                    className="inline-flex items-center justify-center h-12 px-6 font-medium
                    tracking-wide text-white transition duration-200 rounded shadow-md
                    bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700
                    focus:shadow-outline focus:outline-none background"
                  >
                    Connect Wallet
                  </button>
                </li>
              </ul>
            )
          }
          <div className="lg:hidden z-40">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu />
            </button>
            {
              isMenuOpen && (
                <div className="absolute top-0 left-0 w-full">
                  <div className="p-5 bg-white border rounded shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <a
                          href="/"
                          aria-label="Company"
                          title="Company"
                          className="inline-flex items-center"
                        >
                          <Logo color="text-gray-900" />
                          <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            Pursuit Coin
                          </span>
                        </a>
                      </div>
                      <div>
                        <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                        onClick={() =>setIsMenuOpen(false)}
                        >
                          <svg className="w-5 text-gray-600 hover:text-gray-900" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M18.292 18.292a1 1 0 0 1-1.414 0L12
                              13.414l-4.95 4.95a1 1 0 1 1-1.414-1.414l4.95-4.95-4.95-4.95a1
                              1 0 1 1 1.414-1.414l4.95 4.95 4.95-4.95a1 1 0 1 1 1.414
                              1.414l-4.95 4.95 4.95 4.95a1 1 0 0 1 0 1.414z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <nav>
                      <ul className="space-y-4">
                        {menulist.map((menu, index) => (
                          <li key={index + 1}>
                            <a
                              href="/"
                              aria-label="Our product"
                              title="Our product"
                              className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                            >
                              {menu}
                            </a>
                          </li>
                        ))}
                        <li>
                          <a
                          href="/"
                          className="inline-flex items-center background
                          justify-center w-full h-12 px-6 font-medium tracking-wide
                          text-white transition duration-200 rounded shadow-md
                          bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700
                          focus:shadow-outline focus:outline-none"
                          aria-label="Sign Up"
                          title="Sign Up"
                          >
                            Connect Wallet
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
};

export default NavBar;













