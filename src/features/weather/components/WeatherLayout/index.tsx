import React, { ReactNode } from 'react';
import styles from './styles.module.css';

export interface WeatherLayoutProps {
  header: ReactNode;
  main: ReactNode;
  sidebar: ReactNode;
}

export const WeatherLayout = ({ header, main, sidebar }: WeatherLayoutProps) => {
  return (
    <div className={styles.app}>
      {header}

      <div className={styles.container}>
        <main className={styles.main}>{main}</main>

        <aside className={styles.sidebar}>{sidebar}</aside>
      </div>
    </div>
  );
};
