<?php
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

		
		case 'fullDepartement':
			fullDepartement();
			break;
		case 'fullRole':
			fullRole();
			break;
		case 'inscription':

			$nom=$_POST["nom"];
			$prenom=$_POST["prenom"];
			$login=$_POST["login"];
			$password=$_POST["password"];
			$departement=$_POST["departement"];
			$role=$_POST["role"];

			if(isset($login)&& !empty($login)&& isset($password)&& !empty($password)){

				if(isset($nom)&& !empty($nom)&& isset($prenom)&& !empty($prenom)){

					if(isset($departement)&& !empty($departement)&& isset($role)&& !empty($role)){

				        inscription($nom, $prenom, $login,$password,$departement,$role);
			        }
			    }
			}
			break;
		default:
			# code...
			break;
	}
}



function fullDepartement(){
	$bdd=connect();
	$request=$bdd->query('SELECT * from departement order by Nom ASC');
	$i=0;
	while ($data=$request->fetch()) {
		$depart[0]=$data['id'];
		$depart[1]=$data['Nom'];
		$departs[$i]=$depart;
		$i++;
	}

	echo json_encode($departs);
}
function fullRole(){
	$bdd=connect();
	$request=$bdd->query('Select * from roles order by Nom ASC');
	$i=0;
	while ($data=$request->fetch()) {
		$role[0]=$data['id'];
		$role[1]=$data['Nom'];
		$roles[$i]=$role;
		$i++;
	}

	echo json_encode($roles);
}

function inscription($nom, $prenom, $login,$password,$departement,$role){
	
	$bdd=connect();

    $res=$bdd->prepare('SELECT * from utilisateurs where Log=?');
	$res->execute([$login]);

	if($m=$res->fetch())
      echo json_encode("no");


  	else{

  		$res = $bdd->prepare("INSERT INTO utilisateurs (Nom, Prenom, Log,Password,Role_id,Nb_sujets,Nb_reponses,Nb_connexion,Departement_id)  VALUES (:a,:b,:c, :d,:e,:f,:g,:h,:i)");

  		        $res->execute(array(
  		            'a' => $nom,
  		            'b' => $prenom,
  		            'c' => $login,
  		            'd' => $password,
  		            'e' => $role,
  		            'f' => 0,
  		            'g' => 0,
  		            'h' => 0,
  		            'i' => $departement));
	
	    echo json_encode("yes");
       }
   
}