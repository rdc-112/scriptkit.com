import * as React from 'react'
import Link from 'components/link'
// import Logo from 'images/logo.svg'
import {Disclosure} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import classNames from 'classnames'
import {useRouter} from 'next/router'
import Logo from './logo'

const navItems = [
  {name: 'Community Scripts', href: '/scripts'},
  {name: 'Docs', href: '/docs'},
  // {name: 'Guide', href: '/guide'},
  {
    name: 'Discuss',
    href: 'https://github.com/johnlindquist/kit/discussions',
  },
  {name: 'Blog', href: '/blog'},
]

type NavigationProps = {
  className?: string
}

function Navigation({className = ''}: NavigationProps) {
  const router = useRouter()
  return (
    <Disclosure as="nav">
      {({open}) => (
        <div className={className}>
          <div className="w-full max-w-screen-lg px-5 py-2 mx-auto lg:px-0">
            <div className="relative flex items-center justify-between h-16">
              <Link href="/">
                <a className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 tracking-tighter text-black">
                    <Logo />
                  </div>
                  <div className="pl-2">
                    <div className="text-lg font-semibold leading-none">
                      Script Kit
                    </div>
                    <div className="text-sm opacity-80 leading-none">
                      by John Lindquist
                    </div>
                  </div>
                </a>
              </Link>
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-end">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-2">
                    {navItems.map((item) => {
                      const current = router.asPath === item.href
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          className={`
                          px-3 py-2 rounded-xl text-[0.95em] leading-tighter transition-all ease-in-out duration-200  
                          ${classNames({
                            'bg-gradient-to-t from-gray-900 to-gray-800 text-white hover:bg-gray-800 border border-transparent':
                              current,
                            'text-gray-300 bg-gradient-to-t hover:from-gray-900 hover:to-gray-800 hover:text-white border border-transparent hover:border-gray-800':
                              !current,
                          })}`}
                          aria-current={current}
                        >
                          {item.name}
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden bg-gradient-to-t from-gray-900 to-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const current = router.asPath === item.href
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`
                  block px-3 py-3 rounded-md
                  ${classNames({
                    'bg-gray-900 text-white': current,
                    'text-gray-100 hover:bg-gray-800 hover:text-white':
                      !current,
                  })}
                  `}
                    aria-current={current}
                  >
                    {item.name}
                  </a>
                )
              })}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}

export default Navigation
