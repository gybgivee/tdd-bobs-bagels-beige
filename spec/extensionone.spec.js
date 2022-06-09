const Deal = require("../src/deals.js");
const Bagel = require("../src/myBagel.js");
const Basket = require("../src/basket.js");

describe("Deals", () => {
    let basket
    let bagel

    beforeEach(() => {
        basket = new Basket()
        bagel = new Bagel()
        deal = new Deal()
    });

    it("check price of type of bagel", () => {
        const expected = "0.49"
        const result = bagel.getPriceOfBagel("BGLO")
        expect(result).toEqual(expected);
    });

    it("check deal for a type of bagel", () => {
        const expected = 'Onions Bagel 6 for 2.49'
        const result = deal.getDeal('BGLO')
        expect(result.special).toEqual(expected);
    });

    it("check for the coffee deal", () => {
        const expected = 'Coffee & Plain Bagel for 1.25'
        const result = deal.getDeal('COF')
        expect(result.special).toEqual(expected);
    });

    it("price totals should account for a deal", () => {
        const expected = 5.55
        basket.addBagel("BGLP",16)
        const result = basket.getTotal()
        console.log(result)
        expect(result.total).toEqual(expected);
    });

    it("calculate total for a large deal", () => {
        const expected = 10.43
        basket.changeLimit(30)
        basket.addBagel("BGLP",12)
        basket.addBagel("BGLO",2)
        basket.addBagel("BGLE", 6)
        basket.addBagel("COF", 3)
        const result = basket.getTotal()
        console.log("result is", result)
        expect(result.total).toEqual(expected);
    });

    it ("calculate deal for coffee and plain donut", () => {
    const expected = 1.25
    basket.addBagel("BGLP", 1)
    basket.addBagel("COF", 1)
    const result = basket.getTotal()
    expect(result.total).toEqual(expected);
    });

    it ("another large deal", () => {
        const expected = 13.17
        basket.changeLimit(40)
        basket.addBagel("BGLP",13)
        basket.addBagel("BGLO",7)
        basket.addBagel("BGLE", 9)
        basket.addBagel("COF", 2)
        const result = basket.getTotal()
        console.log("last test result is", result)
        expect(result.total).toEqual(expected);
    });

});