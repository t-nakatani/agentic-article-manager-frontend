import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Steps } from "./steps"
import { Section } from "./section"
import { StepGuide } from "./step-guide"

interface IOSTabProps {
  installSteps: Array<{
    title: string;
    description: string;
  }>;
  usageSteps: Array<{
    title: string;
    description: string;
  }>;
}

export function IOSTab({ installSteps, usageSteps }: IOSTabProps) {
  return (
    <div className="space-y-6">
      <Section 
        title="インストール手順" 
        description={
          <div className="space-y-2">
            <div>iPhoneにショートカットをインストールして、Safariから簡単に記事を保存できます。</div>
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
        description="Safariで記事を閲覧中に共有メニューから簡単に保存できます。"
      >
        <StepGuide>
          <Steps steps={usageSteps} />
        </StepGuide>
      </Section>
      
      <Section 
        title="注意事項" 
        description="iOSショートカットを使用する際の注意点です。"
      >
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-1">User IDの設定</h3>
              <p className="text-sm text-muted-foreground">
                初回使用時にUser IDの入力が必要です。WebサイトからプロフィールページでコピーしたIDを入力してください。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">ショートカットの許可</h3>
              <p className="text-sm text-muted-foreground">
                初回実行時に「信頼されていないショートカット」の警告が表示される場合は、設定アプリから「ショートカット」の許可を行ってください。
              </p>
            </div>
          </CardContent>
        </Card>
      </Section>
    </div>
  )
} 