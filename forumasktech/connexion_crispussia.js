

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


$(document).ready(function(){
    $("#valider").on('click',function(){
        var login=$("#login").val();
        var password=$("#password").val();
        var value=startsWithCapital();
        console.log(login);
        console.log(password);
        console.log(value);
         
     $.ajax({
            url: "connexion_crispussia.php",
            dataType: 'json',
            type: "post",
            data: {'fonction' :'Connexion','login':login, 'password' :password},
           
            success: function (response,statut) {
                
                console.log("response" + response);
               if(response.length==3){
                     

                    if(response[0]==true || login==""){
                        document.getElementById("password").style="";
                        document.getElementById("login").style=" border: 2px solid red;";
                        
                    }
                    else if(response[1]==true || password==""){
                        document.getElementById("login").style="";
                        document.getElementById("password").style=" border: 2px solid red;";    
                    }
                    
               }else {
                document.location.href="main_page.php";
                 
               }
            },
            error: function(response,statut,erreur) {
               console.log(erreur);
            }
        });
    });

});
