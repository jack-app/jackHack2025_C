# jackHack2025_C

## インストール手順について
 
1. まずは、リポジトリをクローンします。
```bash
git clone https://github.com/jack-app/jackHack2025_C.git
```
2. 次に、クローンしたディレクトリをVSCodeで開きます。
3. Dockerを起動しておいてください
4. VSCode右下にある>< のアイコンをクリックする。
5. 「Reopen in Container」を選択します。
6. しばらく待つと、コンテナが立ち上がります。
7. 立ち上がったら、ターミナルを開きます。
8. bashを起動して以下のコマンドを実行します。
```bash
 sh setup.sh
```
9. しばらく待つと、必要なライブラリがインストールされます。
10. インストールが完了したら、frontディレクトリに移動と立ち上げを次のコマンドを用いて行います。
```bash
cd front
npm run dev
```
11. 立ち上がったら、backを立ち上げます。
```bash
cd back
python app.py
```