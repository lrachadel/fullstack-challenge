'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from './ui';
import { useLanguage } from '../i18n';
import { useAuth } from '../auth';
import styles from './AppNavbar.module.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export default function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();

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
    window.open(`${API_BASE_URL}api/docs`, '_blank');
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
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
          {isAuthenticated ? (
            <div className={styles.authSection}>
              <span className={styles.username}>{user?.username}</span>
              <button className={styles.authButton} onClick={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                {t.auth.logout}
              </button>
            </div>
          ) : (
            <button className={styles.authButton} onClick={handleLogin}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              {t.auth.login}
            </button>
          )}
        </div>
      }
    />
  );
}
