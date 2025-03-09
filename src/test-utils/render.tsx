import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../lib/redux/store';

// テスト用のストアを作成する関数
export function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

// Reduxプロバイダーを含むカスタムレンダラー
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: any;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  const store = createTestStore(preloadedState);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
} 