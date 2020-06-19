import React from 'react';
import Icon, { IconType, IconSize } from '../icon/index';
import styles from './index.scss';

export default function Tabs() {
  return (
    <div
      className={styles.tabs}
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 0,
        position: 'realtive',
        zIndex: 10000,
      }}
    >
      {/* <Icon type={IconType.camera} /> */}
      <Icon type={IconType.hot} />
      <Icon type={IconType.show} />
      <Icon
        type={IconType.flash}
        // size={IconSize.large}
        size={IconSize.small}
        style={{
          color: '#ffd700',
          borderRadius: '50%',
          background:
            'linear-gradient(15deg, rgba(138, 179, 124), rgba(67, 160, 128))',
          width: 78,
          height: 78,
          position: 'relative',
          top: -18,
          border: '8px solid #272a2d',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'rgba(115, 115, 115, 0.25) 0px 4px 10px 1px',
        }}
      />
      <Icon type={IconType.voice} />
      <Icon type={IconType.crown} />
    </div>
  );
}
