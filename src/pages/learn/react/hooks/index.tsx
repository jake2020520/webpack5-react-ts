import React from 'react';
import { Button, Card } from 'antd';

import { useForceUpdate } from './hooks';
import styles from './index.less';

const Login: React.FC<any> = () => {
  console.log('-函数更新了-');
  // const [count, forceUpdate] = useState(0);
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const forceUpdate = useForceUpdate();
  const handleClick = () => {
    // forceUpdate(count + 1);
    forceUpdate();
  };
  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}></div>

      <Card title="1、函数里面模拟forceUpdate" bordered={false} style={{ width: 800 }}>
        <Button onClick={handleClick}>函数里面模拟forceUpdate</Button>
      </Card>
    </div>
  );
};

export default Login;
