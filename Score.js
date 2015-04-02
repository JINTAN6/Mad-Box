#pragma strict

//UI要素を操作するためのUIライブラリを使えるようにします
//uGUIを操作するためにはこの一文が必要になります
import UnityEngine.UI;

//「point」はint型の変数でスコアの値を表します
//static変数にすることで外部スクリプトからでもアクセスできるようにしています
public static var point : int;

//ボタン用の変数を宣言します
public var button : GameObject;

//スコアのテキスト用の変数です
//スコアに表示される文字列が格納されます
private var text : Text;

//敵を判定するための変数です
//配列化してあるのはステージ内に複数の敵を配置する場合に対応するため
private var enemies : GameObject[];

//メインカメラ、ゲームクリア用カメラ、ゲームクリア用テキストを指定するための変数です
public var mainCamera : Camera;
public var playerCamCamera : Camera;
public var clearText : Text;

function Start () {

//ボタンを無効にしますSetActiveはオブジェクトの有効・無効を切り替えるための関数です
	button.SetActive(false);

//Start関数内でメインカメラを有効にし、ゲームクリアー用カメラを無効にしています
	mainCamera.enabled = true;
	playerCamCamera.enabled = false;
	
//Start関数内で「point」を0で初期化しています
	point = 0;
//スクリプトが設定されたオブジェクトの「Text」コンポーネントを参照しています
	text = GetComponent(Text);
	
//ゲームクリア用テキストを無効にしています
	clearText.enabled = false;
}

function Update () {

//スコアのテキストを更新します
//「SCORE:」の文字にポイントの値を加えたものになります
	text.text = "SCORE: " + point;
	
//「point」が50以上になった場合にEnemyDestroy関数を実行してすべての敵を消すようにします
//そしてカメラを切り替えるためにメインカメラを無効化しゲームクリアー用カメラを有効化しています
//さらにゲームクリア用テキストを出すために「ClearText」を有効化します
	if(point >= 50){
		EnemyDestroy();
//ボタンを有効にします
		button.SetActive(true);
		mainCamera.enabled = false;
		playerCamCamera.enabled = true;
		clearText.enabled = true;
		}
}

//EnemyDestroy関数はゲーム上にあるタグが「Enemy」に設定されたオブジェクトをすべて参照しています
//その後Destroy(enemies[i])で全て削除しています
function EnemyDestroy(){
	enemies = GameObject.FindGameObjectsWithTag("Enemy");
	for(var i : int = 0 ; i < enemies.length ; i ++)
	Destroy(enemies[i]);
}