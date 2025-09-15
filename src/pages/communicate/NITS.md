---
layout: "@layouts/Layout.astro"
---

# Nona's Integrated Train System (NITS)

NITS（ニッツ）は、Stormworks鉄道向けのデイジーチェーン方式の中で最も情報到達時間差が少なくなるよう設計された、コマンドベース総括制御システムである。動力分散システムの車両への適用を推奨する。

- [ワークショップ版 NITS Line Node マイコン](https://steamcommunity.com/sharedfiles/filedetails/?id=3568542650)
- [ワークショップ版 NITS Simple Bridge マイコン](https://steamcommunity.com/sharedfiles/filedetails/?id=3568542738)
    - [NITS Simple Bridgeマイコンの使用方法](./NITS-Simple-Bridge.html)

NITSの低到達時間差の恩恵を受けるには、「NITS Line Node」マイコンの実装法を利用すること。公開しているマイコンをそのまま使うことが望ましい。

NITSに載せる情報の生成・読み取りについては各自で制作する前提であるが、自分でNITSの0x41-0x47コマンドを実装することが難しい場合は、「NITS Simple Bridge」マイコンが利用可能である。Simple Bridgeでも0x48-0x4fの拡張コマンドが利用可能となる（作者の高原も今後はこのマイコンを基本的に使う予定である）。

## 基本マイコンのインターフェース

### 入力

- B1: Lua動作異常なし
- B2: 前後選択 前
- B3: 前後選択 後
- B4: 非常ブレーキ
- B5: 単行 前後選択成立
- B6: 前後選択 短絡
- N1: 後方へのNITS情報（下表参照）
- N2: 前方へのNITS情報（下表参照）

### 出力

- 自分より前の車両の情報が小さい番号のチャンネル(N1-N15)に並ぶ
- 自分より後の車両の情報が大きい番号のチャンネル(N31-N17)に並ぶ
- 自車情報はN16にある
- コモンライン情報はN32にある。また、Boolean情報もコモンライン情報

## 共通信号（0x41-0x47）割り当て

<div style="width: 100%; overflow: scroll; border: inset; contain: paint; min-height: 50vh; height: 80vh; max-height: 95vh; resize: vertical;">
<table style="position: absolute; top: 0; left: 0;">
	<thead>
		<th>コマンド(HEX)</th>
		<th>31</th>
		<th>30</th>
		<th>29</th>
		<th>28</th>
		<th>27</th>
		<th>26</th>
		<th>25</th>
		<th>24</th>
		<th>23</th>
		<th>22</th>
		<th>21</th>
		<th>20</th>
		<th>19</th>
		<th>18</th>
		<th>17</th>
		<th>16</th>
		<th>15</th>
		<th>14</th>
		<th>13</th>
		<th>12</th>
		<th>11</th>
		<th>10</th>
		<th>9</th>
		<th>8</th>
		<th>7</th>
		<th>6</th>
		<th>5</th>
		<th>4</th>
		<th>3</th>
		<th>2</th>
		<th>1</th>
		<th>0</th>
		<th> </th>
	</thead>
	<tr>
		<td>0x41</td>
		<td>0</td>
		<td>1</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
		<td>1</td>
		<td rowspan=3>非常ブレーキ</td>
		<td rowspan=3>連絡ブザー</td>
		<td rowspan=3>故障</td>
		<td rowspan=3>扉 A側が開扉している</td>
		<td rowspan=3>扉 B側が開扉している</td>
		<td rowspan=2>パンタグラフ 上</td>
		<td rowspan=2>パンタグラフ 下</td>
		<td rowspan=2>エンジン 始</td>
		<td rowspan=2>エンジン 停</td>
		<td rowspan=2>バッテリ 始</td>
		<td rowspan=2>バッテリ 停</td>
		<td>ダイナミックブレーキ（自動）</td>
		<td colspan=2>ダイナミックブレーキ（手動）</td>
		<td>前進</td>
		<td>後退</td>
		<td colspan=3>力行</td>
		<td colspan=5>制動</td>
		<td>共通モード</td>
	</tr>
	<tr>
		<td>0x42</td>
		<td>0</td>
		<td>1</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
		<td>1</td>
		<td>0</td>
		<td><br></td>
		<td>案内表示 起動</td>
		<td>案内表示 停止</td>
		<td>チャイム 起動</td>
		<td>チャイム 停止</td>
		<td>室内灯 起動</td>
		<td>室内灯 停止</td>
		<td>ヒータ 起動</td>
		<td>ヒータ 停止</td>
		<td>扉A 開扉</td>
		<td>扉A 閉扉</td>
		<td>扉B 開扉</td>
		<td>扉B 閉扉</td>
		<td>共通モード</td>
	</tr>
	<tr>
		<td>0x43</td>
		<td>0</td>
		<td>1</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
		<td>1</td>
		<td>1</td>
		<td colspan=10>力行パラメータ（10 bits）</td>
		<td colspan=9>ブレーキ力（kPa単位とし、半分の値を伝送）</td>
		<td>共通モード</td>
	</tr>
	<tr>
		<td>0x44</td>
		<td>0</td>
		<td>1</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
		<td>1</td>
		<td>0</td>
		<td>0</td>
		<td colspan=8>数値記録ID</td>
		<td colspan=16>値</td>
		<td>NS-TPB互換動作用（使用非推奨）</td>
	</tr>
	<tr>
		<td>0x45</td>
		<td>0</td>
		<td>1</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
		<td>1</td>
		<td>0</td>
		<td>1</td>
		<td colspan=24>予約</td>
		<td>予約</td>
	</tr>
	<tr>
		<td>0x46</td>
		<td>0</td>
		<td>1</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
		<td>1</td>
		<td>1</td>
		<td>0</td>
		<td>ウォッチドッグ</td>
		<td><br></td>
		<td><br></td>
		<td><br></td>
		<td><br></td>
		<td><br></td>
		<td><br></td>
		<td><br></td>
		<td><br></td>
		<td>自車がR-BUS制御権相当</td>
		<td>Lua故障伝送線</td>
		<td>前後選択　後線</td>
		<td>前後選択　前線</td>
		<td>非常ブレーキ</td>
		<td>（後方両数オーバー　伝送無し）</td>
		<td colspan=4>（後方両数　伝送無し）</td>
		<td>前方両数オーバー</td>
		<td colspan=4>前方両数</td>
		<td>コモンライン用</td>
	</tr>
	<tr>
		<td>0x47</td>
		<td>0</td>
		<td>1</td>
		<td>0</td>
		<td>0</td>
		<td>0</td>
		<td>1</td>
		<td>1</td>
		<td>1</td>
		<td colspan=8>ユーザ固有ID</td>
		<td colspan=16>ユーザ別選別ID</td>
		<td>選別ID 詳細は別欄</td>
	</tr>
</table>
</div>

### 0x41-0x43 共通の信号（b19-b23）について

以下のアルゴリズムでデータを更新する。

- 車両が存在していて、新たな信号を受け取った場合は、その車両から受け取ったとする信号を更新する
- 車両が存在していて、新たに信号を受け取っていない間は、その車両から受け取ったとする信号は直前に更新したときの値を使う
- 車両が存在しない場合は、受け取った値を消去する

以上のアルゴリズムで得られた値について、存在する全車両分の論理和を取り、編成全体の値として使用する。

### 0x47 について

ペイロードの上位8ビットまたは16ビットを個人に割り当てておりユーザ固有IDと呼ぶ。ユーザ固有IDを除いた残りの下位ビットの利用法は個人に委ねている。掲載のない値は未割当だが、ユーザ固有ID 0と201～255は今後のために予約。

両数が変化した場合とその他必要なトリガによって宣言を行い、宣言から3秒後に固有モードに移行する。宣言後3秒以内に異議申し立てとして0x47000000が届いた場合は移行を阻止する。

デバッグ用の0xD000はテスト作業中は自由に使用して良いが、ワークショップ等で公開する際には使用しないようにする。

#### 8ビット割り当て（0x01 - 0xCF）

- 0x00 (0)
- 0x05 (5)
- 0x07 (7)
- 0x09 (9)
- 0x24 (36)
- 0x72 (114)

#### 16ビット割り当て（0xD000 - 0xFFFF）

- 0xD000 (208-0) デバッグ用途・未申請時に利用


### その他の信号について

- 0x41は、もっとも最近送られてきた値を編成全体の制御情報とする
- 0x41-0x42共通情報及び0x42情報はラッチを使って保持する

---

- 1両に複数の運転室がある車両でも、NITS Line Nodeは1両に1つしか積むことができない
  - NS-TPBからの劣化点の一つである
- A側は「前」を向いて右側、B側は「前」を向いて左側
- 前後選択は、運転操作を行う先頭車両は「前」、もう一方の先頭車両は「後」にする
  - このように設定しないと非常ブレーキが作用する。この仕組みによって編成分離時に全体ブレーキが作用する動作を実現する
  - 単行車が1両で動く場合に困るため、単行車で整備できたと判定される場合は「単行 前後選択成立」を送る
  - 編成の組成作業中や、編成分離状態での非常ブレーキを無効化するためには「前後選択 短絡」を送る
