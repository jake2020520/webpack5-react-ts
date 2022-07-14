import { useState, useCallback } from 'react';

// 模拟forceUpdate
const useForceUpdate = function () {
  const [state, setState] = useState(0);
  const update = useCallback(() => {
    console.log('useForceUpdate: ', state);
    setState(prev => prev + 1);
  }, []);
  return update;
};

export { useForceUpdate };
