'use client';
 
import {useTranslations} from 'next-intl';
 
export default function Index() {
  const t = useTranslations('pages.test');
  return <h1>{t('title')}</h1>;
}