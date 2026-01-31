'use client'

import {useEffect} from 'react'
import {usePathname} from 'next/navigation'

export function BootReadySync() {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.classList.add('boot-ready')
  }, [pathname])

  return null
}
