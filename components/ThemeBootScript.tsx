'use client'

/** Inline boot script: only emitted during SSR so React 19 does not warn on the client. */
const BOOT_SCRIPT = `(function(){var root=document.documentElement;var bootDone=false;try{var key='theme';var stored=localStorage.getItem(key);var systemDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var theme=(stored==='light'||stored==='dark')?stored:(systemDark?'dark':'light');if(theme==='dark'){root.classList.add('dark');root.classList.remove('light')}else{root.classList.remove('dark');root.classList.add('light')}}catch(e){}function finishBoot(){if(bootDone)return;bootDone=true;root.classList.add('boot-ready')}if(document.readyState==='interactive'||document.readyState==='complete'){finishBoot()}else{document.addEventListener('DOMContentLoaded',finishBoot,{once:true})}window.addEventListener('load',finishBoot,{once:true});setTimeout(finishBoot,900)})();`

export function ThemeBootScript() {
  if (typeof window !== 'undefined') {
    return null
  }

  return (
    <script
      id="theme-boot"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }}
    />
  )
}
