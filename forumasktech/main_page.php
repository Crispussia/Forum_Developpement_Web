<?php
session_start();
try
    {
        // On se connecte à la BDD
    $bdd = new PDO('mysql:host=localhost;port=3306;dbname=asktech', 'root', '');
    }
    catch(Exception $e)
    {   
    // En cas d'erreur, on affiche un message et on arrête tout
        die('Erreur : '.$e->getMessage());
    }
                // Si tout va bien, on peut continuer

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
?>

<!DOCTYPE html>
<html>
<head>
	<title>Principale</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="main_page.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
</head>
<body>

	<div class="bande"> 
		<h1>ARMATIS</h1>
	</div>

	<div class="bigdiv">
		<div class="main_page_left">
			<div class="infos_membres">
				<h2 id="nom_user" value="1"><?php echo $_SESSION['Nom'];?></h2>
				<h2 id="prenom_user"><?php echo $_SESSION['Prenom'];?></h2>
				<h2 id="statut"><?php echo $_SESSION['Role'];?></h2>
			</div>

			<div class="boutons_principaux">
				<input class="retour_sujets" type="button" value="Sujets">
				
				<input class="bouton_creer" type="button" value="Créer un sujet" id="id_bouton_creation">
			

			
				<input class="bouton_cloturer" type="button" value="Clôturer un sujet">
			
				<?php if(isset($_SESSION['user_id'])) 
            			{	
							if($_SESSION['user_id']==1)
							{
								echo '<input class="bouton_supprimer" type="button" value="Supprimer un sujet">';
								echo '<input class="bouton_stats" type="button" value="Statistiques Globales">';
							}
            			}
				?>
			


				<input class="bouton_deconnexion" type="button" value="Déconnexion">
			
			</div>
		</div>

		

		<div class="main_page_center" id="contain_sujets">

			<!--
			<div class="sujet">
				<div>
					<label>Non résolu</label>
				</div>
				<button id="id_sujet" class="bouton_sujet">
					
					<h3 >Titre du sujet 1</h3> 

				</button>
			</div>
			

			<div class="sujet">
				<button class="bouton_sujet">
					<h3>Titre du sujet 1</h3>
				</button>
			</div>

			-->
				<script type="text/javascript">
					$(document).ready(function(){ 
					  $( "body" ).on( "click", ".bouton_stats", function(){   

					  		//Appel de la libraire Google Charts
					  		google.charts.load('current', {'packages':['corechart']});
					  		google.charts.setOnLoadCallback(stats);
					  		
					  		//Fonction pour dessiner le graphe du taux de connexion global
					  		function stats() {

					  		  var data = google.visualization.arrayToDataTable([
					  		    ['Taux de connexion global', 'Valeur'],
					  		    ['Nombre de connexion', <?php echo $donnees1['nb_connexion']?>],
					  		    ['Nombre de commentaires postés', <?php echo $donnees2['nb_reponses']?>],
					  		    ['Nombre de sujets postés', <?php echo $donnees3['nb_posts']?>]

					  		  ]);

					  		 //Options d'affichage du graphe camembert (couleurs, taille...)
					  		  var options = 
					  		  {
					  		    backgroundColor : 'white',
					  		    pieHole : 0.5,
					  		    pieSliceBorderColor : 'white',
					  		    pieSliceTextStyle :{ color : 'black'},
					  		    width : 550,
					  		    height : 400,

					  		   title : 'Statistiques globales',
					  		   
					  		  };
					  		  var chart = new google.visualization.PieChart(document.getElementById('contain_sujets'));

					  		  chart.draw(data, options);

					  		  $input2 = document.createElement("input");
					  		  $input2.setAttribute('class', 'bouton_retour_sujets');
					  		  $input2.setAttribute('type', 'button');
					  		  $input2.setAttribute('value', 'Retour aux sujets');
					  		  $('#contain_sujets').append($input2);
					  		}

					  	});
					});


			    </script>

		</div>

		<div class="main_page_center" style="flex-direction: column-reverse; display: none;">

			<div class="container_text_area" style="flex-direction: row;">
				
				<div>
					<textarea class="text_area" placeholder="Ecrivez votre texte" ></textarea>
				</div>
				<div>
					<input class="bouton_commentaire" type="button" value="Envoyer" id="envoyer">
						
					<input class="bouton_retour_sujets" type="button" value="Retour aux sujets">
				</div>
			</div>

			
		</div>

		<div class="main_page_right">
			<div class="statistiques">
				<h2>Vos Statistiques</h2>
				<div>
					<label ></label> <label id="nb_connexions"><?php echo $_SESSION['Nb_connexion'];?> Connexions</label>	
				</div>

				<div>
					<label ></label> <label id="nb_commentaires"><?php echo  $_SESSION['Nb_reponses'];?> Commentaires</label>	
				</div>

				<div>
					<label ></label> <label id="nb_posts"><?php echo $_SESSION['Post'];?> Posts</label>	
				</div>
			</div>
		</div>
		
	</div>


</body>

	<footer>
		<script type="text/javascript" src="remplir_sujets_brunei.js"></script>
	</footer>
</html>