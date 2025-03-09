import Link from "next/link"
import { Steps } from "./steps"
import { Section } from "./section"
import { StepGuide } from "./step-guide"

interface ChromeTabProps {
  installSteps: Array<{
    title: string;
    description: string;
  }>;
  usageSteps: Array<{
    title: string;
    description: string;
  }>;
}

export function ChromeTab({ installSteps, usageSteps }: ChromeTabProps) {
  return (
    <div className="space-y-6">
      <Section 
        title="インストール手順" 
        description={
          <div className="space-y-2">
            <div>Chrome拡張機能をインストールして、すぐに使い始めることができます。</div>
            <div>
              インストール後は
              <Link href="/help#extension" className="text-theme-600 dark:text-theme-400 hover:underline mx-1">
                User IDの設定
              </Link>
              が必要です。
            </div>
          </div>
        }
      >
        <StepGuide>
          <Steps steps={installSteps} />
        </StepGuide>
      </Section>

      <Section 
        title="基本的な使い方" 
        description="シンプルな3ステップで記事を保存できます。"
      >
        <StepGuide>
          <Steps steps={usageSteps} />
        </StepGuide>
      </Section>
    </div>
  )
} 