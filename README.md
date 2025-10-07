# Memento - あなたの人生を週単位で

Mementoは、あなたの人生を週単位で可視化するウェブアプリケーションです。Tim Urban氏のブログ *Wait But Why* の記事「Your Life in Weeks」にインスパイアされており、81年の人生を表すために52列（週）×81行（年）のグリッドを提供します。

このアプリケーションの目的は、人生の有限性を思い出させ、ユーザーが時間を最大限に活用することを促すことです。人生の全体像を視覚化することで、過去を振り返り、未来を計画し、現在をより意識的に過ごせるようにします。

---

## ✨ 機能

* **ライフカレンダーの可視化**: あなたの人生を4212週（81年）のグリッドで表示
* **パーソナライズ**: 誕生日を設定して、経過した週とこれからの週を可視化
* **イベントの記録**: 任意の週をクリックして、重要な出来事や目標を記録
* **ユーザー認証**: Cognito を利用したサインアップ/ログイン（確認コードメール付き）
* **データ永続化**: DynamoDB にイベントを保存し、API Gateway＋Lambda を経由して取得・更新・削除
* **レスポンシブデザイン**: デバイスを問わず直感的に操作可能

---

## 🛠️ 技術スタック

* **フロントエンド**: [Vue.js](https://vuejs.org/) (Composition API)
* **ビルドツール**: [Vite](https://vitejs.dev/)
* **ルーティング**: [Vue Router](https://router.vuejs.org/)
* **スタイリング**: [Tailwind CSS](https://tailwindcss.com/) ＋ スコープ付きCSS
* **認証**: Amazon Cognito（AWS SDKで直接利用、Amplifyは学習用のみ）
* **バックエンド**:

  * API Gateway（REST API）
  * Lambda（イベント CRUD 処理）
  * DynamoDB（ユーザーごとのイベントデータを保存）
* **学習用ストレージ**: 一部の情報は localStorage に保存（JWTトークンなど）

---

## 📂 プロジェクト構成

```
src/
  assets/       # グローバルスタイルと静的アセット
  components/   # 再利用可能なVueコンポーネント (例: WeekGrid, EventModal)
  composables/  # 状態管理用のComposition APIフック (例: useAuth, useWeeks)
  router/       # Vue Routerの設定とルート定義
  views/        # ページ単位のコンポーネント (例: LifeCalendar, SettingsView)
```

---

## 使い方

1. **サインアップ / ログイン**

   * メールアドレスとパスワードでサインアップ
   * Cognito から確認コードメールが届くので入力して有効化
   * ログインすると JWT トークンが発行され、localStorage に保存

2. **誕生日を設定**

   * 「設定」ページで生年月日を入力
   * カレンダーがあなた専用にパーソナライズされる

3. **カレンダーを表示**

   * ホーム画面で人生全体のカレンダーを表示
   * 現在がどこか一目でわかる

4. **イベントを記録**

   * 任意の週をクリックしてイベントを追加
   * データは DynamoDB に保存され、API Gateway＋Lambda を経由して取得可能

---

## 🚀 ロードマップ

### フェーズ1: 基盤構築（学習優先）

* [x] 認証フロー（Cognito直叩き、確認コードメール対応）
* [ ] DynamoDB 単一テーブル設計（`userId + weekNumber#eventId`）
* [ ] Lambda で最小 CRUD 実装（`POST /events`, `GET /events`）
* [ ] API Gateway 経由で JWT 認証をチェック

### フェーズ2: フロント統合

* [ ] Vue から Cognito 認証処理を呼び出し
* [ ] JWT を localStorage に保存、API 呼び出し時に利用
* [ ] カレンダーUIからイベント登録・取得を実装

### フェーズ3: 機能拡張

* [ ] イベント編集・削除機能
* [ ] タグやカテゴリーによるフィルタリング
* [ ] UI/UX 改善（検索・並び替え・ダッシュボード）

### フェーズ4: 発展的学習

* [ ] Refresh Token を使ったセッション継続
* [ ] CloudFront + S3 で本番ホスティング
* [ ] 必要に応じて SES を使ったメールカスタマイズ

---
