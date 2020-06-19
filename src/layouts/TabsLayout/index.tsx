import React, { Component } from 'react';
import styles from './index.scss';
import avatar from '@asset/avatar.jpg';

import Icon, { IconType } from '@component/icon/index';
import List, { Col } from '@component/List/index';
import Tabs from '@component/Tabs/index';
import Card from '@src/components/Card/index';

const imgs = [
  'https://images.unsplash.com/photo-1530126483408-aa533e55bdb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1530126483408-aa533e55bdb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1530126483408-aa533e55bdb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1530126483408-aa533e55bdb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',

  // 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  // 'https://images.unsplash.com/photo-1487701606976-c754b54d2d37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  // 'https://images.unsplash.com/photo-1519865885898-a54a6f2c7eea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
];

export default class TabsLayout extends Component<{}, {}> {
  render() {
    const listDom = imgs.map((src, i) => (
      <img
        key={`${src.slice(0, 10)}_${i}`}
        src={src}
        alt="avatar"
        style={{ maxWidth: '100%', borderRadius: 16 }}
      />
    ));

    return (
      <div className={styles.layoutContainer}>
        <Tabs />

        <UserCard style={{ marginBottom: 12 }} />

        <List.Default col={5} style={{ marginBottom: 12 }}>
          {listDom}
        </List.Default>

        {/* <List.Default col={Col.c2} style={{ marginBottom: 12 }}>
          {listDom}
        </List.Default>

        <List.Default col={Col.c3} style={{ marginBottom: 12 }}>
          {listDom}
        </List.Default>

        <List.Default col={Col.c4} style={{ marginBottom: 12 }}>
          {listDom}
        </List.Default> */}

        <List.Scoll style={{ marginBottom: 12 }}>
          {imgs.map((src) => (
            <img
              src={src}
              alt="avatar"
              style={{ width: 'calc(90vw - 32px)', borderRadius: 16 }}
            />
          ))}
        </List.Scoll>

        <List.Slides style={{ marginBottom: 12 }}>{listDom}</List.Slides>
      </div>
    );
  }
}

function UserCard({ style = {} }) {
  return (
    <Card style={{ ...style }}>
      <div style={{ display: 'flex', alignItems: 'stretch', height: 60 }}>
        <img
          src={avatar}
          alt="avatar"
          style={{ width: 60, borderRadius: '50%', marginRight: 12 }}
        />
        <div
          style={{
            padding: 6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <h3 style={{ fontSize: 18 }}>ElonWu</h3>
          <p style={{ fontSize: 12 }}>FrontEnd Developer</p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginLeft: 'auto',
            alignSelf: 'center',
          }}
        >
          <Icon type={IconType.star} style={{ color: 'gold' }} />
        </div>
      </div>
    </Card>
  );
}
