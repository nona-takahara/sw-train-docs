---
layout: "@layouts/Layout.astro"
---
# 日本国有鉄道パラメータ 自動空気ブレーキ再現システム v1.2.0

## 関連情報
- [オリジナル公開ページ（すとーむすきー）](https://stormskey.works/@nona_takahara/pages/1697196032164)
- [English version (on Stormskey - Misskey server for Stromworks fan)](https://stormskey.works/@nona_takahara/pages/1700929239025)
- [Kuribayashiによる実装サンプル（Steam Workshop）](https://steamcommunity.com/sharedfiles/filedetails/?id=3230353379)

### バージョン履歴
- v1.0.0 2023年10月13日
- v1.0.1 2023年10月13日（文章の厳格度を上げ、規定の厳格度をわかりやすくする修正を実施）
- v1.1.0 2023年10月14日（使用できる気体の種類を規定）
- v1.2.0 2025年6月21日（一部パラメータを変更し、簡易規格を設定）

## 規格概要・簡易実装法

atm(abs)は、圧力センサーの値である。

本規格における代表的なブレーキ管圧力は

- (制御側)ユルメ圧力: 5.84 atm(abs)
- (被制御側)ユルメ圧力: 5.64 atm(abs)
- (被制御側)常用最大ブレーキ: 4.48 atm(abs)
- (被制御側)非常ブレーキ: 4.10 atm(abs) 以下

制御側では安定して 5.7～5.9 atm(abs) の圧縮空気を供給する回路を設け、制動時は減圧すればよい。

被制御側の簡易制御方法は、非常ブレーキのとき1とする制御であれば`clamp((5.64-x)/1.54, 0, 1)`、常用最大ブレーキのとき1とする制御であれば`clamp((5.64-x)/1.16, 0, 1.33)`とすればよい。非常ブレーキは1.33になる。

## v1.1→v1.2 更新内容概要

- 非常ブレーキを 3.2 kgf/cm<sup>2</sup> 未満条件のみで制御するよう変更
- 減圧速度の規定を削除もしくは非推奨に変更
- ブレーキ管へのタンクの接続禁止を明文化
- 減圧後、再度ブレーキ管に込めなおした場合のブレーキ挙動が定められていないことを明文化
- 条文の入れ替え及び表現を統一
- 規格概要を掲載し、簡易制御の実装を掲載

## 1. Stormworks単位系と実世界の単位系との換算（定義）
本規格ではStormworksの圧力計が絶対圧を出力するものと考える。
圧力計の出力 1 は 1 atm = 101 325 Pa と定め、使用環境での大気圧は常に 1 atmとしてパラメータを定めた。

実世界の自動空気ブレーキのパラメータ設定は単位 kgf/cm<sup>2</sup> のもとで行われている。
標準重力を用いて 1 kgf/cm<sup>2</sup> = 98 066.5 Pa と定める。

以下ではゲージ圧力であれば(G)、絶対圧であれば(abs)を圧力単位に付加し、圧力差では付加しないことにより区別して表す。

### POINT
以上より、本規格書ではStormworksの圧力計の単位と atm(abs) が等しいことが分かる。

なお、文献によっては kgf/cm<sup>2</sup> を kg/cm<sup>2</sup> と書いてあるものがあるので注意しよう。
kgfはキログラム重と呼び、ニュートンなどと同じ力の単位である。fはForceを意味する。

## 2. 自動空気ブレーキ規格
1. 自動空気ブレーキ配管であることを識別するため、車両間接続用のホースアンカーまたはスモールウインチは赤色で塗装することを原則とする。
1. ブレーキ管にはタンクを直接接続してはならない。パイプのみでブレーキ管圧力を保持する。
1. ユルメ状態のブレーキ管圧力は 5 kgf/cm<sup>2</sup>(G) とする。
1. ブレーキ管に十分に圧縮空気が送り込まれた状態からブレーキ管を減圧するとブレーキ力が増加する。
1. 減圧量 1.4 kgf/cm<sup>2</sup> までは減圧量と常用ブレーキ力がほぼ比例する。1.8 kgf/cm<sup>2</sup> 以上減圧すると非常ブレーキの圧力となる。なお、減圧後にブレーキ管圧力を増加させた場合の挙動や、その後ユルメ圧力付近まで圧力を増加せずに再度減圧した場合の挙動は本規格では定めない。
1. ブレーキ管圧力がユルメ圧力付近のとき不用意にブレーキがかからないようにする目的で減圧量の不感地帯を設けることができる。ただし不感地帯の外でのブレーキ力は（不感地帯の下端基準ではなく）減圧量全体に比例させることを推奨する。<br>（現実のブレーキ弁の一つでは 0.4 kgf/cm<sup>2</sup> 程度の減圧に対して反応しないものがあった。また、実在の簡易な制御方式では 0.2 kgf/cm<sup>2</sup> 程度の減圧には反応しないものがある）
1. 非常ブレーキを指令する場合は 5 秒より十分短い時間の間に、ブレーキ管圧力が 3.2 kgf/cm<sup>2</sup>(G) を確実に下回るように制御する（3 秒程度を推奨する）。
1. 非常ブレーキの作用は、ブレーキ管圧力 3.2 kgf/cm<sup>2</sup>(G) 条件のみによって行うことを推奨する。減圧速度のみによって作用する動作は可能であるが非推奨とする。
1. ブレーキ管内部に送り込むことができる流体は、気体のみとする。送り込む気体は使用環境の温度帯で相変化しないものでなくてはならない。<br>（この規定は、蒸気のように、使用中に気体が液体に戻る（あるいはその逆）挙動を示す気体をを使用してはならないと規定するものです。）
