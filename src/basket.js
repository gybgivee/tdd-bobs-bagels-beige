const Bagel = require("../src/myBagel.js");
const Deal = require("../src/deals.js");
const Receipt = require("../src/receipt");

class Basket {
    constructor(basket = [], limit = 20) {
        this.basket = basket;
        this.limit = limit
    }
    getBasket(){
        return this.basket;
    }
    addBagel(SKU, quantity) {
        const currentBasket = this.basket;

        const currentBasketSize = this.basketIsFull();
        const availableSize = this.limit - currentBasketSize;

        if (availableSize >= quantity) {

            const myBagel = new Bagel();
            const bagelDetails = myBagel.findBySKU(SKU);
            const total = (bagelDetails.price * quantity).toFixed(2);
            currentBasket.push(
                {
                    SKU: SKU,
                    quantity: quantity,
                    total: parseFloat(total)

                })
            this.basket = currentBasket;
            //console.log('My Basket ', this.basket);
            return this.basket;
        } else {

            console.log('Basket is full');
            return this.basket;
        }


    }
    removeBagel(SKU) {
        const myBasket = this.basket;
        for (let i = 0; i < myBasket.length; i++) {
            if (myBasket[i].SKU === SKU) {
                myBasket.splice([i], 1);
                this.basket = myBasket;

                return this.basket;
            }
        } return "Bagel isn't in basket"
    }

    basketIsFull() {

        const currentBasketCapacity = this.basket.reduce((total, element) => { return total + element.quantity }, 0)

        return currentBasketCapacity
    }


    getTotal() {
        const currentBasket = this.basket;
        const total = currentBasket.reduce((total, element) => { return total + element.total },0)
        //console.log('total '+typeof total);
        const myDeal = new Deal();
        const deal = myDeal.getDiscount(currentBasket);
        let newTotal = total - deal.extraDiscount;
        newTotal = parseFloat(newTotal.toFixed(2));


        return {total:newTotal,discount:deal.extraDiscount,deal:deal.deal};;
    }

    changeLimit(limit) {
        this.limit = limit

        return this.limit
    }



}
// const myBasket = new Basket();
// myBasket.addBagel('BGLP', 5)
// myBasket.addBagel('COF', 3)
// //console.log(myBasket.removeBagel('COF'));
// const total = myBasket.getTotal();
// //console.log('total ',total.total);
// const currentBasket = myBasket.getBasket();
// const newReceipt = new Receipt();

// const print = newReceipt.getReceipt(currentBasket,total);
// console.log(print);


// console.log(currentBasket);
// const mydeals= new Deal();
// const extraDiscount = mydeals.getDiscount(currentBasket);
// //4.53
// const newTotal = total - extraDiscount;
// console.log('my deals : '+extraDiscount +' total '+total,'newTotal '+newTotal);

const myBasket = new Basket();
myBasket.changeLimit(50);
myBasket.addBagel('BGLO', 4)
myBasket.addBagel('BGLP', 15)
myBasket.addBagel('BGLE', 7)
myBasket.addBagel('COF', 3)
//myBasket.addBagel('BGLP', 5)
// myBasket.addBagel('COF', 3)
// console.log(myBasket.removeBagel('COF'));
const total = myBasket.getTotal();
//console.log('total ',total.total);
const currentBasket = myBasket.getBasket();
const newReceipt = new Receipt();

const print = newReceipt.getReceipt(currentBasket,total);

console.log(print)


module.exports = Basket