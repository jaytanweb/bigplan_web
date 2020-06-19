import React, { CSSProperties } from 'react';
import styles from './index.scss';

export enum IconType {
  flash = '&#xe8c6;',
  star = '&#xe8c7;',
  lineChart = '&#xe8c8;',
  camera = '&#xe8c9;',
  show = '&#xe8ca;',
  add = '&#xe8cb;',

  heart = '&#xe8ab;',
  experiment = '&#xe8ad;',
  lcoate = '&#xe8ae;',
  discover = '&#xe8af;',
  talk = '&#xe8b4;',
  delete = '&#xe8b6;',
  config = '&#xe8b7;',
  statistic = '&#xe8b9;',

  refresh = '&#xe8ba;',
  search = '&#xe8bb;',
  warn = '&#xe8bc;',
  hint = '&#xe8bd;',
  image = '&#xe8be;',
  music = '&#xe8c0;',
  voice = '&#xe8c1;',
  crown = '&#xe8d1;',
  hot = '&#xe8d3;',
}

export enum IconSize {
  default = 'default',
  small = 'small',
  large = 'large',
}

const ICON_TYPES: { [typeKey: string]: string } = Object.entries(
  IconType,
).reduce(
  (accu, next: Array<string>) => ({ ...accu, ...{ [next[0]]: next[1] } }),
  {},
);

interface IconProps {
  type: IconType;
  size?: IconSize;
  style?: CSSProperties;
  [key: string]: any;
}

export default function Icon(props: IconProps) {
  const { type, size = 'default', style = {}, ...rest } = props;

  return (
    <span
      className={`${styles.iconfont} ${styles[size]}`}
      {...rest}
      style={{ ...style }}
      dangerouslySetInnerHTML={{ __html: ICON_TYPES[type] || type || '' }}
    />
  );
}
