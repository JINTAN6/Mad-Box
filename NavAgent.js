#pragma strict

//ターゲットの位置を設定するためのTransform型の変数「target」を宣言します
//パラメーター化してあるのでInspectorビューからターゲットを指定できます
public var target : Transform;

//navはNavMeshAgentを使用するための変数です
private var nav : NavMeshAgent;

function Start () {

//Start関数内でスクリプトが設定されたオブジェクトのNavMeshAgentを参照して「nav」に格納しています
	nav = GetComponent(NavMeshAgent);
}

function Update () {

//NavMeshAgent.Destination("目的地”）で移動することができます
//Update関数内に書くことでプレイヤーが移動してもそれに合わせて敵は移動します
	nav.SetDestination(target.position);
}