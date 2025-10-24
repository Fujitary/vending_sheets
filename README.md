# Googleスプレッドシート連携 版（画像サイズ & 比率自動）

## できること
- スプレッドシートでメニュー/価格/画像URLを編集 → アプリに自動反映
- 画像の**表示サイズ（幅/高さ）を指定**、**比率は contain/cover** で自動調整
- PWA/オフライン対応

---

## セットアップ手順（Publish to web / gviz方式が簡単）
1. Googleスプレッドシートを作成して、**シート名: `Products`** を用意
2. 1行目に**ヘッダー**を作成：  
   `id, name, price, image_url, image_w, image_h, fit, active, sort`
3. 行を追加して商品を記入（例は下）
4. メニュー: 共有 → **リンクを知っている全員が閲覧可**
5. ファイル → **ウェブに公開** → 「シート: Products」「形式: ウェブページ」
6. 公開後のURLを **`/gviz/tq?tqx=out:json&sheet=Products`** に置き換え（READMEの例を参照）
7. `env.example.js` を `env.js` にリネームして、`SHEET_URL` にそのURLを設定
8. GitHub Pages / Netlify / Vercel で公開

### 例: gviz URL 例
```
https://docs.google.com/spreadsheets/d/＜スプレッドシートID＞/gviz/tq?tqx=out:json&sheet=Products
```

### シートの例（Products）
| id | name | price | image_url | image_w | image_h | fit | active | sort |
|---|---|---:|---|---:|---:|---|---|---:|
| coffee | ホットコーヒー | 120 | https://drive.google.com/uc?export=view&id=XXXX | 120 | 160 | contain | TRUE | 1 |
| tea    | 緑茶           | 100 | https://example.com/tea.png                  | 120 | 160 | cover   | TRUE | 2 |

**fit**: `contain`（余白OKで全体表示） or `cover`（枠いっぱいでトリミング）。  
**image_w, image_h**: 表示上の枠サイズ(px)。画像は比率に合わせて自動調整されます。

---

## 画像の置き場所
- Google Driveを使う場合: ファイルを「リンクを知っている全員が閲覧可」に設定し、  
  URLは `https://drive.google.com/uc?export=view&id=FILE_ID` 形式にすると直リンクになります。
- 他のCDN/画像ホスティングでもOK。CORSに注意してください。

---

## 代替: Apps ScriptでプレーンJSONを返す（必要なら）
`Code.gs` をApps Scriptに貼り、デプロイ → ウェブアプリ → 「全員」に公開。  
`env.js` で `DATA_MODE = 'json'` に切り替えて、発行URLを `SHEET_URL` に指定。

---

## キャッシュ
- Service Workerで `index.html`, `env.js`, 画像プレースホルダーをキャッシュします。
- 更新が反映されない場合は、Shift+リロード か 一度オフラインを解除して再読み込み。

