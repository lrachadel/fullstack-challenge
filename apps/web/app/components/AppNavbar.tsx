'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@repo/ui/navbar';

export default function AppNavbar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Funcionários',
      href: '/employees/table',
      isActive: pathname === '/employees/table',
    },
    {
      label: 'Organograma',
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
    />
  );
}
