#pragma strict

//NavMeshAgentをつかうための変数agentを準備します
private var agent : NavMeshAgent;

//移動速度を格納する変数「velocity」を用意します
//この変数を使ってAnimatorのステートを切り替えます
private var velocity : float;

//ユニティーちゃんの位置を表す変数「direction」の宣言です
//Vector3はベクトル情報を扱うためのものです
//「Ｘ、Ｙ、Ｚ」の3方向の情報を基にどの方向へどれだけ動くかを表すために使います
private var direction :Vector3;

//Animator型の変数「anim」を宣言します
private var anim : Animator;

function Start () {
//Start関数はゲームを再生して一番最初に呼び出される関数です
//GetComponentで自分自身に追加されたNavMeshAgentを参照し「agent」に格納しています
	agent = GetComponent(NavMeshAgent);
	
//Start関数で「anim」にスクリプトが設定されたオブジェクトが持つAnimatorを設定しています
//「direction」にはスタート時のプレイヤーの位置を設定しています
//transform.positionはオブジェクトの位置を意味します
    anim = GetComponent(Animator);
	direction = transform.position;
}

//Update関数はゲームプレイ中に繰り返し呼び出される関数です
function Update () {
//プレイヤーの現在位置からスタート位置を引くことでどれだけ動いたかを取得しています
//magnitudeプロパティで移動量を取得できます
//それをTime.deltaTimeで割ることで１秒間当たりの移動量が求められます
	velocity = ((transform.position - direction).magnitude)/Time.deltaTime;
//スタート地点の座標を現在位置に更新しています
	direction = transform.position;
	
//if(Input.GetMouseButtonDown(0))でマウスを左クリックされたらという意味になります
	if(Input.GetMouseButtonDown(0)){
//Main Cameraからマウスクリックした位置へのRayを飛ばしています
//ScreenPointToRayはMain Cameraからマウスポインタのクリックで指定された位置へのRayを飛ばします
//ここではマウスボタンが押された時のカーソルの位置を指定しています
	var screenRay : Ray =
		Camera.main.ScreenPointToRay(Input.mousePosition);
//RaycastHit型の変数「hit」を準備しています
//Rayが接触したかどうかをBool型で判定します
	var hit : RaycastHit;
	
//Physics.RaycastでRayを飛ばします
//Physics.Raycastは第一引数であるscreenRay(=マウスクリックしてRayを飛ばした位置）に対し
//第二引数hit(=RaycastHit)でRayが接触したかどうかをBool型で判定して返します
	if(Physics.Raycast(screenRay,hit)){
//agent.SetDestination(目的地)でNavigation Agentを用いて移動できるようになります
		agent.SetDestination(hit.point);
		}
	}
	
//「velocity」が0以上つまり移動している状態のときに「WALK」にステートが切り替わるようにしています
//SetBoolはBool型のパラメータを設定する関数です　
//ここでは「speed」を「velocity」の状態に合わせて「ture」「false」の切り替えを行っています
	if(velocity > 0){
		anim.SetBool("speed",true);
	}else{
		anim.SetBool("speed",false);
	}
}
//OnTriggerEnter関数はオブジェクトが衝突した際に呼び出されます
//スクリプトが設定されたオブジェクトが他のオブジェクトのColliderに接触した際に処理が実行されます
function OnTriggerEnter(col : Collider){
//「Enemy」のタグ（Tag）を持つオブジェクトに接触した時のみに処理を実行するようにif文を使用しています
	if(col.tag == "Enemy"){
//SetTrigger関数で「damage」パラメータの値を変更します
		anim.SetTrigger("damage");
		}		
}
