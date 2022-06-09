const Basket = require("../src/basket.js");
const Receipt = require("../src/receipt.js");

describe("Receipts", () => {
    let basket
    let receipt

    beforeEach(() => {
        basket = new Basket()
    });

    it("return a blank receipt", () => {
        const testReceipt = new Receipt
        const expected = ""
        const result = testReceipt.getReceipt([])
        expect(result).toEqual(expected);
    });

    it("returns a receipt with all purchases", () => {
        const expected =
        `~~~ Bob's Bagels ~~~
        9/6/2022
        
        Plain Bagel 5 0.39
        
        ---------------------
        Total :              1.95
         Thank You for your order`;
        basket.addBagel('BGLP', 5);
        const result = basket.getTotal();
        const currentBasket = basket.getBasket();
        const newReceipt = new Receipt();

        const print = newReceipt.getReceipt(currentBasket, result);

        expect(print).toEqual(expected);
    });

    it("returns another receipt", () => {
        const expected = `~~~ Bob's Bagels ~~~
        9/6/2022
        
        Onion Bagel 40.49
        Plain Bagel 150.39
        Everything Bagel 70.49
         Bagel 30.99
        
        ---------------------
        Total :              12.94
         Thank You for your order
        
         Total Discount:         1.27You are saving today from
        Plain Bagel 12 for 3.99Everything Bagel 6 for 2.49Coffee & Plain Bagel for 1.25`
        basket.addBagel('BGLO', 4)
        basket.addBagel('BGLP', 15)
        basket.addBagel('BGLE', 7)
        basket.addBagel('COF', 3)
        const result = basket.getTotal();
        const currentBasket = basket.getBasket();
        const newReceipt = new Receipt();

        const print = newReceipt.getReceipt(currentBasket, result);

        expect(print).toEqual(expected);
    });


})