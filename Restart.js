#pragma strict

function Restart() {

//Application.LoadLevel("シーン名")で指定したシーンを呼び出すことができます
//引数にApplication.loadedLevelを指定すると現在のシーンを再読み込みします
	Application.LoadLevel(Application.loadedLevel);
}