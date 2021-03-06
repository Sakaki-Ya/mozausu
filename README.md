<div align="center">
<img src="https://user-images.githubusercontent.com/48976713/67153943-c07ce800-f32d-11e9-8fdf-7d05609204da.jpg" alt="モザウス" title="モザウス">
</div>

## モザウスとは

画像に掛かったモザイクに加工を施し、モザイクが薄くなったように錯覚させるアプリケーションです。  
[モザウス](https://mozausu.blue)

自分のためにモザウスを制作しました。

## 使用している主なライブラリやツール

- ホスティング（[Vercel](https://vercel.com)）
- [jQuery](https://jquery.com/)
- 画像の処理（[Fabric.js](http://fabricjs.com/)）
- アニメーション（[Anime.js](https://animejs.com/)）
- CSSフレームワーク（[Bulma](https://bulma.io/)）
- SCSSのコンパイルと圧縮（[gulp](https://gulpjs.com/)）

## 使い方

<div align="center">
<img src="https://user-images.githubusercontent.com/48976713/67620957-23e3aa00-f847-11e9-81f9-2be65fe1ea3d.gif" alt="使い方" title="使い方">
</div>

---

### 1. "モザイクをウスクしたい画像を選択してください。"ボタンを押して、画像を選択します。

![1](https://user-images.githubusercontent.com/48976713/67252736-39f01400-f4af-11e9-86e1-5c2f07540ef5.JPG)

### 2. "範囲指定"ボタンを押します。

![2](https://user-images.githubusercontent.com/48976713/67252814-9c491480-f4af-11e9-8217-6fe69de32eef.JPG)

### 3. 画像の上をクリックすると描画されるドットで、モザイクが掛かった部分を囲います。

最後のドットを打つ際にダブルクリック（ダブルタップ）すると、囲った範囲にボカシが掛かります。  
![3](https://user-images.githubusercontent.com/48976713/67253372-4629a080-f4b2-11e9-8f49-2db8d0f20659.JPG)

### 4. ボカシ具合を調節するスライダーが表示されるので、任意のボカシ具合を設定してください。

![5](https://user-images.githubusercontent.com/48976713/67253569-2e065100-f4b3-11e9-812e-76e3a3e6441c.jpg)

## 各種ツールの説明

### 画像選択

![1](https://user-images.githubusercontent.com/48976713/67252736-39f01400-f4af-11e9-86e1-5c2f07540ef5.JPG)  
"モザウス"にアクセスしているデバイスから画像を選択するボタン。

### 範囲指定

![2](https://user-images.githubusercontent.com/48976713/67252814-9c491480-f4af-11e9-8217-6fe69de32eef.JPG)  
モザイクを薄くしたい範囲を指定するツールを起動するボタン。

### 拡大

![kakudai](https://user-images.githubusercontent.com/48976713/67253750-5cd0f700-f4b4-11e9-9625-ee28ded1fef5.JPG)  
読み込んだ画像の表示領域を拡大するボタン。

### 縮小

![usu](https://user-images.githubusercontent.com/48976713/68175238-e2c86400-ffc3-11e9-8a21-475d9d23c3a5.JPG)  
読み込んだ画像の表示領域を縮小するボタン。

### 元画像確認

![hide](https://user-images.githubusercontent.com/48976713/67253986-8a6a7000-f4b5-11e9-9bc4-e38359a752f0.JPG)  
ボカシ加工を非表示するボタン。  
元の画像とボカシ加工後の画像を比較できます。

### リセット

![reset](https://user-images.githubusercontent.com/48976713/67253987-8b030680-f4b5-11e9-9040-49ed6197b0c8.JPG)  
範囲指定や表示領域の拡大率などを初期状態に戻すボタン。

### 保存

![save](https://user-images.githubusercontent.com/48976713/67253988-8b030680-f4b5-11e9-82bc-91b1f6256e1e.JPG)  
ボカシ加工後の画像を保存するボタン。

### 閉じる

![close](https://user-images.githubusercontent.com/48976713/67253989-8b030680-f4b5-11e9-9e18-eda3f492ffbf.JPG)  
画像選択前の状態に戻すボタン。

### ボカシの強さ

![5](https://user-images.githubusercontent.com/48976713/67253569-2e065100-f4b3-11e9-812e-76e3a3e6441c.jpg)  
ボカシ具合を調節するスライダー。
