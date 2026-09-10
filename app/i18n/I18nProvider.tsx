'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { createTranslator, HTML_LANG, type Locale } from './core';

const LocaleContext = createContext<{locale: Locale; setLocale: (locale:Locale)=>void}>({locale:'zhCN',setLocale:()=>{}});
export function I18nProvider({initialLocale = 'zhCN', children, syncDocument = true}: {initialLocale?:Locale; children:ReactNode; syncDocument?:boolean}) {
  const [locale,setLocale]=useState<Locale>(initialLocale);
  useEffect(()=>{
    if (!syncDocument) return;
    document.documentElement.lang=HTML_LANG[locale];
    document.cookie=`d3-locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.title=createTranslator(locale).tr('圣休亚瑞秘典｜暗黑破坏神 III 单人攻略站');
  },[locale,syncDocument]);
  return <LocaleContext.Provider value={useMemo(()=>({locale,setLocale}),[locale])}>{children}</LocaleContext.Provider>;
}
export function useI18n(){
  const {locale,setLocale}=useContext(LocaleContext);
  return useMemo(()=>({...createTranslator(locale),setLocale}),[locale,setLocale]);
}
