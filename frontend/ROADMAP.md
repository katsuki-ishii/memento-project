# Memento Roadmap

## 現状と課題（サマリ）

### 認証まわり
- [x] Amplify v6 + Cognito 導入: `frontend/src/composables/useAuth.js`
- [x] サインアップ/確認/サインイン/サインアウトのUI: `LoginView.vue`, `SignupView.vue`, `UserMenu.vue`
- [ ] パスワードリセットは画面のみで処理未実装: `frontend/src/views/RequestPasswordResetView.vue`, `frontend/src/views/ResetPasswordView.vue`
- [ ] `Amplify.configure` が二重呼び出し: `frontend/src/main.js:10`, `frontend/src/composables/useAuth.js:22`
- [ ] CognitoのID等がハードコード（環境変数未使用）

### カレンダー/イベント
- [x] 81年×52週のグリッド＋モーダル入力: `WeekGrid.vue` / `EventModal.vue` / `LifeCalendar.vue`
- [ ] イベント保存はローカルのみ（`localStorage`）: `frontend/src/composables/useEventStorage.js`
- [ ] 1週=1テキストの想定。READMEの想定（`weekNumber#eventId` で複数）と差異あり

### ルーティング/見た目
- [x] 主要ルート/ページ: `frontend/src/router/index.js`
- [ ] ルートガード（認証必須制御）未実装
- [ ] Tailwind設定はあるが、UIは主に素のCSSを使用

---

## READMEとの差分（未実装/要見直し）

### バックエンド（必須）
- DynamoDBテーブル設計（`PK: userId`, `SK: weekNumber#eventId`）
- LambdaのCRUD実装（`POST/GET/PUT/DELETE /events`）
- API Gateway + JWT認可（Cognito User Pools Authorizer）＋ CORS

### フロント（必須）
- パスワードリセット（Cognito `resetPassword` / `confirmResetPassword`）の実装と画面連携
- イベント保存先をAPIに差し替え（認証トークン付与で呼び出し）
- 週あたり複数イベント対応（一覧＋追加/編集/削除）
- 認証ガード（例: 設定やイベント保存操作は要サインイン）
- Amplify設定の一元化と環境変数化（Vite環境変数）

### 運用/品質（推奨）
- 依存の整理（未使用の `oidc-client-ts` の除去、または使途をREADMEに明記）
- ダークモード/タグフィルタなどのロードマップ項目
- 最低限のE2E/統合テスト（イベントCRUDのハッピーパス）

---

## 次にやるべき実装（優先度つき）

### 優先度A（最初の1〜2スプリント）
1) 環境変数化＋設定の一元化
- `frontend/src/composables/useAuth.js:12` の Cognito設定を外出し（例: `frontend/src/config/amplify.js`）
- Viteの環境変数（`.env`）で `VITE_COGNITO_USER_POOL_ID`, `VITE_COGNITO_CLIENT_ID`, `VITE_AWS_REGION`, `VITE_API_BASE_URL` を定義
- `frontend/src/main.js:10` の二重 `Amplify.configure` を削除し一元化

2) パスワードリセットの実装
- `useAuth` に `resetPassword(email)`, `confirmResetPassword(email, code, newPassword)` を追加: `frontend/src/composables/useAuth.js`
- 画面をCognitoのコード方式に合わせる（リンクトークンではなく確認コード）
- `frontend/src/views/RequestPasswordResetView.vue`: ボタンから `resetPassword(email)` を呼ぶ
- `frontend/src/views/ResetPasswordView.vue`: ルートを `/reset-password` に変更し、`email + code + newPassword` を入力して `confirmResetPassword` を呼ぶ

3) バックエンド最小実装（MVP）
- インフラ: DynamoDB（`PK: userId`, `SK: weekNumber#eventId`）、Lambda、API Gateway（Cognito Authorizer）、CORS有効化
- エンドポイント（最小）
  - `POST /events`（週と本文）→ 作成
  - `GET /events?week=421`（週別の一覧）→ 取得
  - 余力があれば `PUT /events/{eventId}`, `DELETE /events/{eventId}`

### 優先度B（Aの直後）
1) フロントをAPI連携へ移行
- 新規Composable `useEventsApi`（例: `frontend/src/composables/useEventsApi.js`）を作成し、`fetch`/`axios` で API Gateway を呼び出し
- Amplify AuthからIDトークン取得し `Authorization: Bearer` を付与
  - 例: `import { fetchAuthSession } from '@aws-amplify/auth'` → `const { tokens } = await fetchAuthSession(); const idToken = tokens?.idToken?.toString();`
- `EventModal.vue` / `WeekGrid.vue` から `useEventStorage` を `useEventsApi` に差し替え（オフライン用にlocalStorageフォールバックは任意）

2) 週あたり複数イベント対応
- `EventModal` を「一覧＋新規追加/編集/削除」UIへリファクタ
- `eventId` をクライアント側で暫定生成（例: `crypto.randomUUID()`）し、DynamoDBのSKに含める前提に合わせる

3) ルートガード
- ルート定義で `meta: { requiresAuth: true }`
- グローバルガードで未ログイン時 `/login` へ（設定ページやイベント書き込み系操作を保護）

### 優先度C（仕上げ/改善）
- タグ/カテゴリの付与とフィルタUI
- ダークモードやUIの磨き込み（Tailwindの活用）
- 依存整理（未使用の `oidc-client-ts` を削除、または使うならREADMEに仕様を追記）
- READMEの「ロードマップ」チェックボックス更新

---

## 作業の具体ポイント（ファイル単位）
- `frontend/src/composables/useAuth.js`
  - 既存の `signUp`/`confirmSignUp`/`signIn`/`signOut` に続けて、`resetPassword` と `confirmResetPassword` を追加
  - 既存の `Amplify.configure` は共通設定ファイルへ移動し、ここでは設定を import のみに
- `frontend/src/main.js`
  - `Amplify.configure` の重複を削除し、共通configを import のみに
- `frontend/src/views/RequestPasswordResetView.vue`
  - TODOを削除し、`useAuth().resetPassword(email)` を呼び出し
- `frontend/src/views/ResetPasswordView.vue`
  - ルートを `/reset-password` に変更し、`email/code/newPassword` を受けて `confirmResetPassword` を実行
- `frontend/src/router/index.js`
  - パス変更（`/reset-password/:token` → `/reset-password`）と `meta.requiresAuth` ＋ グローバルガード追加
- 新規: `frontend/src/composables/useEventsApi.js`
  - `listEvents({ week })`, `createEvent`, `updateEvent`, `deleteEvent` とトークン取得処理
- `frontend/src/components/EventModal.vue`
  - 単一テキストから、複数イベントの「一覧＋編集/削除」UIへ改修（まずは `create/list` だけでもOK）
