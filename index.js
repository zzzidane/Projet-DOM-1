var btnProd1 = document.getElementById('btn-prod-1');
var btnProd2 = document.getElementById('btn-prod-2');
var btnProd3 = document.getElementById('btn-prod-3');
var btnProd4 = document.getElementById('btn-prod-4');
var totalDiv = document.getElementById('total');
var cartPop = document.getElementById('cart-pop');
var btnDProd1 = document.getElementById('btn-d-prod-1');
var btnDProd2 = document.getElementById('btn-d-prod-2');
var btnDProd3 = document.getElementById('btn-d-prod-3');
var btnDProd4 = document.getElementById('btn-d-prod-4');

var cart = document.getElementById('cart-count');

var counter = 0;
var total = 0;

var sCart = [];


function incrementCart(p) {


   var data ;
    if(p === 'p1'){
      data =  btnProd1.getAttribute('data')
    }
    if(p === 'p2'){
        data =  btnProd2.getAttribute('data')
      }
      if(p === 'p3'){
        data =  btnProd3.getAttribute('data')
      }
      if(p === 'p4'){
        data =  btnProd4.getAttribute('data')
      }
    
    var dataJson = JSON.parse(data);

    sCart.push(dataJson);
    total += dataJson.price; 
    counter++;
    cart.innerText = `${counter}`
    totalDiv.innerText = `TOTAL: ${total}`;

    intCartPop(sCart)
   
   
   }


   function decrementCart(p){
    var data ;
    if(p === 'p1'){
      data =  btnProd1.getAttribute('data')
    }
    if(p === 'p2'){
        data =  btnProd2.getAttribute('data')
      }
      if(p === 'p3'){
        data =  btnProd3.getAttribute('data')
      }
      if(p === 'p4'){
        data =  btnProd4.getAttribute('data')
      }
    
    var dataJson = JSON.parse(data);

    
    total -= dataJson.price; 
    counter--;
    cart.innerText = `${counter}`
    totalDiv.innerText = `TOTAL: ${total}`;

    sCart = sCart.filter(p => p.name != dataJson.name)
    intCartPop(sCart);



   }

btnProd1.addEventListener('click',() =>  incrementCart('p1'));
btnProd2.addEventListener('click',() =>  incrementCart('p2'));
btnProd3.addEventListener('click',() =>  incrementCart('p3'));
btnProd4.addEventListener('click',() =>  incrementCart('p4'));


btnDProd1.addEventListener('click',() =>  decrementCart('p1'));
btnDProd2.addEventListener('click',() =>  decrementCart('p2'));
btnDProd3.addEventListener('click',() =>  decrementCart('p3'));
btnDProd4.addEventListener('click',() =>  decrementCart('p4'));


function intCartPop(data){
    var innerElt = "";
    data.forEach((p) => {
      innerElt+= `<li>Name : ${p.name} <strong>${p.price}</strong></li>`;
    })

    cartPop.innerHTML = innerElt;
}





