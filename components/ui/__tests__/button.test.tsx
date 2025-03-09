import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../button';

describe('Buttonコンポーネント', () => {
  it('ボタンがレンダリングされる', () => {
    render(<Button>テストボタン</Button>);
    expect(screen.getByRole('button', { name: /テストボタン/i })).toBeInTheDocument();
  });

  it('クリック時にonClickが呼ばれる', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>テストボタン</Button>);
    fireEvent.click(screen.getByRole('button', { name: /テストボタン/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
}); 