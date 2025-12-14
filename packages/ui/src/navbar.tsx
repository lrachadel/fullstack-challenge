"use client";

import { ReactNode } from "react";
import styles from "./navbar.module.css";

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface NavbarProps {
  brandName?: string;
  brandSubtitle?: string;
  items: NavItem[];
  renderLink: (item: NavItem, children: ReactNode) => ReactNode;
  rightContent?: ReactNode;
}

export const Navbar = ({
  brandName = "Johnson & Johnson",
  brandSubtitle = "Portal de Funcionários",
  items,
  renderLink,
  rightContent,
}: NavbarProps) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarContent}>
          <div className={styles.navbarBrand}>
            <div className={styles.navbarLogo}>
              <span className={styles.navbarLogoText}>J&J</span>
            </div>
            <div className={styles.navbarTitleWrapper}>
              <h1 className={styles.navbarTitle}>{brandName}</h1>
              <p className={styles.navbarSubtitle}>{brandSubtitle}</p>
            </div>
          </div>

          <nav className={styles.navbarNav}>
            {items.map((item) =>
              renderLink(
                item,
                <span
                  key={item.href}
                  className={`${styles.navLink} ${item.isActive ? styles.navLinkActive : styles.navLinkInactive}`}
                >
                  {item.label}
                </span>
              )
            )}
          </nav>

          {rightContent && (
            <div className={styles.navbarRight}>
              {rightContent}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
