const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const buttonLogin = document.querySelector('.button-login')
let authStatus = JSON.parse(localStorage.getItem('authStatus'));
let authData = JSON.parse(localStorage.getItem('authData'));
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const restaurantHeading = document.querySelector('.restaurant-heading');
let restaurantList;
const getData = async function (url){
    const response = await fetch(url)
    if(!response.ok){
        throw new Error(`Error! Address: ${url}. Status code: ${response.status}!`)
    }
    return await response.json();
};

getData('./db/partners.json').then(function(data){
    data.forEach(createCardRestaurant)
    restaurantsList = data;
});

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

function createCardRestaurant(restaurant){
    console.log(restaurant);
    const { 
        image, 
        kitchen, 
        name, 
        price, 
        stars, 
        products, 
        time_of_delivery: timeOfDelivery } = restaurant;
    const card = `
                <a class="card" data-products="${products}">
                    <img src="${image}" alt="image" class="card-image" />
                    <div class="card-text">
                        <div class="card-heading">
                            <h3 class="card-title">${name}</h3>
                            <span class="card-tag tag">${timeOfDelivery} мин</span>
                        </div>
                        <div class="card-info">
                            <div class="rating"><img src="img/rating.svg" alt="rating" class="rating-star" /> ${stars}</div>
                            <div class="price">от ${price} у.е.</div>
                            <div class="category">${kitchen}</div>
                        </div>  
                    </div>
                </a>
    `;
    cardsRestaurants.insertAdjacentHTML('beforeend',card)
}
function createCardGood(goods) {
    const { description, id, image, name, price } = goods;

    const card = document.createElement('div');
    card.className = 'card animate__animated animate__fadeInUp animate__delay-1s center';
  
    card.insertAdjacentHTML('beforeend', `
    <img src="${image}" alt="image" class="card-image" />
    <div class="card-text">
        <div class="card-heading">
            <h3 class="card-title card-title-reg">${name}</h3>
        </div>
        <!-- /.card-heading -->
        <div class="card-info">
            <div class="ingredients">${description}</div>
        </div>
        <!-- /.card-info -->
        <div class="card-buttons">
            <button class="button button-primary">
                <div class="inbutt">
                    <span class="button-card-text">В корзину</span> 
                    <img src="img/shopping-cart-white.svg" alt="shopping_cart" class="button-card-image">
                </div>
            </button>
            <strong class="card-price-bold">${price} y.e.</strong>
        </div>
    </div>
    <!-- /.card-text -->
  `);
  
  menu.insertAdjacentElement('beforeend', card);
    
  }

//createCardRestaurant();

function openGoods(event){
    const target = event.target;
    
    const restaurant = target.closest('.card');
    if(authStatus == true)
    {
        if(restaurant){
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');
            console.log('govnishe');
            getData(`./db/${restaurant.dataset.products}`).then(function(data){
                data.forEach(createCardGood);
            });
            // restaurantHeading.innerHTML = `
            // <h2 class="section-title restaurant-title">Пицца Плюс</h2>
            // <div class="card-info">
            //     <div class="rating">
            //         4.5
            //     </div>
            //     <div class="price">От 900 ₽</div>
            //     <div class="category">Пицца</div>
            // </div>
            // <!-- /.card-info -->`
           
        }
    }
    else
        toogleModalAuth();
}

cardsRestaurants.addEventListener('click',openGoods);
logo.addEventListener('click',function(){
        containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        menu.classList.add('hide');
})

//slider

new Swiper('.swiper-container',{
    sliderPerView:1,
    loop:true,
    autoplay:true,
    effect:'flip',
    grabCursor:true,
})