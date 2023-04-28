'use client';

import { useEffect, Fragment } from 'react';

async function minSize() {
  const { appWindow, LogicalSize } = await import('@tauri-apps/api/window');
  await appWindow.setMinSize(new LogicalSize(960, 720));
}

export default function WindowSize() {
  useEffect(() => {
    minSize();
  }, []);

  return <Fragment></Fragment>;
}
