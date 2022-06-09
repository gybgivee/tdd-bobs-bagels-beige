const Bagel = require("../src/myBagel.js");
class Receipt {
    constructor() {

    }
    getReceipt(basket, checkout) {
        const header = "~~~ Bob's Bagels ~~~\n";
        let date = new Date;
        date = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear() + "\n";
        let listOfBasket = "";
        let discountFrom = "";
        let allStr = ""

        const myBagel = new Bagel();

        if(basket.length > 0) {

        

        for (const item of basket) {

            const details = myBagel.findBySKU(item.SKU);
            //console.log(" details "+details.variant);
            const eachStr = details.variant + ' ' + details.name +' '+ item.quantity +' '+ details.price + '\n';
            listOfBasket = listOfBasket + eachStr;
            //console.log('listOfBasket '+listOfBasket);
        }
      
        listOfBasket+="\n---------------------\n";
        listOfBasket += 'Total : ' + '             ' + checkout.total;
        listOfBasket += '\n Thank You for your order \n';
        allStr=header+date+'\n'+listOfBasket;
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
        }
        return allStr;

    }
}
module.exports = Receipt;