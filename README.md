# Memento - あなたの人生を週単位で

Mementoは、あなたの人生を週単位で可視化するウェブアプリケーションです。Tim Urban氏のブログ*Wait But Why*の記事「Your Life in Weeks」にインスパイアされたこのアプリケーションは、81年の人生を表すために52の列（週）と81の行（年）のグリッドを提供します。

このアプリケーションの目的は、人生の有限性を思い出させ、ユーザーが時間を最大限に活用することを奨励することです。あなたの人生がレイアウトされているのを見ることで、過去を振り返り、未来を計画し、現在の瞬間を大切にすることができます。

## ✨ 機能

- **ライフカレンダーの可視化**: あなたの人生を4212週（81年）のグリッドで表示します。
- **パーソナライズ**:誕生日を設定して、どの週が過ぎ去り、どの週がこれから来るのかを確認できます。
- **イベントの記録**:任意の週をクリックして、重要なイベント、思い出、または目標を記録します。
- **ユーザー認証**:個人のカレンダーに安全にサインアップしてログインします（AWS Cognitoを利用）。
- **レスポンシブデザイン**:さまざまなデバイスで動作する、クリーンで直感的なインターフェース。

## 🛠️ 技術スタック

- **フロントエンド**: [Vue.js](https://vuejs.org/) (Composition API使用)
- **ビルドツール**: [Vite](https://vitejs.dev/)
- **ルーティング**: [Vue Router](https://router.vuejs.org/)
- **スタイリング**: [Tailwind CSS](https://tailwindcss.com/) & スコープ付きCSS
- **認証**: [AWS Amplify](https://aws.amazon.com/amplify/) と Amazon Cognito
- **ローカルストレージ**:誕生日とイベントデータの保存にブラウザの`localStorage`を使用します。

## 🚀はじめに

### 前提条件

- [Node.js](https://nodejs.org/) (v18以降を推奨)
- [npm](https://www.npmjs.com/)

### インストール

1.  リポジトリをクローンします:
    ```bash
    git clone <repository-url>
    cd memento-project
    ```

2.  依存関係をインストールします:
    ```bash
    npm install
    ```

### 設定

このアプリケーションは、ユーザー認証にAWS Cognitoを使用します。独自のCognitoユーザープールを設定し、`src/composables/useAuth.js`の値を更新する必要があります。

```javascript
// src/composables/useAuth.js

// TODO: 環境変数を使用してこれらの値を安全に管理してください。
const cognitoConfig = {
  Auth: {
    region: 'YOUR_AWS_REGION', // 例: 'us-east-1'
    userPoolId: 'YOUR_USER_POOL_ID', // 例: 'us-east-1_xxxxxxxxx'
    userPoolWebClientId: 'YOUR_USER_POOL_WEB_CLIENT_ID', // 例: 'xxxxxxxxxxxxxxxxxxxxxx'
  }
};
```

### アプリケーションの実行

- **開発サーバー**:
  ```bash
  npm run dev
  ```
  アプリケーションは `http://localhost:5173` で利用可能になります。

- **本番ビルド**:
  ```bash
  npm run build
  ```
  このコマンドは、本番用のファイルを含む`dist`ディレクトリを作成します。

## 📂 プロジェクト構成

`src`ディレクトリには、アプリケーションの中核が含まれています:

-   `assets/`: グローバルなスタイルと静的アセット。
-   `components/`: 再利用可能なVueコンポーネント (例: `WeekGrid`, `EventModal`)。
-   `composables/`: 状態とロジックを管理するためのコンポジション関数 (例: `useAuth`, `useWeeks`)。
-   `router/`: Vue Routerの設定とルート定義。
-   `views/`: さまざまなルートに対応するページレベルのコンポーネント (例: `LifeCalendar`, `SettingsView`)。

## 使い方

1.  **サインアップ / ログイン**: アカウントを作成するか、ログインします。
2.  **誕生日を設定**: 「設定」ページに移動し、生年月日を入力します。
3.  **カレンダーを表示**: ホームページに戻り、パーソナライズされたライフカレンダーを表示します。
4.  **イベントを記録**:任意の週のセルをクリックして、その週のメモや思い出を追加します。
