'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@repo/ui/navbar';
import { useLanguage } from '../i18n';
import LanguageSelector from './LanguageSelector';

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

  return (
    <Navbar
      items={navItems}
      renderLink={(item, children) => (
        <Link key={item.href} href={item.href}>
          {children}
        </Link>
      )}
      rightContent={<LanguageSelector />}
    />
  );
}
