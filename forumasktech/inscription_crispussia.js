/*--------- Chargement des sections de la base dedonnée----------*/
var i;
$.ajax({

  url : 'inscription_crispussia.php', // on donne l'URL du fichier de traitement
  type : 'POST', // la requête est de type POST
  data: {'fonction': 'fullDepartement'},
  dataType: 'json',
  success: function (response,statut) {
    //$("#departement").html('<option value="0" disabled="true" selected>Selectionnez un département</option>');
          for(i=0;i<response.length;i++){
            var option=document.createElement('option');
            option.textContent=response[i][1];
            option.setAttribute("value",response[i][0])
            document.getElementById("department").appendChild(option); 
           
          }

  },
            error: function(response,statut,erreur) {
               console.log(erreur);
            }

});

$.ajax({
          url: "inscription_crispussia.php",
          dataType: 'json',
          type: "post",
          data: {'fonction' :'fullRole'},
         
          success: function (response,statut) {
            
                     for(i=0;i<response.length;i++)
                      {
                        var input=document.createElement('input');
                        var label=document.createElement('label');
                        input.setAttribute("type", "radio");
                        input.setAttribute("id",response[i][0]);
                        input.setAttribute("name","role");
                        //input.setAttribute("value",response[i][1]);
                        label.textContent=response[i][1];
                        document.getElementById("role").appendChild(input); 
                        document.getElementById("role").appendChild(label); 

                       
                      }

          },
          error: function(response,statut,erreur) {
             console.log(erreur);
          }
});



var togglePassword = document.querySelector('#togglePassword');
var password = document.querySelector('#password');


 
  togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

function startsWithCapital(){
    var login=document.querySelector("#login").value;
    console.log(login);
    if(login!=null){
        if( login.charAt(0) === login.charAt(0).toUpperCase() && login!="" ){
            for(var i=1;i<login.length;i++){
                if( login.charAt(i) != login.charAt(i).toLowerCase() || login.charAt(i)<'a' || login.charAt(i)>'z'){
                    return false;
                }
            } return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
    
}
function allLetter(word){ 
      var letters = /^[A-Za-z]+$/;
      if(word.match(letters)){
        return true;
      }else{
        return false;
      }
}


  
  $("#inscription").on('click',function(){


      var value=startsWithCapital();
      var nom=allLetter(document.querySelector("#nom").value);
      var prenom=allLetter(document.querySelector("#prenom").value);
      var password=document.querySelector('#password').value;
      var conf_password=document.querySelector('#conf_password').value;
      var role_value=0;
      var role = $('input[name="role"]:checked').length > 0;     
      console.log(role);
      var select = document.getElementById('department');
      var departement = select.options[select.selectedIndex].value;
      console.log(departement);
      var agree =document.getElementById('cb1').checked;
      if(value==true && password!="" && nom==true && prenom==true && conf_password!="" && role == true && departement!=0 && agree==true){
         if(conf_password!=password){
              document.getElementById("password").style="";
              document.getElementById("nom").style="";
              document.getElementById("prenom").style="";
             
              document.getElementById("department").style="";
              document.getElementById("cb1").style="";
              document.getElementById("login").style="";
             document.getElementById("conf_password").style=" border: 2px solid red;";
            
         }else{
            document.getElementById("password").style="";
            document.getElementById("nom").style="";
            document.getElementById("prenom").style="";
            document.getElementById("department").style="";
            document.getElementById("cb1").style="";
            document.getElementById("login").style="";
             document.getElementById("conf_password").style="";
             var login=document.querySelector("#login").value;
             var nom=document.querySelector("#nom").value;
             var prenom=document.querySelector("#prenom").value;
             if(role==true){
              role_value=document.querySelector('input[name="role"]:checked').id;
              console.log(role_value)
             }
            
           
            $.ajax({
              url: "inscription_crispussia.php",
              dataType: 'json',
              type: "post",
              data: {
                'fonction' :'inscription',
                'nom': nom, 
                'prenom' : prenom,
                'login':login, 
                'password' :password,
                'departement': departement,
                'role':role_value
              },
          
              success: function (response,statut) {
                console.log(response,statut);

                  if(response=="no"){
                    document.getElementById("login").style=" border: 2px solid red;";
                  }else {
                  
                  document.getElementById("login").style="";
                  document.location.href="index.html";
                    
                  }
              },
              error: function(response,statut,erreur) {
                  console.log(response,statut,erreur);
              }
          });
            
           //document.location.href="main_page.php";
       }
    }else{
        if(prenom!=true){
            document.getElementById("password").style="";
            document.getElementById("nom").style="";
            document.getElementById("department").style="";
            document.getElementById("cb1").style="";
            document.getElementById("login").style="";
            document.getElementById("conf_password").style="";
            document.getElementById("prenom").style=" border: 2px solid red;";
           

        }
        else if(nom!=true){
            document.getElementById("password").style="";
            document.getElementById("prenom").style="";
            document.getElementById("department").style="";
            document.getElementById("cb1").style="";
            document.getElementById("login").style="";
            document.getElementById("conf_password").style="";
            document.getElementById("nom").style=" border: 2px solid red;";
           
        }

        else if(value!=true){
            document.getElementById("password").style="";
            document.getElementById("nom").style="";
            document.getElementById("prenom").style="";
        
            document.getElementById("department").style="";
            document.getElementById("cb1").style="";
            
            document.getElementById("conf_password").style="";
            document.getElementById("login").style=" border: 2px solid red;";
           
        }
        else if(password==""){
           
            document.getElementById("nom").style="";
            document.getElementById("prenom").style="";
        
            document.getElementById("department").style="";
            document.getElementById("cb1").style="";
            document.getElementById("login").style="";
            document.getElementById("conf_password").style="";
            document.getElementById("password").style=" border: 2px solid red;";
        }
        else if(conf_password==""){
            document.getElementById("password").style="";
            document.getElementById("nom").style="";
            document.getElementById("prenom").style="";
        
            document.getElementById("department").style="";
            document.getElementById("cb1").style="";
            document.getElementById("login").style="";
            document.getElementById("conf_password").style=" border: 2px solid red;";

        }
        else if(role==false){
          document.getElementById("password").style="";
            document.getElementById("nom").style="";
            document.getElementById("prenom").style="";
        
            document.getElementById("department").style="";
            document.getElementById("cb1").style="";
            document.getElementById("login").style="";
            document.getElementById("conf_password").style="";
            alert("Sélectionner votre role");
        }
        else if(departement==0){
           document.getElementById("password").style="";
            document.getElementById("nom").style="";
            document.getElementById("prenom").style="";
        
            document.getElementById("department").style="";
            document.getElementById("cb1").style="";
            document.getElementById("login").style="";
            document.getElementById("conf_password").style="";
            alert("Sélectionner un departement");
        }
        else if(agree!=true){
           document.getElementById("password").style="";
            document.getElementById("nom").style="";
            document.getElementById("prenom").style="";
        
            document.getElementById("department").style="";
            document.getElementById("cb1").style="";
            document.getElementById("login").style="";
            document.getElementById("conf_password").style="";
            alert("Accepter les conditions");
        }

        
    }



  });

  


