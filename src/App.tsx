import { Routes, Route, NavLink } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faUser, faDesktop } from "@fortawesome/free-solid-svg-icons"

import Home from "./components/Home"
import About from "./components/About"
import Services from "./components/Services"
import Contact from "./components/Contact"

const App = () => {
  return (
    <>
      <div className="w-full h-full min-h-screen flex flex-col flex-nowrap">
        <header className="w-full items-center bg-transparent">
          <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row flex-nowrap items-center md:place-content-between">
            <div className="py-8 text-center md:text-left">
              <a className="w-full max-w-1/3 text-2xl font-bold tracking-wide" href="/">
                Roger Weißenbrunner
              </a>
            </div>
            <div className="w-full max-w-2/3 py-8">
              <nav className="w-full place-items-center md:place-items-end">
                <ul className="flex flex-row flex-nowrap items-center gap-8 text-center">
                  <li>
                    <NavLink to="/">
                      <FontAwesomeIcon icon={faHome} className="md:mr-2" />
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about">
                      <FontAwesomeIcon icon={faUser} className="md:mr-2" />
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/services">
                      <FontAwesomeIcon icon={faDesktop} className="md:mr-2" />
                      Services
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        <main className="grow flex flex-col mx-auto w-full h-full max-w-5xl p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="w-full max-w-5xl mx-auto p-4">
          <p className="text-sm text-center font-black">
            Copyright (c) 2026 Roger Weißenbrunner.
            All rights reserved.
          </p>
        </footer>
      </div >
    </>
  )
}

export default App
