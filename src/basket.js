const Bagel = require("../src/myBagel.js");
const deals = require("../src/deals.js");

class Basket {
    constructor(basket = [], limit = 10) {
        this.basket = basket;
        this.limit = limit
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
            console.log('My Basket ', this.basket);
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
        console.log('total '+total);
        return total;
    }



}
const myBasket = new Basket();
console.log(myBasket.addBagel('BGLP', 5));
console.log(myBasket.addBagel('COF', 3));
//console.log(myBasket.removeBagel('COF'));
console.log(myBasket.getTotal());




module.exports = Basket