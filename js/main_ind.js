const cardButton = document.querySelector("#card-button");
const modalBody = document.querySelector('.modal-body');
const close = document.querySelector(".close"); 
const clearCart = document.querySelector('.clear-cart');
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const buttonLogin = document.querySelector('.button-login')
let authStatus = JSON.parse(localStorage.getItem('authStatus'));
let authData = JSON.parse(localStorage.getItem('authData'));
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const cardsMenu = document.querySelector('.cards-menu');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const modal = document.querySelector(".modal");
const restaurantHeading = document.querySelector('.restaurant-heading');
const inputSearch = document.querySelector(".input-search");
const priceTag = document.querySelector('.price-tag');


const card = document.querySelector('.card');
let cart = [];
if (localStorage.getItem('cart').length > 0) {
    cart = JSON.parse(localStorage.getItem('cart'));
}

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

function toggleModal(){
    modal.classList.toggle('is-open');
}
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
            <button class="button button-primary button-add-cart" id="${id}">
                <div class="inbutt ">
                    <span class="button-card-text">В корзину</span> 
                    <img src="img/shopping-cart-white.svg" alt="shopping_cart" class="button-card-image">
                </div>
            </button>
            <strong class="card-price card-price-bold">${price} y.e.</strong>
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
function addToCart(event) {
    const target = event.target;
    const buttonAddToCart = target.closest('.button-add-cart')
    
    if (buttonAddToCart) {
        const card = target.closest('.card');
        const title = card.querySelector('.card-title').textContent;
        const cost = card.querySelector('.card-price').textContent;
        const id = buttonAddToCart.id;


        const food = cart.find(function(item) {
            return item.id === id;
        })
        if (food) {
            food.count += 1;
        } else {
            cart.push({
                id,
                title,
                cost,
                count: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function renderCart() {
modalBody.textContent = '';
cart.forEach(function({id, title, cost, count}) {
    const itemCart = `
    <div class="food-row">
    <span class="food-name">${title}</span>
              <strong class="food-price">${cost}</strong>
              <div class="food-counter">
                  <button class="counter-button  counter-minus" data-id=${id}>-</button>
                  <span class="counter">${count}</span>
                  <button class="counter-button counter-plus" data-id=${id}>+</button>
              </div>
          </div>
    `;

    modalBody.insertAdjacentHTML(`afterbegin`, itemCart)
});

const totalPrice = cart.reduce(function(result, item) {
    return result + (parseFloat(item.cost) * item.count);
}, 0);
priceTag.textContent = totalPrice + ' ₽';
}

function changeCount(event) {
const target = event.target;
if (target.classList.contains('counter-button')) {
    const food = cart.find(function(item) {
        return item.id === target.dataset.id;
    });
   
    if (target.classList.contains('counter-minus')) {
        food.count--;
        if(food.count === 0) {
            cart.splice(cart.indexOf(food), 1);
        }
    };
    if (target.classList.contains('counter-plus'))   { food.count++; }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}
}

cardsRestaurants.addEventListener('click',openGoods);
logo.addEventListener('click',function(){
        containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        menu.classList.add('hide');
})
function init(){
    cardButton.addEventListener('click',  function() {
        renderCart();
         toggleModal();
     });
   
     modalBody.addEventListener('click', changeCount);
     clearCart.addEventListener('click', function() {
         cart.length = 0;
         localStorage.removeItem('cart');
         renderCart();
     });
     menu.addEventListener('click', addToCart);
     close.addEventListener('click', toggleModal); 

    inputSearch.addEventListener('keypress', function (event) {
        if (event.charCode === 13){
            const value = event.target.value.trim();
            if (!value){
                event.target.style.backgroundColor = RED_COLOR;
                event.target.value = '';
                setTimeout(() =>{
                    event.target.style.backgroundColor ='';
                },1500)
                return;
            }
            getData('./db/partners.json').then(function(data){
                return data.map(function(partner){
                    return partner.products;
                });
            }).then(function(linksProduct){
                linksProduct.forEach(function(link){
                    getData(`./db/${link}`)
                    .then(function(data){
                        const resultSearch = data.filter(function(item){
                            const name = item.name.toLowerCase();
                            return name.includes(value.toLowerCase());
                        })
                        cardsMenu.textContent = '';
                        containerPromo.classList.add('hide');
                        restaurants.classList.add('hide');
                        menu.classList.remove('hide');

                        document.querySelector('.section-title-1').textContent = 'Результаты по запросу: ';
                        document.querySelector('.section-title-1').classList.add('show');

                        resultSearch.forEach(createCardGood);

                    })
                });
            })
        }
    })
    
}

init();
//slider

new Swiper('.swiper-container',{
    sliderPerView:1,
    loop:true,
    autoplay:true,
    effect:'flip',
    grabCursor:true,
})