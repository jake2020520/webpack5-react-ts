import React from 'react';
import { Card } from 'antd';

import styles from './index.less';

const Login: React.FC<any> = () => {
  console.log('-函数更新了-');

  return (
    <div className={styles.container}>
      <Card title="1、constructor为啥要调用super" bordered={false} style={{ width: 800 }}>
        <div>1、用了super 方法，才能 this.props和this.context 才能取到值</div>
        <div>2、super只能在派生类构造函数和静态方法中使用，不能在调用super之前引用this</div>
        <div>3、如果没有定义类构造函数，在实例化派生类时，会调用super,而且会传入所有给派生类的参数</div>
      </Card>
    </div>
  );
};

export default Login;
