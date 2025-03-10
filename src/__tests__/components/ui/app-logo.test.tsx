import { render, screen } from '@testing-library/react';
import { AppLogo } from '@/components/ui/app-logo';

describe('AppLogo', () => {
  it('ロゴが正しくレンダリングされる', () => {
    render(<AppLogo />);
    // SVGアイコンとテキストを検証
    const logoText = screen.getByText('Soi');
    expect(logoText).toBeInTheDocument();
    
    const subText = screen.getByText('Agentによるwebページ管理');
    expect(subText).toBeInTheDocument();
  });
}); 