<?php
session_start();
/*------- Fonction de connexion à la base de donnée ----*/
function connect(){
	
	try {
		$bdd= new PDO('mysql:host=localhost;dbname=asktech;charset=utf8','root','');	
	} catch (Exception $e) {
		
		die('Erreur : '. $e->getMessage());
	}
  
  	return $bdd;
}


// on se connecte à notre base de données

/*---- Création d'une route pour quider la requete ajax vers la fonction requise -----------*/

$fonction=$_POST["fonction"];
if(isset($fonction)){
	switch ($fonction) {

		case 'Connexion':
			$login=$_POST["login"];
			$password=$_POST["password"];
			if(isset($login)&& !empty($login) && isset($password)&& !empty($password)){
				Connexion($login,$password);
			}
			break;
		
		default:
			# code...
			break;
	}
}




function Connexion($login,$password){
	$bdd=connect();
	$res=$bdd->prepare('SELECT * from utilisateurs where Log=? and Password=?');
	$res->execute([$login,$password]);

	if($liste_info_utilisateur=$res->fetch()){
		$liste[0]=$liste_info_utilisateur['Nom'];
        $liste[1]=$liste_info_utilisateur['Prenom'];
        
        if($liste_info_utilisateur['Role_id']==1){
        	 $_SESSION['Role']="Employé";
        }else {
        	 $_SESSION['Role']="Cadre";
        }

        $_SESSION['Nom']=$liste[0];
        $_SESSION['Prenom']=$liste[1];

        $_SESSION['Post']=$liste_info_utilisateur["Nb_sujets"];
        $connexion=$liste_info_utilisateur["Nb_connexion"]+1;
        $_SESSION['Nb_connexion']=$connexion;
        $_SESSION['Nb_reponses']=$liste_info_utilisateur["Nb_reponses"];

        $_SESSION['user_id']=$liste_info_utilisateur["id"];
       
       	$res=$bdd->prepare('UPDATE utilisateurs SET Nb_connexion =? WHERE id=?');
       	
       	$res->execute([$connexion,$liste_info_utilisateur["id"]]);

        echo json_encode($liste);

	}else{

			$res1=$bdd->prepare('SELECT * from utilisateurs where Log=? ');
			$res1->execute([$login]);
			$test[0]=true;
        	$test[1]=true;
        	$test[2]=true;
			if($donnes1=$res1->fetch()){
			    $test[0]=false;

			}
			$res2=$bdd->prepare('SELECT * from utilisateurs where Password=? ');
			$res2->execute([$password]);
			
			if($donnes2=$res2->fetch()){
				$test[1]=false;
			}
			$res3=$bdd->prepare('SELECT * from utilisateurs where Log=? and Password=?');
			$res3->execute([$login,$password]);
			if($donnes3=$res3->fetch()){
				$test[2]=false;
			}
		echo json_encode($test);

	}

}

