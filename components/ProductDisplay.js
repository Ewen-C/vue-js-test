app.component('product-display', {
    props: {
        premium: {
            type: Boolean, required: true // Prop Validation
        },
        cart: {
            type: Array, required: true 
            // cart is a prop and is changed through emit functions
        }
    },
    template:
    /*html*/
    `
  <div class="product-display">
    <div class="product-container">

      <div class="product-image">
        <img 
          v-bind:src="image" 
          :class=" { 'out-of-stock-img': quantity == 0 } " 
        > 
        <!-- v-bind directive : link the attribute image to the data inside the .js file -> {{image}} -->

        <!-- the out-of-stock-img class is inside quotes because the dashes would be traited as minus signs otherwise -->
        <!-- the out-of-stock-img class activation is dependant to the condition following it -->
      </div>

      <div class="product-info">      
        <h1> {{title}} </h1> <!-- Reference to the product data in the .js file, the code inside the braces is in .js file -->

        <p v-if="quantity > 4">In Stock ({{quantity}})</p>
        <p v-else-if="quantity <= 4 && quantity > 0">Almost sold out ! ({{quantity}})</p>
        <p v-else>Out of Stock ({{quantity}})</p>

        <p>Shipping : {{shipping}} </p>

        <button 
          class="button" 
          :class=" { disabledButton: quantity == 0 } "
          :disabled="quantity == 0"
          v-on:click="addToCart()">
          Add to Cart
        </button>
        
        
        <button 
          class="button" 
          :class=" { disabledButton: startQuantity == quantity } "
          :disabled="startQuantity == quantity"
          v-on:click="removeFromCart()">
          Remove from Cart
        </button>
        

        <p v-if="onSale == true">This product is on sale !</p>

        <p>Composition :</p>
        <ul>
          <li v-for="detail in details"> {{detail}} </li> <!-- Iteration over the elements of the details collection -->
        </ul>
        
        <p>Variants :</p>
        <div 
          v-for="(variant, index) in variants" 
          :key="variant.id" 
          v-on:mouseover="updateVariant(index)"
          class="color-circle"
          :style=" {backgroundColor: variant.color}">
        </div>
        <!-- shorthand for ' v-bind:element ' -> ' :element ' -->

      </div>

    </div>

    <review-list :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>
  `,
  data: function() {
    return {
        product : 'Socks',
        brand : 'Vue Mastery',
        selectedVariant: 0,

        details : ['50% cotton', '30% wool', '20% polyester'],
        variants : [
            { id:2234, color: 'green', image: './assets/images/socks_green.jpg', startQuantity: 10, quantity: 10, onSale: false },
            { id:2235, color: 'blue', image: './assets/images/socks_blue.jpg', startQuantity: 1, quantity: 1, onSale: true }
        ],

        reviews: [],
    }
  },
  methods: {
    addToCart() {
        //this.cart ++;
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        this.variants[this.selectedVariant].quantity --;
    },
    removeFromCart() {
        console.log("Retirer " + this.variants[this.selectedVariant].id + " à " + this.cart.indexOf(this.variants[this.selectedVariant].id))
        if(this.cart.indexOf(this.variants[this.selectedVariant].id) != -1) {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
            this.variants[this.selectedVariant].quantity ++;
        }
    },
    updateVariant(index) {
        this.selectedVariant = index;
    },
    addReview(review) {
        this.reviews.push(review)
    }
  },
  computed: {
    title() {
        return this.brand + ' ' + this.product + ' ' + 
        this.variants[this.selectedVariant].color + ' (n° ' + 
        this.variants[this.selectedVariant].id + ')' ;
    },
    image() {
        return this.variants[this.selectedVariant].image
    },
    startQuantity() {
        return this.variants[this.selectedVariant].startQuantity
    },
    quantity() {
        return this.variants[this.selectedVariant].quantity
    },
    onSale() {
        return this.variants[this.selectedVariant].onSale
    },
    shipping() {
        if(this.premium) {
            return 'Free'
        }
        return 2.99
    }

  }
})