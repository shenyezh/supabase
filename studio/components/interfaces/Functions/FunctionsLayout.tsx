import BaseLayout from 'components/layouts'
import { observer } from 'mobx-react-lite'
import { useStore, withAuth } from 'hooks'
import { IconAlertCircle, IconCode, IconSlash, Loading, Tabs } from '@supabase/ui'
import { Tab } from '@headlessui/react'
import FunctionsNav from './FunctionsNav'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import WarningBanner from 'components/ui/WarningBanner'
import { WARNING_MESSAGE } from './Functions.constants'

const PageLayout = ({ children, centered }: { children?: React.ReactNode; centered?: boolean }) => {
  const { functions, ui } = useStore()
  const router = useRouter()

  const { id, ref } = router.query

  useEffect(() => {
    if (ui.selectedProjectRef) {
      functions.load()
    }
  }, [ui.selectedProjectRef])

  if (!functions.isLoaded) {
    return (
      <BaseLayout>
        <Loading active={true}>loading</Loading>
      </BaseLayout>
    )
  }

  const item = id ? functions.byId(id) : null
  const name = item?.name || ''

  return (
    <BaseLayout>
      <WarningBanner title={WARNING_MESSAGE.title} description={WARNING_MESSAGE.description} />
      {centered ? (
        <>
          <div className="mx-auto max-w-5xl py-32 px-5">
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 bg-brand-300 border border-brand-600 rounded text-brand-900
            flex items-center justify-center
          "
              >
                <IconCode size={14} strokeWidth={3} />
              </div>
              <h1 className="text-2xl text-scale-1200">Functions</h1>
            </div>

            {children}
          </div>
        </>
      ) : (
        <div className="h-full flex flex-col flex-grow py-10">
          <div
            className="
            w-full mx-auto

            transition-all

            px-5
            lg:px-20
            xl:px-24
            1xl:px-28
            2xl:px-32

            flex flex-col
            gap-8
        "
          >
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 bg-brand-300 border border-brand-600 rounded text-brand-900
            flex items-center justify-center
          "
              >
                <IconCode size={14} strokeWidth={3} />
              </div>
              <Link href={`/project/${ref}/functions`}>
                <h1
                  className="
              transition-colors 
              text-2xl text-scale-1200 
              cursor-pointer 
              hover:text-scale-1100"
                >
                  Functions
                </h1>
              </Link>

              {name && (
                <>
                  <span className="text-scale-800 dark:text-scale-700">
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      shapeRendering="geometricPrecision"
                    >
                      <path d="M16 3.549L7.12 20.600"></path>
                    </svg>
                  </span>
                  <h5 className="text-2xl text-scale-1200">{name}</h5>
                </>
              )}
            </div>
            {item && <FunctionsNav item={item} />}
          </div>
          <div
            // weird repetative styling
            className="
            h-full flex flex-col flex-grow

            w-full mx-auto

            transition-all

            px-5
            lg:px-20
            xl:px-24
            1xl:px-28
            2xl:px-32
        "
          >
            {children}
          </div>
        </div>
      )}
    </BaseLayout>
  )
}

export default withAuth(observer(PageLayout))
