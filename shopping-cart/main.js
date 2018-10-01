let numOfProducts = 5;
let numOfPromotions = 3;
let myVue = new Vue({
  el: "#app",
  data: {
    products: null,
    taxPercent: 10,
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
    ],
    promotionCode: ""
  },
  created: function () {
    this.products = generateRandomProducts(numOfProducts);
    this.promotions = generateRandomPromotions(numOfPromotions);
  },
  computed: {
    totalItems: function () {
      let totalItems = 0;
      for (let i = 0; i < this.products.length; i++) {
        const product = this.products[i];
        totalItems += product.quantity;
      }
      return totalItems;
    },
    subtotal: function () {
      let subtotal = 0;
      for (let i = 0; i < this.products.length; i++) {
        let product = this.products[i];
        if (product.quantity == "") {
          return 0;
        } else {
          subtotal += product.quantity * product.price;
        }
      }
      return subtotal;
    },
    tax: function () {
      return this.subtotal * this.taxPercent / 100;
    },
    total: function () {
      return this.subtotal + this.tax - this.totalPromotionDiscount;
    },
    promotionDiscount: function () {
      for (let i = 0; i < this.promotions.length; i++) {
        const promotion = this.promotions[i];
        if (promotion.code == this.promotionCode) {
          return promotion.discount;
        }
      }
      return 0;
    },
    totalPromotionDiscount: function () {
      return (this.subtotal + this.tax) * this.promotionDiscount / 100;
    }
  },
  methods: {
    removeProduct: function (index) {
      let product = this.products.splice(index, 1);
    },
    handleButtonClickEvent: function (event) {
      for (let i = 0; i < this.promotions.length; i++) {
        const promotion = this.promotions[i];
        if (promotion.code == this.promotionCode) {
          this.$refs["invalid-promotion-code"].style.display = "none";
          this.$refs["promotion-info"].style.display = "block";
          this.$refs["total-promotion-discount"].style.display = "block";
          return;
        }
      }
      this.$refs["invalid-promotion-code"].style.display = "block";
      this.$refs["promotion-info"].style.display = "none";
      this.$refs["total-promotion-discount"].style.display = "none";
    }
  }
});
function generateRandomProducts(numOfProducts) {
  let i;
  let products = [];
  for (i = 0; i < numOfProducts; i++) {
    let product = new Object();
    product.image = "https://via.placeholder.com/200x150";
    product.description = faker.commerce.productName();
    let descArr = product.description.split(" ");
    product.name = descArr[descArr.length - 1];
    product.price = faker.commerce.price(0, 100, 2);
    product.quantity = faker.random.number({ min: 1, max: 10 });
    products.push(product);
  }
  return products;
}
function generateRandomPromotions(numOfPromotions) {
  let i;
  let promotions = [];
  for (i = 0; i < numOfPromotions; i++) {
    let promotion = new Object();
    promotion.code = makeCode();
    promotion.discount = faker.random.number({ min: 1, max: 100 });
    promotions.push(promotion);
  }
  return promotions;
}
function makeCode() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
