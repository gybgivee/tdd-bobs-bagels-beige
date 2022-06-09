const Bagel = require("../src/myBagel.js");
const Basket = require("../src/basket.js");

describe("Basket", () => {
    let basket

    beforeEach(() => {
        basket = new Basket();
    });

    it("basket is empty", () => {
        const expected = []
        const result = basket.basket
        expect(result).toEqual(expected);
    });

    it("get price of bagel before adding to basket", () => {
        const bagel = new Bagel()
        const expected = "0.49"
        const result = bagel.getPriceOfBagel("BGLO");
        expect(result).toEqual(expected);
      });

    it("add item to basket", () => {



        const expected = [ { SKU: 'BGLP', quantity: 10, total: 3.9 } ]

        const result = basket.addBagel("BGLP", 10)

        expect(result).toEqual(expected);
    });

    it("remove item from basket", () => {

        const expected = []
        basket.addBagel("BGLP", 10)
        const result = basket.removeBagel('BGLP')

        expect(result).toEqual(expected);
    });

    it("add a second bagel to basket", () => {

        const expected = [ { SKU: 'BGLP', quantity: 5, total: 1.95 }, 
                            { SKU: 'COF', quantity: 1, total: 0.99 } ]

        basket.addBagel("BGLP", 5)
        const result = basket.addBagel("COF", 1)
        expect(result).toEqual(expected);
    });

    it("when Basket is full", () => {

        const expected = [ { SKU: 'BGLP', quantity: 20, total: 7.8 }]
        basket.addBagel("BGLP", 20)
        const result = basket.addBagel("COF", 1)
        expect(result).toEqual(expected);
    });

    it("create basket with larger capacity", () => {
        const expected = 20
        const result = basket.changeLimit(20)
        expect(result).toEqual(expected);
    });

    it("cannot remove an item that isn't in the basket", () => {
        const expected = "Bagel isn't in basket"
        const result = basket.removeBagel(1)
        expect(result).toEqual(expected);
    });

    it("total sum of bagels in my basket ", () => {
        const expected = 2.75;
        basket.addBagel("COF", 1)
        basket.addBagel("BGLP", 5)  
        const result = basket.getTotal();
        expect(result.total).toEqual(expected);
      });
});