#pragma strict

//ゲームオーバーテキスト用の変数です
public var text : Text;
//public var voice : AudioClip;
//private var loseAudio : AudioSource;
//コインの変数です。ゲームオーバー時に画面からコインを消すのに使います
private var points : GameObject[];
//ゲームオーバーのフラグになります・「flag」を「true」にすることでリプレイボタンが出るようにします
private var flag : boolean;

//Start関数でゲームオーバーのテキストを無効化して「flag」を「false」に設定しています
function Start () {
	text.enabled = false;
	flag = false;
	//loseAudio = gameObject.GetComponent(AudioSource);
	//loseAudio.clip = voice;
}

//GameOver関数が実行されるとゲームオーバーのテキストが表示されるようになっています
//またCoinDestroy関数を呼んでコインをすべて削除してボタンを出すために「flag」を「true」にしています
function GameOver () {
	text.enabled = true;
	//loseAudio.PlayOneShot(voice);
	PointDestroy();
	flag = true;
}

//CoinDestroy関数はゲーム上にある「point」タグを持つオブジェクトつまりポイントをすべて参照しています
//その後Destroy(coins[i])ですべてを削除しています
function PointDestroy(){
	points = GameObject.FindGameObjectsWithTag("point");
	for(var i : int = 0 ; i < points.length ; i ++)
	Destroy(points[i]);
}

//OnGUI関数はUnityでUIを表示する際に使用する関数です
//「flag」が「true」の時にGUI.Botton(Rect(100,100,100,100),"Retry")でボタンを表示します
//引数としてボタンの大きさ、位置、キャプションを指定できます
//ボタンがクリックされたらApplication.LoadLevelで現在のシーンを再読み込みし、「flag」を「false」にします
function OnGUI(){
	if(flag == true){
		if(GUI.Button(Rect(100,100,100,100),"Retry")){
			Application.LoadLevel(Application.loadedLevel);
			flag = false;
		}
	}
}