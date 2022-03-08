<?php
session_start();
if(isset($_GET['function'])){
	if($_GET['function'] == "getSujets"){
		getSujets();
	}

	else if ($_GET['function'] == "getReponses") {
		if (isset($_GET['id_sujet'])){
			getReponses($_GET['id_sujet']);
		}
	}

	else if ($_GET['function'] == "sendReponse") {
		if (isset($_GET['id_sujet']) && isset($_GET['message']) && isset($_GET['id_user'])){
			sendReponse($_GET['message'], $_GET['id_sujet'], $_GET['id_user']);
		}
	}

	else if ($_GET['function'] == "getStatsGlobales") {
			getStatsGlobales();
		
	}

	else if ($_GET['function'] == "deconnexion") {
			deconnexion();
		
	}

	else if ($_GET['function'] == "insertionSujet") {
		if (isset($_GET['titre']) && isset($_GET['message'])){
			insertionSujet($_GET['titre'], $_GET['message']);
		}

	}

	else if ($_GET['function'] == "getSujets_user") {
		
			getSujets_user();
	}

	else if ($_GET['function'] == "cloturer_sujet") {
		if (isset($_GET['id_sujet'])){
			cloturer_sujet($_GET['id_sujet']);
		}

	}

	else if ($_GET['function'] == "supprimer_sujet") {
		if (isset($_GET['id_sujet'])){
			supprimer_sujet($_GET['id_sujet']);
		}

	}
}


function connect(){

    try {
        $bdd= new PDO('mysql:host=localhost;dbname=asktech;charset=utf8','root','');

    } catch (Exception $e) {

        die('Erreur : '. $e->getMessage());
    }

  return $bdd;


}



function getSujets(){
	$bdd = connect();
	$request = $bdd->query("select id, Titre,  Utilisateur_id, Etat_id, Date, Message, Heure from sujet");

	// EXTRACT DATA FROM ALL OF THE REQUEST
	$tab_list[] = array();
	while($line_req = $request->fetch()){
		$tab_list[] = array(
			'id' => $line_req['id'], 
			'titre' => $line_req['Titre'],
			'etat_id' => $line_req['Etat_id'],
			'message' => $line_req['Message']
			
		);
	}
		echo json_encode($tab_list);
		$request->closeCursor(); // FREE CONNEXION TO 
}

function getReponses($id_sujet){
	$bdd = connect();
	
	$request = $bdd->prepare('SELECT Date, Heure, Message, Utilisateur_id FROM reponses WHERE Sujet_id =:id_sujet');
	$request->execute(array(
		'id_sujet' => $id_sujet
	));
	$j = 0;
	$tab_list[] = null;
	while($line_req = $request->fetch()){
		$tab_list[$j] = array(
			'nom' => $line_req['Utilisateur_id'],
			'prenom' => $line_req['Utilisateur_id'],
			'date' => $line_req['Date'],
			'heure' => $line_req['Heure'],
			'message' => $line_req['Message']

		);
		$j++;
	}

	for ($i=0; $i < count($tab_list); $i++) { 
		$id_user = $tab_list[$i]["nom"];

		$request = $bdd->prepare('SELECT Nom, Prenom FROM utilisateurs WHERE id =:id_user');
		$request->execute(array(
			'id_user' => $id_user
		));

		$line_req = $request->fetch();

		$tab_list[$i]['nom'] = $line_req['Nom'];
		$tab_list[$i]['prenom'] = $line_req['Prenom'];


	}

	
	echo json_encode($tab_list);
	$request->closeCursor(); 
}


function sendReponse($message, $id_sujet, $id_user){
	$bdd = connect();

	// insertion du message dans la bdd
	$request = $bdd->prepare("INSERT INTO reponses (Date, Heure, Message, Sujet_id, Utilisateur_id) VALUES (DATE(NOW()), curtime(), :message, :id_sujet, :id_user)");

		$request->execute(array(
			'message' => $message,
			'id_sujet' => $id_sujet,
			'id_user' => $id_user
		));

	// actualisation du nombre de messages de l'utilisateur

	$request = $bdd->prepare("SELECT Nb_reponses FROM utilisateurs WHERE id = :id_user");
	$request->execute(array(
		'id_user' => $id_user
	));

	$Nb_reponses = $request->fetch();
	$new_Nb_reponses = $Nb_reponses['Nb_reponses'] + 1;

	$request = $bdd->prepare("UPDATE utilisateurs SET Nb_reponses = :new_Nb_reponses WHERE id = :id_user");
	$request->execute(array(
		'new_Nb_reponses' => $new_Nb_reponses,
		'id_user' => $id_user
	));

	// on met à jour la variable de session
	$_SESSION['Nb_reponses'] = $new_Nb_reponses;

		echo json_encode(true);
	$request->closeCursor(); 
}

function getStatsGlobales(){
	$bdd = connect();

	// Requêtes BDD 
	  //Reqête SQL pour récupérer le nombre de connexions
	  $req1=$bdd->prepare('SELECT sum(Nb_connexion) as nb_connexion FROM utilisateurs');
	  $req1->execute();
	  $donnees1=$req1->fetch();

	   //Reqête SQL pour récupérer le nombre de commentaires
	  $req2=$bdd->prepare('SELECT sum(Nb_reponses) as nb_reponses FROM utilisateurs');
	  $req2->execute();
	  $donnees2=$req2->fetch();

	  //Requête pour récuperer le nombre de posts 
	  $req3=$bdd->prepare('SELECT sum(Nb_sujets) as nb_posts FROM utilisateurs');
	  $req3->execute();
	  $donnees3=$req3->fetch();

	  $donnes = array(
			'nb_connexion' => $donnees1['nb_connexion'],
			'nb_reponses' => $donnees2['nb_reponses'],
			'nb_posts' => $donnees3['nb_posts']
			
		);

	  echo json_encode($donnes);
}

function deconnexion(){
	session_destroy();
	
	//header('Location: http://localhost:80/GN2/index.php');
	//echo json_encode(true);
	die();
}

function insertionSujet($titre, $message){
	$bdd = connect();
	$id_user = $_SESSION['user_id'];
	$request = $bdd->prepare("INSERT INTO sujet (Titre, Categorie_id, Utilisateur_id, Message, Etat_id, Date, Heure) VALUES (:titre, 1, :user_id, :message, 1, DATE(NOW()), curtime())");

		$request->execute(array(
			'user_id' => $id_user,
			'titre' => $titre,
			'message' => $message
		));

	// mettre à jour le nombre de posts
	$request = $bdd->prepare("SELECT Nb_sujets FROM utilisateurs WHERE id = :id_user");
	$request->execute(array(
		'id_user' => $id_user
	));

	$donnees=$request->fetch();
	$new_Nb_sujets = $donnees['Nb_sujets'] + 1;



	$request = $bdd->prepare("UPDATE utilisateurs SET Nb_sujets = :new_Nb_sujets WHERE id = :id_user");
	$request->execute(array(
		'new_Nb_sujets' => $new_Nb_sujets,
		'id_user' => $id_user
	));

	// on met à jour la variable de session
	$_SESSION['Post'] = $new_Nb_sujets;


	echo json_encode(true);
}

function getSujets_user(){
    $bdd = connect();
    $id_user = $_SESSION['user_id'];
    $request = $bdd->prepare('SELECT id,Titre, Categorie_id, Etat_id, Date, Heure from sujet WHERE Utilisateur_id =:id_user AND Etat_id=:etat');
    $request->execute(array(
        'id_user' => $id_user,
        'etat' => 1
    ));
    // EXTRACT DATA FROM ALL OF THE REQUEST
    $tab_list[] = array();
    while($line_req = $request->fetch()){
        $tab_list[] = array(
            'id' => $line_req['id'], 
            'titre' => $line_req['Titre'] 
            
        );
    }
        //if(count($tab_list) != 0)
       	echo json_encode($tab_list);
        //else
        //	echo json_encode(false);
        $request->closeCursor(); // FREE CONNEXION TO 
}

function cloturer_sujet($id_sujet){

    $bdd = connect();
    $req = $bdd->prepare('UPDATE sujet SET Etat_id=2 WHERE id =:id_sujet');

$req->execute(array(

      'id_sujet' => $id_sujet

       ));

        echo json_encode(true);
        $req->closeCursor(); // FREE CONNEXION TO 
}

function supprimer_sujet($id_sujet){

    $bdd = connect();
    $req = $bdd->prepare('DELETE FROM sujet WHERE sujet.id =:id_sujet');

$req->execute(array(

      'id_sujet' => $id_sujet

       ));

        echo json_encode(true);
        $req->closeCursor(); // FREE CONNEXION TO 
}