import React from 'react';
import ReactDOM from 'react-dom';

import styles from './global.scss';
import TabsLayout from './layouts/TabsLayout/index';

function App() {
  return (
    <div className={styles.container}>
      <TabsLayout />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
