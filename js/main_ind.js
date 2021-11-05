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



function toogleModalAuth(){
   modalAuth.classList.toggle('is-open');
}

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
                else if (i == users.length-1){authStatus = false; localStorage.setItem('authStatus',false); alert('Error! Please, check your login and password, try again.');break;}
            }
    })
// else if (authStatus == true) { 
//     let login = localStorage.getItem('authData');
//     document.getElementById('login-text').innerText = login.login;  
// }