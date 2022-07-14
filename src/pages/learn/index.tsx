import React from 'react';
import { Tabs } from 'antd';
import HooksLearn from './react/hooks';
import ClassLei from './react/classLei';

import styles from './index.less';

const { TabPane } = Tabs;

const Login: React.FC<any> = () => {
  const tabTops = [
    {
      key: 1,
      title: 'react'
    },
    {
      key: 2,
      title: 'hooks2'
    }
  ];
  const tabLefts = [
    {
      key: 1,
      title: 'hooks学习'
    },
    {
      key: 2,
      title: '类相关学习'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.containerTitle}>前端面试</div>
      <Tabs defaultActiveKey="1" tabPosition={'top'} style={{ height: 800 }}>
        {tabTops.map(item => (
          <TabPane tab={item.title} key={item.key}>
            {item.key === 1 && (
              <Tabs defaultActiveKey="2" tabPosition={'left'} style={{ height: 800 }}>
                {tabLefts.map(subItem => (
                  <TabPane tab={subItem.title} key={subItem.key}>
                    {subItem.key === 1 && <HooksLearn />}
                    {subItem.key === 2 && <ClassLei />}
                  </TabPane>
                ))}
              </Tabs>
            )}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default Login;
