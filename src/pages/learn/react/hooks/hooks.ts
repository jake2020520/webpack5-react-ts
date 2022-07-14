import React, { useState, useCallback } from "react";

// 模拟forceUpdate
const useForceUpdate = function () {
  const [state, setState] = useState(0);
  const update = useCallback(() => {
    setState((prev) => prev + 1);
  }, []);
  return update;
};

export { useForceUpdate };
