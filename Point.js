#pragma strict

function Update () {

//オイラー角（「360°を1回転とする数値」で回転を指定する方法）を基準にポイントを回転させています
//eulerAnglesプロパティを使えば「Rotation」の値を取得することができます
//Mathf.Repeat(Time.time,1)処理の開始時間から1秒間までの感覚で処理を繰り返すという意味になります
	transform.eulerAngles.y = Mathf.Repeat(Time.time,1)*360f;
}

//OnTriggerEnterはオブジェクトが衝突した瞬間に呼ばれる関数です
//ここでは敵にスコアが入ることを防いでいます
function OnTriggerEnter(col : Collider){
		if(col.tag == "Player"){
//「Point.js」の変数「point」の値を1増やしています
			Score.point ++;
//スコアが入ったらコインを削除します
//Destroy関数で自分自身を削除しています
			Destroy(gameObject);
		}
}
