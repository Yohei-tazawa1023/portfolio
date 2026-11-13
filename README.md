# Yohei | Portfolio

Web制作と業務システム開発のポートフォリオサイトです。HTML / CSS / JavaScript（ビルド不要・外部ライブラリなし）で作っています。

- 公開サイト: https://yohei-tazawa1023.github.io/portfolio/

## 構成

```
portfolio/
├─ index.html          トップ（Hero / Works / Skills / About / Contact と、実績の詳細モーダル）
├─ css/style.css       デザイン（色などは :root の変数で変更できます）
├─ js/main.js          メニュー・スクロール演出・詳細モーダル・画像の切り替え
├─ favicon.svg
└─ images/
   ├─ works/           制作実績の画像（WebP。-w600 は一覧用、-w1200 などは詳細用）
   ├─ svg_icon/        スキルのアイコン
   └─ ogp.jpg          SNS でシェアしたときの画像
```

## ローカルで確認する

VS Code の拡張機能「Live Server」で `index.html` を開くか、フォルダで次を実行してください。

```
php -S 127.0.0.1:8000
```

## 内容を編集するには

- **制作実績を追加・変更**: `index.html` の `Works` セクション（カード）と、同じファイル内の `<dialog class="modal">`（詳細）を編集します。
- **色を変える**: `css/style.css` の先頭の `:root` の `--accent`（アクセント色）などを変更します。
- **お問い合わせ**: クラウドワークスのメッセージへ案内しています（メールアドレスは載せていません）。

## 制作メモ

- 制作実績「案件情報管理サイト」のスクリーンショットは、すべて架空のデータです。
- 開発の一部で AI アシスタントを活用しています（実績の詳細にも記載）。
