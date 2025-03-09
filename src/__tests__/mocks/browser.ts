import { http } from 'msw';
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// ブラウザ用のMSWワーカーをセットアップ
export const worker = setupWorker(...handlers); 