
const Bagel = require("../src/myBagel.js");
class Receipt {
    constructor() {

    }
    getReceipt(basket, checkout) {
        const header = "~~~ Bob's Bagels ~~~\n";
        let date = new Date;
        date = date.toString() + "\n";
        let listOfBasket = "";
        let discountFrom = "";

        const myBagel = new Bagel();

        for (const item of basket) {

            const details = myBagel.findBySKU(item.SKU);
            //console.log(" details "+details.variant);
            const eachStr = details.variant + ' ' + details.name + '             ' + details.price + '\n';
            listOfBasket = listOfBasket + eachStr;
            //console.log('listOfBasket '+listOfBasket);
        }
      
        listOfBasket+="\n---------------------\n";
        listOfBasket += 'Total : ' + '             ' + checkout.total;
        listOfBasket += '\n Thank You for your order \n';
        let allStr=header+date+'\n'+listOfBasket;
        if (checkout.deal.length > 0) {
            //console.log('\n Total Discount:         ' + checkout.discount);
            //console.log('You are saving today from');
            allStr+='\n Total Discount:         ' + checkout.discount;
            allStr+='You are saving today from';
            const printDeal = checkout.deal;
            //console.log('printDeal '+printDeal);
            discountFrom = printDeal.reduce((total, element) => { return total + element }, "\n")
            allStr+=discountFrom;
        }
        return allStr;

    }
}
module.exports = Receipt;