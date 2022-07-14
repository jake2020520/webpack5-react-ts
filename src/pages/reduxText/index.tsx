import React, { useEffect } from 'react';
import { PageHeader } from 'antd';

import Counter from '../../components/testCase/Counter';
// import AddTodo from "../../components/testCase/AddTodo";

import styles from './index.less';

const Home: React.FC<any> = () => {
  useEffect(() => {
    console.log('useEffect');
    // const getData = async () => {
    //   await getHostListApi({});
    // };
    // getData();
  }, []);

  return (
    <div className={styles.container}>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="redux 使用"
        subTitle="class 使用和 hooks使用"
      />
      {/* <AddTodo /> */}
      <Counter />
    </div>
  );
};

export default Home;
