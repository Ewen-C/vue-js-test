const app = Vue.createApp({
    data: function() {
        return {
            cart : [],
            premium: true
        }
    },
    methods: {
        AddCart(id) {
            this.cart.push(id);
        },
        RemoveCart(id) {
            this.cart.splice( this.cart.indexOf(id), 1);
        }
    }

})