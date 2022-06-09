class Deal {
    constructor(){

     }

    getDeal(SKU) {

        const deal = [
            {
                SKU: 'BGLO',
                promotion: 6,
                pair: false,
                discount: 0.45,
                special: 'Onions Bagel 6 for 2.49'
            },
            {
                SKU: 'BGLP',
                promotion: 12,
                pair: true,
                pairPromotion: 0.065,
                discount: 0.69,
                special: 'Plain Bagel 12 for 3.99'
            },
            {
                SKU: 'BGLE',
                promotion: 6,
                pair: false,
                discount: 0.45,
                special: 'Everything Bagel 6 for 2.49'
            },
            {
                SKU: 'COF',
                promotion: 999999,
                pair: true,
                pairPromotion: 0.065,
                discount: 0,
                special: 'Coffee & Plain Bagel for 1.25'

            }
        ]
        const result = deal.find(element => element.SKU === SKU);
        //console.log('result ' + result.discount);
        return result;
    }
    
    getDiscount(basket) {

        const currentBasket = basket;
        let extraDiscount = 0;
        let dealDiscount = 0;
        let currentQuantity = 0;
        let pairPromo = 0;
        let discountFrom =[];
        //console.log('length: ' + currentBasket.length);
        for (let i = 0; i < currentBasket.length; i++) {
            
            const sku = currentBasket[i].SKU;
            //console.log('sku '+sku);
            const deal = this.getDeal(sku)
            currentQuantity = currentBasket[i].quantity;
            console.log('i '+i);
            //console.log('currentQuantity '+currentQuantity);

            //console.log('deal '+deal.pair);
            if (currentQuantity >= deal.promotion) {

                extraDiscount = deal.discount + extraDiscount;
                currentQuantity = currentQuantity - deal.promotion;
                console.log('extraDiscount ',extraDiscount);
                discountFrom.push(deal.special)
                console.log('currentQuantity '+currentQuantity);
            }
           
            if (deal.pair&&currentQuantity > 0) {
                   pairPromo++;
                  
            }
          
            //console.log('----------------');
        }
      console.log('dis ',extraDiscount);
        if (pairPromo >= 2) {
          
           
            //console.log('promoDiscount '+promoDiscount);
            const countDeal =  (Math.floor(pairPromo / 2));
            console.log('countDeal '+countDeal);
            extraDiscount += countDeal * 0.13;
            discountFrom.push( 'Coffee & Plain Bagel for 1.25');
            
        }


   
       
      
        return {extraDiscount:extraDiscount,deal: discountFrom};

    }


}



module.exports = Deal;