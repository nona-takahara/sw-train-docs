---
layout: "@layouts/Layout.astro"
---
# 宗弥急行プロジェクト ARC

7桁の値をダイアルに設定すると、関連アドオンが列車の種別・行先を認識し、それに応じた動作を行います。

## ダイアルの設置規則

N-TRACS for Stormworksの車両検知用ペインタブルブロックと組み合わせて使用する。

本文書では、先頭車両の前側（前進中は先頭となるが、退行中は進行方向に対して最後尾）のペインタブルブロックに設定したDisplay Nameを{detector-name}で参照する。

{detector-name}がTRAIN1となる場合、{detector-name}_ARCはTRAIN1_ARCとなる。

ダイアルの名称は`{detector-name}_ARC`とする。

## ダイアルに送信する値の規則

運行する列車の先頭車両の前側の車両検知用ペインタブルブロックに対応するダイアルにのみ以下の値を書き込む。

誤動作の防止のため、それ以外の ペインタブルブロックに対応するダイアル には0を書き込む。

|pp|b|tt|dd|
|:--|:--|:--|:--|
|運行番号（2桁。オプション）|路線/上下線選択（1桁）|種別（2桁）|行先（2桁）|

### 路線/上下線 選択

|b|路線/上下線|
|:--|:--|
|1|宗弥急行線・中宗電鉄線 上り（北港・掘戸町方面）|
|2|宗弥急行線・中宗電鉄線 下り（潮凪浜・入守山方面）|

### 種別
アドオンは上位の桁のみを制御判別に使用する。下位の値は個人の必要に応じて使用してよい。
|tt|種別|備考|
|:--|:--|:--|
|0X|(無指定)|01-03は以下に掲載する参考設定を踏襲することを推奨する|
|01|試運転|参考|
|02|臨時|参考|
|03|回送|参考|
|1X|各停（各駅停車）||
|3X|準急|予約|
|5X|急行||
|7X|特急||

### 行先
上位の桁が駅コード、下位の桁は到着番線等の指定に用いる。下位の桁については今後仕様が確定次第掲載する。
|dd|行先|備考|
|:--|:--|:--|
|0X|(無指定)|進路が1つに定まる場合を除いてARCは動作しない|
|1X|(予約)||
|2X|掘戸町||
|3X|北港|下位の値について、0は到着ホーム自動選択。1-4は指定の番線に到着する|
|4X|高見が丘||
|5X|潮凪浜||
|6X|南江町||
|7X|入守山||
