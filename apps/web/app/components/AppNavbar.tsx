'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@repo/ui/navbar';
import { useLanguage } from '../i18n';
import LanguageSelector from './LanguageSelector';
import styles from './AppNavbar.module.css';

export default function AppNavbar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    {
      label: t.navbar.employeeList,
      href: '/employees/table',
      isActive: pathname === '/employees/table',
    },
    {
      label: t.navbar.orgChart,
      href: '/employees/org-chart',
      isActive: pathname === '/employees/org-chart',
    },
  ];

  const handleOpenSwagger = () => {
    window.open('http://localhost:3002/api/docs', '_blank');
  };

  return (
    <Navbar
      items={navItems}
      renderLink={(item, children) => (
        <Link key={item.href} href={item.href}>
          {children}
        </Link>
      )}
      rightContent={
        <div className={styles.rightContent}>
          <button className={styles.apiDocsButton} onClick={handleOpenSwagger}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            {t.navbar.apiDocs}
          </button>
          <LanguageSelector />
        </div>
      }
    />
  );
}
