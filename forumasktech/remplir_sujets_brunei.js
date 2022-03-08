$(document).ready(function(){
	 
  	var contain_sujets = $( "#contain_sujets" );
  	//console.log("1");
  	$.ajax({
  		url: 'remplir_sujets_brunei.php', 
  		datatype: 'json',
  		type: 'GET',
  		data: {"function" : "getSujets"}, // $_GET['function'] == "getLists";
  		success: function(response, status){
        console.log(response);
  			var obj = JSON.parse(response);
  			
  			var len = obj.length;
       
        $("#contain_sujets").children().remove();
        
        $("#contain_sujets").css('flex-direction', 'column');
        console.log("OBJ " + obj);
  			for (var i = 0; i < len; i++) {
          //console.log("i : " + response[0]);
  				var id = obj[i].id;
  				var titre = obj[i].titre;
          var message = obj[i].message;

          if(obj[i].titre == undefined){
            // on fait un retour au sujet
            if(len == 1){
              contain_sujets.append("<h2>Pas de sujets</h2>");
              $input2 = document.createElement("input");
              $input2.setAttribute('class', 'bouton_retour_sujets');
              $input2.setAttribute('type', 'button');
              $input2.setAttribute('value', 'Retour aux sujets');

              $("#contain_sujets").append($input2);
            }
           continue;
          }
          else
            var titre = obj[i].titre;

          if(obj[i].etat_id == 2){
            var etat_id = "(Clôturé)";
          }
          else if(obj[i].etat_id == 1)
            var etat_id = "(En cours)";
          
          $div = document.createElement("div");
          $button = document.createElement("button");
          $h3 = document.createElement("h3");
          $div.setAttribute('class', 'sujet');
          $button.setAttribute('id', id);
          $button.setAttribute('class', 'bouton_sujet');
         
          $h3.innerHTML = titre + " " + etat_id;
          
          $button.append($h3);

          $p = document.createElement('p');
          $p.innerHTML = message;
          $button.append($p);



          $div.append($button);
          contain_sujets.append($div);
          //console.log("div : " + $div);
          //  $option.innerHTML = name;
          //  $('#lists').append;

          // supprimer le contenu de la div contain_sujets
          
  				//$('#contain_sujets').append("<div class a> "+name+"</option> ");

  				// creation of the element that we want insert 
  				//$option = document.createElement("option");
  				//	$option.innerHTML = name;
  				//	$('#lists').append;

  				//console.log(obj);
  			}

  		},
  		error: function(answer, status){
  			console.log("Impossible d'exécuter la requête ajax");
  		}
  	});
		
});

$(document).ready(function(){ 
  $( "body" ).on( "click", ".bouton_sujet", function(){
      $("#contain_sujets").children().remove();
      //console.log(this);
      var id_sujet = this.id;
      
      // insertion de la zone de text et des boutons
      $("#contain_sujets").css('flex-direction', 'column-reverse');

      $div_cont_area = document.createElement("div");
      $div_cont_area.setAttribute('class', 'container_text_area');
      $div_cont_area.setAttribute('id', id_sujet); // pour pouvoir 
      // récupérer l'id du sujet lors de l'envoi du message

      console.log("id_sujet : " + id_sujet);

      $div1 = document.createElement("div");
      $textarea = document.createElement("textarea");
      $textarea.setAttribute('class', 'text_area');
      $textarea.setAttribute('placeholder', 'Ecrivez votre texte');

      $div1.append($textarea);
      $div_cont_area.append($div1);

      $div2 = document.createElement("div");
      $input1 = document.createElement("input");
      $input1.setAttribute('class', 'bouton_commentaire');
      $input1.setAttribute('type', 'button');
      $input1.setAttribute('value', 'Envoyer');
      $input1.setAttribute('id', 'envoyer');


      $div2.append($input1);
      $input2 = document.createElement("input");
      $input2.setAttribute('class', 'bouton_retour_sujets');
      $input2.setAttribute('type', 'button');
      $input2.setAttribute('value', 'Retour aux sujets');
      $input2.setAttribute('id', 'retour_aux_sujets');

      $div2.append($input2);

      $div_cont_area.append($div2);

      $("#contain_sujets").append($div_cont_area);


      /* debut procédure container des messages (pour appel ajax)

      $div_cont_messages = document.createElement("div");
      $div_cont_messages.setAttribute('class', "container_messages");

      $div = document.createElement('div');
      $b = document.createElement('b');
      $p = document.createElement('p');

      $b.innerHTML = "Nom Prénom :";
      $p.innerHTML = "sdhdbsbsbcjkdn";

      $div.append($b);
      $div.append($p);

      $div_cont_messages.append($div);

      $("#contain_sujets").append($div_cont_messages);
      
      fin procédure */ 

      
      
      $.ajax({
        url: 'remplir_sujets_brunei.php', 
        datatype: 'json',
        type: 'GET',
        data: {"function" : "getReponses", "id_sujet": id_sujet}, // $_GET['function'] == "getLists";
        success: function(answer, status){
            var obj = JSON.parse(answer);
            
            var len = obj.length;

            console.log(obj);
            for (var i = 0; i < len; i++) {
              if(obj[i]['nom'] != null){
                var nom = obj[i].nom;
                var prenom = obj[i].prenom;
                var date = obj[i].date;
                var heure = obj[i].heure;
                var message = obj[i].message;

                $div_cont_messages = document.createElement("div");
                $div_cont_messages.setAttribute('class', "container_messages");

                $div = document.createElement('div');
                $b = document.createElement('b');
                $p = document.createElement('p');

                $b.innerHTML = nom + " " + prenom + " (le " + date + " à " + heure + ")";
                $p.innerHTML = message;

                $div.append($b);
                $div.append($p);

                $div_cont_messages.append($div);

                $("#contain_sujets").append($div_cont_messages);

              }
              else
                break;
            }

        },
        error: function(answer, status){
          console.log("Impossible d'exécuter la requête ajax");
        }
      });
      
  });
});


$(document).ready(function(){ 
  $( "body" ).on( "click", ".bouton_retour_sujets", function(){

    var contain_sujets = $( "#contain_sujets" );
    //console.log("1");
    $.ajax({
      url: 'remplir_sujets_brunei.php', 
      datatype: 'json',
      type: 'GET',
      data: {"function" : "getSujets"}, // $_GET['function'] == "getLists";
      success: function(response, status){
        console.log(response);
        var obj = JSON.parse(response);
        
        var len = obj.length;
       
        $("#contain_sujets").children().remove();
        
        $("#contain_sujets").css('flex-direction', 'column');
        console.log("OBJ " + obj);
        for (var i = 0; i < len; i++) {
          //console.log("i : " + response[0]);
          var id = obj[i].id;
          var titre = obj[i].titre;
          var message = obj[i].message;

          if(obj[i].titre == undefined){
            // on fait un retour au sujet
            if(len == 1){
              contain_sujets.append("<h2>Pas de sujets</h2>");
              $input2 = document.createElement("input");
              $input2.setAttribute('class', 'bouton_retour_sujets');
              $input2.setAttribute('type', 'button');
              $input2.setAttribute('value', 'Retour aux sujets');

              $("#contain_sujets").append($input2);
            }
           continue;
          }
          else
            var titre = obj[i].titre;

          if(obj[i].etat_id == 2){
              var etat_id = "(Clôturé)";
            }
            else if(obj[i].etat_id == 1)
              var etat_id = "(En cours)";

          $div = document.createElement("div");
          $button = document.createElement("button");
          $h3 = document.createElement("h3");
          $div.setAttribute('class', 'sujet');
          $button.setAttribute('id', id);
          $button.setAttribute('class', 'bouton_sujet');
         
           $h3.innerHTML = titre + " " + etat_id;

          
          $button.append($h3);

          $p = document.createElement('p');
          $p.innerHTML = message;
          $button.append($p);

          $div.append($button);
          contain_sujets.append($div);
          //console.log("div : " + $div);
          //  $option.innerHTML = name;
          //  $('#lists').append;

          // supprimer le contenu de la div contain_sujets
          
          //$('#contain_sujets').append("<div class a> "+name+"</option> ");

          // creation of the element that we want insert 
          //$option = document.createElement("option");
          //  $option.innerHTML = name;
          //  $('#lists').append;

          //console.log(obj);
        }

      },
      error: function(answer, status){
        console.log("Impossible d'exécuter la requête ajax");
      }
    });
  });
});


$(document).ready(function(){ 
  $( "body" ).on( "click", "#envoyer", function(){  

      var id_user = $("#nom_user")[0].getAttribute('value');
      console.log(id_sujet);
      
      var message = $(".text_area")[0].value;
      console.log(message);
      
      var id_sujet = $(".container_text_area")[0].getAttribute('id');
      console.log(id_sujet);
      
      console.log("id_sujet2 " + id_sujet);
      if(message != ""){
        
          $(".text_area")[0].value = "";
          
          $.ajax({
            url: 'remplir_sujets_brunei.php', 
            datatype: 'json',
            type: 'GET',
            data: {"function" : "sendReponse", "message": message, "id_sujet": id_sujet, "id_user": id_user}, // $_GET['function'] == "getLists";
            success: function(answer, status){
              if(answer){
                // ajouter le nouveu message
                $("#contain_sujets").children().remove();
                //console.log(this);
                //var id_sujet = this.id;
                
                // insertion de la zone de text et des boutons
                $("#contain_sujets").css('flex-direction', 'column-reverse');

                $div_cont_area = document.createElement("div");
                $div_cont_area.setAttribute('class', 'container_text_area');
                $div_cont_area.setAttribute('id', id_sujet); // pour pouvoir 
                // récupérer l'id du sujet lors de l'envoi du message

                $div1 = document.createElement("div");
                $textarea = document.createElement("textarea");
                $textarea.setAttribute('class', 'text_area');
                $textarea.setAttribute('placeholder', 'Ecrivez votre texte');

                $div1.append($textarea);
                $div_cont_area.append($div1);

                $div2 = document.createElement("div");
                $input1 = document.createElement("input");
                $input1.setAttribute('class', 'bouton_commentaire');
                $input1.setAttribute('type', 'button');
                $input1.setAttribute('value', 'Envoyer');
                $input1.setAttribute('id', 'envoyer');


                $div2.append($input1);
                $input2 = document.createElement("input");
                $input2.setAttribute('class', 'bouton_retour_sujets');
                $input2.setAttribute('type', 'button');
                $input2.setAttribute('value', 'Retour aux sujets');
                

                $div2.append($input2);

                $div_cont_area.append($div2);

                $("#contain_sujets").append($div_cont_area);


                $.ajax({
                  url: 'remplir_sujets_brunei.php', 
                  datatype: 'json',
                  type: 'GET',
                  data: {"function" : "getReponses", "id_sujet": id_sujet}, // $_GET['function'] == "getLists";
                  success: function(answer, status){
                      var obj = JSON.parse(answer);
                      
                      var len = obj.length;

                      console.log(obj);
                      for (var i = 0; i < len; i++) {
                        if(obj[i]['nom'] != null){
                          var nom = obj[i].nom;
                          var prenom = obj[i].prenom;
                          var date = obj[i].date;
                          var heure = obj[i].heure;
                          var message = obj[i].message;

                          $div_cont_messages = document.createElement("div");
                          $div_cont_messages.setAttribute('class', "container_messages");

                          $div = document.createElement('div');
                          $b = document.createElement('b');
                          $p = document.createElement('p');

                          $b.innerHTML = nom + " " + prenom + " (le " + date + " à " + heure + ")";
                          $p.innerHTML = message;

                          $div.append($b);
                          $div.append($p);

                          $div_cont_messages.append($div);

                          $("#contain_sujets").append($div_cont_messages);

                        }
                        else
                          break;
                      }

                  },
                  error: function(answer, status){
                    console.log("Impossible d'exécuter la requête ajax");
                  }
                });

                // fin
              }
          },
            error: function(answer, status){
              console.log("Impossible d'exécuter la requête ajax");
            }
          });

        
      }
      else{
        alert("Entrez un message");
      }
      
  });
});


$(document).ready(function(){ 
  $( "body" ).on( "click", ".bouton_deconnexion", function(){   

      $.ajax({
        url: 'remplir_sujets_brunei.php', 
        type: 'GET',
        data: {"function" : "deconnexion"}, // $_GET['function'] == "getLists";
        success: function(answer, status){
          //if(answer){
            //console.log("ans " + answer );
            document.location.href="index.html";
          //}
        },
        error: function(answer, status){
          console.log("Impossible d'exécuter la requête ajax");
        }
      });

  });
});



$(document).ready(function(){ 
  $( "body" ).on( "click", ".bouton_creer", function(){   

      $("#contain_sujets").children().remove();

      console.log("dddd");
      $("#contain_sujets").append("<h3>Titre</h3> <input type=\"text\" id=\"input_creation_titre\">");
      $("#contain_sujets").append("<h3 >Message</h3> <input type=\"text\" id=\"input_creation_message\">");
      $("#contain_sujets").append("<input type=\"button\" value=\"Créer le sujet\" id=\"bouton_envoyer_sujet\" >");


      $input2 = document.createElement("input");
      $input2.setAttribute('class', 'bouton_retour_sujets');
      $input2.setAttribute('type', 'button');
      $input2.setAttribute('value', 'Retour aux sujets');

      $("#contain_sujets").append($input2);
  });
});


$(document).ready(function(){ 
  $( "body" ).on( "click", "#bouton_envoyer_sujet", function(){   

      var titre = $("#input_creation_titre").val();
      var message = $("#input_creation_message").val();

      if(titre == "")
        alert("Entrez un titre");

      if(message == "")
        alert("Entrez un message");

      if(titre != "" && message != ""){
        $.ajax({
          url: 'remplir_sujets_brunei.php', 
          type: 'GET',
          data: {"function" : "insertionSujet", "titre" : titre, "message" : message}, // $_GET['function'] == "getLists";
          success: function(answer, status){
            if(answer){
              alert("Votre sujet a bien été créé !");

              document.getElementById("input_creation_titre").value = "";
              document.getElementById("input_creation_message").value = "";
            }
          },
          error: function(answer, status){
            console.log("Impossible d'exécuter la requête ajax");
          }
        });
      }

  });
});

$(document).ready(function(){ 
  $( "body" ).on( "click", ".bouton_cloturer", function(){
    console.log("yaaaaa");
    var contain_sujets = $( "#contain_sujets" );
    $("#contain_sujets").children().remove();
    //console.log("1");
    $.ajax({
      url: 'remplir_sujets_brunei.php', 
      datatype: 'json',
      type: 'GET',
      data: {"function" : "getSujets_user"}, // $_GET['function'] == "getLists";
      success: function(response, status){
        console.log(response);

        var obj = JSON.parse(response);
      
        var len = obj.length;
       
        $("#contain_sujets").children().remove();
        
        $("#contain_sujets").css('flex-direction', 'column');
        console.log("OBJ " + obj);
        for (var i = 0; i < len; i++) {
          //console.log("i : " + response[0]);
          var id = obj[i].id;
          if(obj[i].titre == undefined){
            // on fait un retour au sujet
            if(len == 1){
              contain_sujets.append("<h2>Pas de sujets en cours</h2>");
              $input2 = document.createElement("input");
              $input2.setAttribute('class', 'bouton_retour_sujets');
              $input2.setAttribute('type', 'button');
              $input2.setAttribute('value', 'Retour aux sujets');

              $("#contain_sujets").append($input2);
            }
           continue;
          }
          else
            var titre = obj[i].titre;

          
          $div = document.createElement("div");
          $button = document.createElement("button");
          $h3 = document.createElement("h3");
          $div.setAttribute('class', 'sujet');
          $button.setAttribute('id', id);
          $button.setAttribute('class', 'bouton_cloturer_2');
         
          $h3.innerHTML = titre;
          
          $button.append($h3);
          $div.append($button);
          contain_sujets.append($div);
          
        }

      },
      error: function(answer, status){
        console.log("Impossible d'exécuter la requête ajax");
      }
    });
  });
});


$(document).ready(function(){ 
  $( "body" ).on( "click", ".bouton_cloturer_2", function(){
      
      console.log("yaaaaa");
      var id_sujet = this.id;
      
      
      $.ajax({
        url: 'remplir_sujets_brunei.php', 
        datatype: 'json',
        type: 'GET',
        data: {"function" : "cloturer_sujet", "id_sujet": id_sujet}, // $_GET['function'] == "getLists";
        success: function(answer, status){
           
           console.log(answer);

            
            alert("Ce sujet a été clôturé");

            // on revient aux sujets
            var contain_sujets = $( "#contain_sujets" );
            //console.log("1");
            $.ajax({
              url: 'remplir_sujets_brunei.php', 
              datatype: 'json',
              type: 'GET',
              data: {"function" : "getSujets"}, // $_GET['function'] == "getLists";
              success: function(response, status){
                console.log(response);
                var obj = JSON.parse(response);
                
                var len = obj.length;
               
                $("#contain_sujets").children().remove();
                
                $("#contain_sujets").css('flex-direction', 'column');
                console.log("OBJ " + obj);
                for (var i = 0; i < len; i++) {
                  //console.log("i : " + response[0]);
                  var id = obj[i].id;
                  var titre = obj[i].titre;
                  var message = obj[i].message;

                  if(obj[i].titre == undefined){
                    // on fait un retour au sujet
                    if(len == 1){
                      contain_sujets.append("<h2>Pas de sujets</h2>");
                      $input2 = document.createElement("input");
                      $input2.setAttribute('class', 'bouton_retour_sujets');
                      $input2.setAttribute('type', 'button');
                      $input2.setAttribute('value', 'Retour aux sujets');

                      $("#contain_sujets").append($input2);
                    }
                   continue;
                  }
                  else
                    var titre = obj[i].titre;

                  if(obj[i].etat_id == 2){
                      var etat_id = "(Clôturé)";
                    }
                    else if(obj[i].etat_id == 1)
                      var etat_id = "(En cours)";

                  $div = document.createElement("div");
                  $button = document.createElement("button");
                  $h3 = document.createElement("h3");
                  $div.setAttribute('class', 'sujet');
                  $button.setAttribute('id', id);
                  $button.setAttribute('class', 'bouton_sujet');
                 
                   $h3.innerHTML = titre + " " + etat_id;

                  
                  $button.append($h3);

                  $p = document.createElement('p');
                  $p.innerHTML = message;
                  $button.append($p);

                  $div.append($button);
                  contain_sujets.append($div);
                  //console.log("div : " + $div);
                  //  $option.innerHTML = name;
                  //  $('#lists').append;

                  // supprimer le contenu de la div contain_sujets
                  
                  //$('#contain_sujets').append("<div class a> "+name+"</option> ");

                  // creation of the element that we want insert 
                  //$option = document.createElement("option");
                  //  $option.innerHTML = name;
                  //  $('#lists').append;

                  //console.log(obj);
                }

              },
              error: function(answer, status){
                console.log("Impossible d'exécuter la requête ajax");
              }
            });

        },
        error: function(answer, status){
          console.log("Impossible d'exécuter la requête ajax");
        }
      });
      
  });
  });


$(document).ready(function(){ 
  $( "body" ).on( "click", ".bouton_supprimer", function(){
    console.log("yaaaaa");
    var contain_sujets = $( "#contain_sujets" );
    $("#contain_sujets").children().remove();
    //console.log("1");
    $.ajax({
      url: 'remplir_sujets_brunei.php', 
      datatype: 'json',
      type: 'GET',
      data: {"function" : "getSujets"}, // $_GET['function'] == "getLists";
      success: function(response, status){
        console.log(response);

        var obj = JSON.parse(response);
      
        var len = obj.length;
       
        $("#contain_sujets").children().remove();
        
        $("#contain_sujets").css('flex-direction', 'column');
        console.log("OBJ " + obj);
        for (var i = 0; i < len; i++) {
          //console.log("i : " + response[0]);
          var id = obj[i].id;
          if(obj[i].titre == undefined){
            // on fait un retour au sujet
            if(len == 1){
              contain_sujets.append("<h2>Pas de sujets</h2>");
              $input2 = document.createElement("input");
              $input2.setAttribute('class', 'bouton_retour_sujets');
              $input2.setAttribute('type', 'button');
              $input2.setAttribute('value', 'Retour aux sujets');

              $("#contain_sujets").append($input2);
            }
           continue;
          }
          else
            var titre = obj[i].titre;

          
          $div = document.createElement("div");
          $button = document.createElement("button");
          $h3 = document.createElement("h3");
          $div.setAttribute('class', 'sujet');
          $button.setAttribute('id', id);
          $button.setAttribute('class', 'bouton_supprimer2');
         
          $h3.innerHTML = titre;
          
          $button.append($h3);
          $div.append($button);
          contain_sujets.append($div);
          
        }

      },
      error: function(answer, status){
        console.log("Impossible d'exécuter la requête ajax");
      }
    });
  });
});


$(document).ready(function(){ 
  $( "body" ).on( "click", ".bouton_supprimer2", function(){
      
      console.log("yaaaaa");
      var id_sujet = this.id;
      
      console.log("sujet " + id_sujet);
      $.ajax({
        url: 'remplir_sujets_brunei.php', 
        datatype: 'json',
        type: 'GET',
        data: {"function" : "supprimer_sujet", "id_sujet": id_sujet}, // $_GET['function'] == "getLists";
        success: function(answer, status){
           
           console.log(answer);

            
            alert("Ce sujet a été clôturé");

            // on revient aux sujets
            var contain_sujets = $( "#contain_sujets" );
            //console.log("1");
            $.ajax({
              url: 'remplir_sujets_brunei.php', 
              datatype: 'json',
              type: 'GET',
              data: {"function" : "getSujets"}, // $_GET['function'] == "getLists";
              success: function(response, status){
                console.log(response);
                var obj = JSON.parse(response);
                
                var len = obj.length;
               
                $("#contain_sujets").children().remove();
                
                $("#contain_sujets").css('flex-direction', 'column');
                console.log("OBJ " + obj);
                for (var i = 0; i < len; i++) {
                  //console.log("i : " + response[0]);
                  var id = obj[i].id;
                  var titre = obj[i].titre;
                  var message = obj[i].message;
                  if(obj[i].titre == undefined){
                    // on fait un retour au sujet
                    if(len == 1){
                      contain_sujets.append("<h2>Pas de sujets</h2>");
                      $input2 = document.createElement("input");
                      $input2.setAttribute('class', 'bouton_retour_sujets');
                      $input2.setAttribute('type', 'button');
                      $input2.setAttribute('value', 'Retour aux sujets');

                      $("#contain_sujets").append($input2);
                    }
                   continue;
                  }
                  else
                    var titre = obj[i].titre;

                  if(obj[i].etat_id == 2){
                      var etat_id = "(Clôturé)";
                    }
                    else if(obj[i].etat_id == 1)
                      var etat_id = "(En cours)";

                  $div = document.createElement("div");
                  $button = document.createElement("button");
                  $h3 = document.createElement("h3");
                  $div.setAttribute('class', 'sujet');
                  $button.setAttribute('id', id);
                  $button.setAttribute('class', 'bouton_sujet');
                 
                   $h3.innerHTML = titre + " " + etat_id;

                  
                  $button.append($h3);

                  $p = document.createElement('p');
                  $p.innerHTML = message;
                  $button.append($p);

                  $div.append($button);
                  contain_sujets.append($div);
                  //console.log("div : " + $div);
                  //  $option.innerHTML = name;
                  //  $('#lists').append;

                  // supprimer le contenu de la div contain_sujets
                  
                  //$('#contain_sujets').append("<div class a> "+name+"</option> ");

                  // creation of the element that we want insert 
                  //$option = document.createElement("option");
                  //  $option.innerHTML = name;
                  //  $('#lists').append;

                  //console.log(obj);
                }

              },
              error: function(answer, status){
                console.log("Impossible d'exécuter la requête ajax");
              }
            });

        },
        error: function(answer, status){
          console.log("Impossible d'exécuter la requête ajax");
        }
      });
      
  });
  });


$(document).ready(function(){ 
  $( "body" ).on( "click", ".retour_sujets", function(){

    var contain_sujets = $( "#contain_sujets" );
    //console.log("1");
    $.ajax({
      url: 'remplir_sujets_brunei.php', 
      datatype: 'json',
      type: 'GET',
      data: {"function" : "getSujets"}, // $_GET['function'] == "getLists";
      success: function(response, status){
        console.log(response);
        var obj = JSON.parse(response);
        
        var len = obj.length;
       
        $("#contain_sujets").children().remove();
        
        $("#contain_sujets").css('flex-direction', 'column');
        console.log("OBJ " + obj);
        for (var i = 0; i < len; i++) {
          //console.log("i : " + response[0]);
          var id = obj[i].id;
          var titre = obj[i].titre;
          var message = obj[i].message;

          if(obj[i].titre == undefined){
            // on fait un retour au sujet
            if(len == 1){
              contain_sujets.append("<h2>Pas de sujets</h2>");
              $input2 = document.createElement("input");
              $input2.setAttribute('class', 'bouton_retour_sujets');
              $input2.setAttribute('type', 'button');
              $input2.setAttribute('value', 'Retour aux sujets');

              $("#contain_sujets").append($input2);
            }
           continue;
          }
          else
            var titre = obj[i].titre;

          if(obj[i].etat_id == 2){
              var etat_id = "(Clôturé)";
            }
            else if(obj[i].etat_id == 1)
              var etat_id = "(En cours)";

          $div = document.createElement("div");
          $button = document.createElement("button");
          $h3 = document.createElement("h3");
          $div.setAttribute('class', 'sujet');
          $button.setAttribute('id', id);
          $button.setAttribute('class', 'bouton_sujet');
         
           $h3.innerHTML = titre + " " + etat_id;

          
          $button.append($h3);

          $p = document.createElement('p');
          $p.innerHTML = message;
          $button.append($p);

          $div.append($button);
          contain_sujets.append($div);
          //console.log("div : " + $div);
          //  $option.innerHTML = name;
          //  $('#lists').append;

          // supprimer le contenu de la div contain_sujets
          
          //$('#contain_sujets').append("<div class a> "+name+"</option> ");

          // creation of the element that we want insert 
          //$option = document.createElement("option");
          //  $option.innerHTML = name;
          //  $('#lists').append;

          //console.log(obj);
        }

      },
      error: function(answer, status){
        console.log("Impossible d'exécuter la requête ajax");
      }
    });
  });
});