# jackHack2025_C

## WSLのインストール手順

Power Shellを開いて、以下のコマンドを実行してください。

```bash 
wsl --install
```
その後,PCを再起動してください。
Ubuntu の起動をする

## Dockerを入れていない方へ
Dokcerをインストールしてください。

1. [Docker Desktop](https://www.docker.com/ja-jp/)をインストールしてください。
2. インストール後、Docker Desktopを起動してください。



## インストール手順について

1. まずは、リポジトリをクローンします。
```bash
git clone https://github.com/jack-app/jackHack2025_C.git
```
2. 次に、クローンしたディレクトリをVSCodeで開きます。
3. Dockerを起動しておいてください。また devcontainer拡張機能をインストールしてください。
4. VSCode右下にある>< のアイコンをクリックする。
5. 「Reopen in Container」を選択します。
6. しばらく待つと、コンテナが立ち上がります。
7. 立ち上がったら、ターミナルを開きます。
8. bashを起動して以下のコマンドを実行します。
```bash
 source setup.sh
```
9. しばらく待つと、必要なライブラリがインストールされます。
10. インストールが完了したら、frontディレクトリに移動と立ち上げを次のコマンドを用いて行います。
```bash
cd front
npm run dev
```
11. 今回GeminiのAPIを使用するために、APIキーを取得する必要があります。
そこで、https://aistudio.google.com/apikey?hl=ja にアクセスし、APIキーを取得してください。
12. 取得したAPIキーを、backディレクトリ内の.env.localファイルに以下のように記述してください。
```bash
GOOGLE_API_KEY=ここにAPIkeyを入れる
```


## 再起動した時には
VSCodeを一度再起動した時には、
```bash
 source setup_back.sh
```
をターミナルたたいて、インストール手順の8~10を実行してください。