'use client';

import { useEffect, Fragment } from 'react';

export const WindowSize = () => {
  async function minSize() {
    let { appWindow, LogicalSize } = await import('@tauri-apps/api/window');
    await appWindow.setMinSize(new LogicalSize(960, 720));
  }

  useEffect(() => {
    minSize();
  }, []);

  return <Fragment></Fragment>;
};
