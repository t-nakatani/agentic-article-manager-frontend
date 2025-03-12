import { Layout } from "@/components/layout/Layout"
import { generateSeoMetadata } from "@/lib/metadata"

export const metadata = generateSeoMetadata({
  title: "プライバシーポリシー",
  description: "当サイトのプライバシーポリシーについて説明します",
  image: "https://soi-v0.vercel.app/privacy-policy-og-image.png"
})

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div className="container max-w-4xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">プライバシーポリシー</h1>
          <p className="text-muted-foreground mt-2">
            当サイトにおける個人情報の取り扱いについて説明します。
          </p>
        </div>

        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. 収集する情報</h2>
            <p>
              当サービスでは、以下の情報を収集することがあります：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>アカウント情報（名前、メールアドレス、プロフィール画像）</li>
              <li>利用状況データ（アクセス履歴、機能の使用状況）</li>
              <li>保存された記事のURL及びその内容</li>
              <li>デバイス情報（ブラウザの種類、IPアドレス）</li>
            </ul>
          </section>
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">2. 情報の利用目的</h2>
            <p>
              収集した情報は以下の目的で利用します：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>サービスの提供・維持・改善</li>
              <li>ユーザー認証とアカウント管理</li>
              <li>カスタマーサポートの提供</li>
              <li>新機能や更新情報のお知らせ</li>
            </ul>
          </section>
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">3. 情報の共有</h2>
            <p>
              当サービスでは、以下の場合を除き、お客様の個人情報を第三者と共有することはありません：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>お客様の同意がある場合</li>
              <li>法律の要請がある場合</li>
              <li>サービスの提供に必要なパートナー企業（情報は必要最小限に制限されます）</li>
            </ul>
          </section>
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">4. データの保護</h2>
            <p>
              当サービスは、お客様の個人情報を不正アクセス、改ざん、漏洩から保護するために適切なセキュリティ対策を講じています。ただし、インターネット上での通信において完全な安全性を保証することはできません。
            </p>
          </section>
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">5. Cookieの使用</h2>
            <p>
              当サービスでは、ユーザー体験の向上やサービスの改善のためにCookieを使用しています。ブラウザの設定でCookieを無効にすることも可能ですが、一部の機能が正常に動作しなくなる可能性があります。
            </p>
          </section>
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">6. お問い合わせ</h2>
            <p>
              プライバシーポリシーに関するご質問やお問い合わせは、サイト内のフィードバックフォームからご連絡ください。
            </p>
          </section>
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold">7. プライバシーポリシーの変更</h2>
            <p>
              当サービスは、必要に応じてプライバシーポリシーを変更することがあります。変更があった場合は、サイト上でお知らせします。
            </p>
            <p className="text-sm text-muted-foreground">
              最終更新日：2024年3月15日
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
} 