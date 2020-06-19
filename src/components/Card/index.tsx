import React, { PropsWithChildren, CSSProperties } from 'react';
import styles from './index.scss';

interface CardProps {
  style: CSSProperties;
}

export default function Card(props: PropsWithChildren<CardProps>) {
  const { children, style = {} } = props;
  return (
    <div className={styles.card} style={{ ...style }}>
      {children}
    </div>
  );
}
