let numOfProducts = 10;
let numOfPromotions = 3;
new Vue({
  el: "#app",
  data: {
    products: [
      {
        image: "https://via.placeholder.com/200x150",
        name: "PRODUCT ITEM NUMBER 1",
        description: "Description for product item number 1",
        price: 5.99,
        quantity: 2
      },
      {
        image: "https://via.placeholder.com/200x150",
        name: "PRODUCT ITEM NUMBER 2",
        description: "Description for product item number 1",
        price: 9.99,
        quantity: 1
      }
    ],
    tax: 5,
    promotions: [
      {
        code: "29xgbuHa4O",
        discount: "50%"
      },
      {
        code: "mUxSnhywT1",
        discount: "40%"
      },
      {
        code: "nDdViZL4l3",
        discount: "30%"
      }
    ]
  },
  created: {
    this.products = generateRandomProducts(numOfProducts);
    this.promotions = generateRandomPromotions(numOfPromotions);
  },
  methods: {}
});
function generateRandomProducts(numOfProducts){
    let i;
    let products = [];
    for(i=0;i<numOfProducts;i++){
        let product = new Object();
        product.image = "https://via.placeholder.com/200x150";
        product.name = faker.commerce.productName();
        product.description = faker.commerce.product();
        product.price = faker.commerce.price();
}
