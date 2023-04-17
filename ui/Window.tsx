'use client';

import { useEffect, Fragment } from 'react';

async function minSize() {
  let { appWindow, LogicalSize } = await import('@tauri-apps/api/window');
  await appWindow.setMinSize(new LogicalSize(960, 720));
}

export const WindowSize = () => {
  useEffect(() => {
    minSize();
  }, []);

  return <Fragment></Fragment>;
};
