import { BaseAPIClient } from "./base"
import type { TopicsData } from "@/lib/types/article"

// モックデータ
const mockTopicsData: TopicsData = {
  background_knowledge: [
    {
      title: "予測市場の歴史と実例",
      summary: [
        "2014年にフタキシーの概念を提唱し、予測市場への関心が始まった。",
        "Vitalik自身がAugurやPolymarketといった予測市場を実際に利用し、その体験や成果（例：2020年の選挙での成功）を共有している。",
        "Venezuelaの選挙事例など、実際の市場データが現実の動向をどのように反映しているかが示されている。",
      ],
      related_original_text:
        "One of the Ethereum applications that has always excited me the most are prediction markets. I wrote about futarchy, a model of prediction-based governance conceived by Robin Hanson, in 2014. I was an active user and supporter of Augur back in 2015... And this year, I have been a close supporter and follower of Polymarket. ... But then I was scrolling Polymarket, and I saw this: People were willing to put over a hundred thousand dollars on the line, betting that there is a 23% chance that this election would be the one where Maduro would actually get struck down.",
    },
    {
      title: "予測市場とニュースの両面性",
      summary: [
        "Polymarketは賭けサイトとしても、一般向けのニュースソースとしても機能している。",
        "市場での確率変動とニュース報道を併せて情報収集することで、より正確な判断ができる。",
        "チャートだけ、またはニュースだけに頼らず、両者を組み合わせることの重要性が説かれている。",
      ],
      related_original_text:
        "The two faces of Polymarket: a betting site for the participants, a news site for everyone else... Conclusion: you can be more informed by reading the news and the charts, than by reading either one alone. Let's recap that's going on here. If you are a bettor, then you can deposit to Polymarket, and for you it's a betting site. If you are not a bettor, then you can read the charts, and for you it's a news site.",
    },
  ],
  insight: [
    {
      title: "「情報金融（Info Finance）」の概念",
      summary: [
        "予測市場の枠を超え、金融を使って情報を正確に引き出す新たな仕組みを示している。",
        "マーケットを「正誤が事前に保証された（correct by construction）」設計で作ることにより、情報の質を高める狙いがある。",
        "具体的な例として、条件付き市場や意思決定市場の概念が取り上げられている。",
      ],
      related_original_text:
        "Now, we get to the important part: predicting the election is just the first app. The broader concept is that you can use finance as a way to align incentives in order to provide viewers with valuable information. Now, one natural response is: isn't all finance fundamentally about information? ... Similar to the concept of correct-by-construction in software engineering, info finance is a discipline where you (i) start from a fact that you want to know, and then (ii) deliberately design a market to optimally elicit that information from market participants.",
    },
    {
      title: "AIによる情報金融の活性化",
      summary: [
        "AIの導入により、小規模な市場でも高品質な情報抽出が可能になる。",
        "従来は低ボリュームで効率が低かった市場も、AI参加者の影響で活性化される。",
        "その結果、膨大な数のミニマーケットでも実用性が増し、補助金が最小限で済む可能性がある。",
      ],
      related_original_text:
        "One technology that I expect will turbocharge info finance in the next decade is AI (whether LLMs or some future technology). This is because many of the most interesting applications of info finance are on 'micro' questions: millions of mini-markets for decisions that individually have relatively low consequence. In practice, markets with low volume often do not work effectively... AI changes that equation completely, and means that we could potentially get reasonably high-quality info elicited even on markets with $10 of volume.",
    },
    {
      title: "情報金融の多様な応用分野と将来展望",
      summary: [
        "個人トークン、広告、科学的ピアレビュー、公共財資金調達などへの応用が考えられている。",
        "DAOなどの分散型自律組織における意思決定支援など、社会的な信頼課題の解決にも寄与する可能性がある。",
        "スケーラブルなブロックチェーンとAIの進展が、情報金融の実用化を加速させると期待される。",
      ],
      related_original_text:
        "Other use cases of info finance - Personal tokens - ... Advertising - ... Scientific peer review - ... Public goods funding - ... Conclusions: These ideas have been theorized about for a long time... However, I would argue that the current decade presents a unique opportunity, for several key reasons: Info finance solves trust problems that people actually have. We now have scalable blockchains as the substrate. AIs as participants...",
    },
  ],
}

class TopicsAPI extends BaseAPIClient {
  async getTopics(articleId: string): Promise<TopicsData> {
    // 実際のAPIが実装されるまでは、モックデータを返す
    await new Promise((resolve) => setTimeout(resolve, 50)) // ローディング状態を確認するための遅延
    return mockTopicsData
  }
}

const API_BASE_URL = "https://knowledge-pholio.ngrok.dev"
const topicsAPI = new TopicsAPI(API_BASE_URL)
export default topicsAPI

