# Repository Guidelines

## プロジェクト構成とモジュール整理
リポジトリの中心は Vite + Vue 3 で構築された `frontend/` ディレクトリです。主要コードは `frontend/src` にあり、機能ごとに `components/`（`WeekGrid.vue` などの UI 部品）、`views/`（ルート単位のページ）、`composables/`（`useAuth.js` などの共有ロジック）へ整理されています。静的アセットや HTML エントリは `public/` と `index.html` に配置します。Cognito 設定の変更は `src/composables/useAuth.js` に限定し、新しい環境変数を導入する際は必ずドキュメント化してください。

## ビルド・テスト・開発コマンド
作業は `frontend/` で行い、依存関係は `npm install` で同期します。`npm run dev` で Vite 開発サーバーを起動し（http://localhost:5173）、`npm run build` で本番ビルドを `dist/` に生成、`npm run preview` で生成物をローカル検証します。品質チェックには `npm run lint` を、修正込みで走らせる場合は `npm run lint:fix` を使い、大きな差分の前には `npm run format` を実行してください。

## コーディングスタイルと命名規約
整形は Prettier（`.prettierrc.cjs`）で統一され、シングルクォート・セミコロンなし・2 スペースインデントが標準です。Vue コンポーネントは PascalCase（例: `EventModal.vue`）、コンポーザブルは camelCase（例: `useWeeks`）、ユーティリティは必要に応じてハイフン区切りのファイル名を用います。スタイルはスコープ付き CSS か Tailwind ユーティリティを優先し、グローバル CSS は最小限に抑えてください。

## テスト方針
現時点で自動テストは未整備です。機能追加時は `frontend/src/__tests__/` 配下に Vitest + Vue Test Utils を使った単体テストを追加するか、ログイン・カレンダー描画・localStorage 永続化の手動検証結果を明記してください。AWS Amplify 連携はモック化し、テストを決定論的に保つよう努めましょう。

## コミットとプルリクエスト指針
コミットメッセージは命令形で、必要に応じて `fix:` や `refactor:` などのプレフィックスを付け、行った振る舞い変更を簡潔に記述します。プルリクエストでは概要、関連 Issue/タスク ID、UI 変更がある場合のスクリーンショットまたは動画、実行済みコマンド（例: `npm run lint`、手動 QA）と設定差分の注意書きを添えてください。

## セキュリティと設定
Cognito のシークレットやユーザープール ID をコミットしないでください。`.env.local` で秘密情報を管理し、`import.meta.env` 経由で参照します。個人情報を含むスクリーンショットはマスクし、検証用の一時クレデンシャルは作業後に必ず失効させてください。
