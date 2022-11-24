import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { IconChevronLeft } from '~/../../packages/ui'
import * as NavItems from './NavigationMenu.constants'
import NavigationMenuGuideList from './NavigationMenuGuideList'
import NavigationMenuRefList from './NavigationMenuRefList'
import NavigationMenuCliList from './NavigationMenuCliList'

const SideNav = () => {
  const router = useRouter()

  const [level, setLevel] = useState('home')

  function handleRouteChange(url: string) {
    switch (url) {
      case `/docs`:
        setLevel('home')
        break
      case url.includes(`/docs/getting-started`) && url:
        setLevel('gettingstarted')
        break
      case url.includes(`/docs/guides/tutorials`) && url:
        setLevel('tutorials')
        break
      case url.includes(`/docs/guides/database`) && url:
        setLevel('database')
        break
      case url.includes(`/docs/guides/auth`) && url:
        setLevel('auth')
        break
      case url.includes(`/docs/guides/storage`) && url:
        setLevel('storage')
        break
      case url.includes(`/docs/guides/realtime`) && url:
        setLevel('realtime')
        break
      case url.includes(`/docs/guides/functions`) && url:
        setLevel('functions')
        break
      case url.includes(`/docs/reference`) && url:
        setLevel('reference')
        break
      case url.includes(`/docs/guides/integrations`) && url:
        setLevel('integrations')
        break
      case url.includes(`/docs/guides/platform`) ||
        (url.includes(`/docs/guides/hosting/platform`) && url):
        setLevel('platform')
        break
      case url.includes(`/docs/new/reference/javascript/`) && url:
        setLevel('reference_javascript')
        break
      case url.includes(`/docs/new/reference/cli/`) && url:
        setLevel('reference_cli')
        break

      default:
        break
    }
  }

  useEffect(() => {
    handleRouteChange(router.basePath + router.asPath)
    // Listen for page changes after a navigation or when the query changes
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const home = [
    [
      {
        label: 'Home',
        icon: 'home.svg',
        href: '',
        level: 'home',
      },
      {
        label: 'Getting started',
        icon: 'getting-started.svg',
        href: '/getting-started',
        level: 'gettingstarted',
      },
      {
        label: 'Tutorials',
        icon: 'tutorials.svg',
        href: '/guides/tutorials',
        level: 'tutorials',
      },
    ],
    [
      {
        label: 'Database',
        icon: 'database.svg',
        href: '/guides/database',
        level: 'database',
      },
      {
        label: 'Auth',
        icon: 'auth.svg',
        href: '/guides/auth',
        level: 'auth',
      },
      {
        label: 'Storage',
        icon: 'storage.svg',
        href: '/guides/storage',
        level: 'storage',
      },
      {
        label: 'Realtime',
        icon: 'realtime.svg',
        href: '/guides/realtime',
        level: 'realtime',
      },
      {
        label: 'Edge Functions',
        icon: 'functions.svg',
        href: '/guides/functions',
        level: 'functions',
      },
    ],
    [
      {
        label: 'API Reference',
        icon: 'reference.svg',
        href: '/reference',
        level: 'reference',
      },
      {
        label: 'Integrations',
        icon: 'integrations.svg',
        href: '/guides/integrations',
        level: 'integrations',
      },
      {
        label: 'Platform',
        icon: 'platform.svg',
        href: '/guides/hosting/platform',
        level: 'platform',
      },
    ],
  ]

  return (
    <div className="flex relative">
      {/* // main menu */}
      <div
        className={[
          'absolute transition-all duration-150 ease-out',
          level === 'home' ? 'opacity-100 ml-0 delay-150' : 'opacity-0 -ml-8',
          // level !== 'home' && 'opacity-0 invisible'
        ].join(' ')}
      >
        <ul className="relative w-full flex flex-col gap-5">
          {home.map((section, sectionIndex) => {
            return (
              <>
                {sectionIndex !== 0 && (
                  <div
                    className="h-px w-full bg-green-500"
                    key={`section-${sectionIndex}-border`}
                  ></div>
                )}
                <div className="flex flex-col gap-3" key={`section-${sectionIndex}`}>
                  {section.map((link) => {
                    return (
                      <Link href={link.href} passHref>
                        <a key={link.label}>
                          <li
                            className={[
                              'group flex items-center gap-3',
                              'text-base transition-all duration-150 text-scale-1200 hover:text-brand-900 hover:cursor-pointer ',
                            ].join(' ')}
                          >
                            <img
                              src={`${router.basePath}/img/icons/menu/${link.icon}`}
                              className="opacity-75 w-4.5 group-hover:scale-110 group-hover:opacity-100 ease-out transition-all"
                            />
                            {link.label}
                          </li>
                        </a>
                      </Link>
                    )
                  })}
                </div>
              </>
            )
          })}
        </ul>
      </div>

      <NavigationMenuGuideList id={'gettingstarted'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'tutorials'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'database'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'auth'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'storage'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'realtime'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'functions'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'reference'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'integrations'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuGuideList id={'platform'} currentLevel={level} setLevel={setLevel} />

      {/* reference level */}
      <NavigationMenuRefList id={'reference_javascript'} currentLevel={level} setLevel={setLevel} />
      <NavigationMenuCliList id={'reference_cli'} currentLevel={level} setLevel={setLevel} />

      {/* // ref menu */}
      {/* <div
        className={[
          'absolute transition-all ml-8 duration-200',
          level === 'ref' ? 'opacity-100 ml-0 visible' : 'opacity-0 invisible',
        ].join(' ')}
      >
        <ul className={'relative w-full flex flex-col gap-2'}>
          {ref.map((link) => {
            return (
              <li
                onClick={() => {
                  setLevel(link.level)
                  router.push(tempBasePath + link.href)
                }}
                className={[
                  'flex items-center gap-3',
                  'text-base transition-all duration-200 text-scale-1200 hover:text-brand-900 hover:cursor-pointer ',
                ].join(' ')}
              >
                <img src={`${router.basePath}/img/icons/menu/${link.icon}`} />
                {link.label}
              </li>
            )
          })}
        </ul>
      </div> */}

      {/* // JS menu */}
      {/* <div
        className={[
          'absolute transition-all ml-8 duration-200',
          level === 'ref_js' ? 'opacity-100 ml-0 visible' : 'opacity-0 invisible',
        ].join(' ')}
      >
        <ul className={'relative w-full flex flex-col gap-2'}>
          {ref_js.map((link) => {
            return (
              <li
                onClick={() => {
                  setLevel(link.level)
                  router.push(tempBasePath + link.href)
                }}
                className={[
                  'flex items-center gap-3',
                  'text-base transition-all duration-200 text-scale-1200 hover:text-brand-900 hover:cursor-pointer ',
                ].join(' ')}
              >
                <img src={`${router.basePath}/img/icons/menu/${link.icon}`} />
                {link.label}
              </li>
            )
          })}
        </ul>
      </div> */}

      {/* // Dart menu */}
      {/* <div
        className={[
          'absolute transition-all ml-8 duration-200',
          level === 'ref_dart' ? 'opacity-100 ml-0 visible' : 'opacity-0 invisible',
        ].join(' ')}
      >
        <ul className={'relative w-full flex flex-col gap-2'}>
          {ref_js.map((link) => {
            return (
              <li
                onClick={() => {
                  setLevel(link.level)
                  router.push(tempBasePath + link.href)
                }}
                className={[
                  'flex items-center gap-3',
                  'text-base transition-all duration-200 text-scale-1200 hover:text-brand-900 hover:cursor-pointer ',
                ].join(' ')}
              >
                <img src={`${router.basePath}/img/icons/menu/${link.icon}`} />
                {link.label}
              </li>
            )
          })}
        </ul>
      </div> */}
    </div>
  )
}

export default SideNav
