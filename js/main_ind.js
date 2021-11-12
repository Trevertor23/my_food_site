const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const buttonLogin = document.querySelector('.button-login')
let authStatus = JSON.parse(localStorage.getItem('authStatus'));
let authData = JSON.parse(localStorage.getItem('authData'));

let users = [
    {login:"trevertor23",password:"321654"},
    {login:"trevertor",password:"321654321"},
    {login:"guest",password:"12345"}
];
let openStatus = 0;


function toogleModalAuth(){
   modalAuth.classList.toggle('is-open');
   openStatus++;
   document.getElementById('login').style.borderColor = '';
   document.getElementById('login').value = '';
   document.getElementById('password').style.borderColor = '';
   document.getElementById('password').value = '';
   if(openStatus == 2){
        document.body.style.overflow = 'visible';
        openStatus = 0;
   }
   else{
       document.body.style.overflow = 'hidden';
   }
}
modalAuth.addEventListener('click', function(event){
    if(event.target.classList.contains('is-open'))
        toogleModalAuth();
})

buttonAuth.addEventListener('click', function(){
    
   if(authStatus==false)
    { toogleModalAuth();}
    else
    {
        console.log(authStatus);
        if(confirm('Вы хотите разлогиниться?')==true)
        {
            localStorage.setItem('authStatus',false);
            localStorage.setItem('authData',null);
            authStatus = false;
            authData = null;
            document.getElementById('login-text').innerText = "Войти";
        }

    }
})

if(authData !== null)
 {
     document.getElementById('login-text').innerText = authData.login;
 }
    buttonLogin.addEventListener('click', function(){
            let login = document.querySelector('#login').value;
            let password = document.querySelector('#password').value;
            for(let i = 0; i < users.length; i++){
                if(users[i].login == login && users[i].password == password){
                    authStatus = true;
                    localStorage.setItem('authStatus',true);
                    localStorage.setItem('authData',JSON.stringify(users[i]));
                    toogleModalAuth();
                    document.getElementById('login-text').innerText = login;
                    break;
                }
                else if (i == users.length-1){
                    authStatus = false; localStorage.setItem('authStatus',false);
                    alert('Error! Please, check your login and password, try again.');
                    if(login=='')
                        document.getElementById('login').style.borderColor = '#ff0000';
                    else if(password=='')
                        document.getElementById('password').style.borderColor = '#ff0000';
                    break;
                }
            }
    })
// else if (authStatus == true) { 
//     let login = localStorage.getItem('authData');
//     document.getElementById('login-text').innerText = login.login;  
// }