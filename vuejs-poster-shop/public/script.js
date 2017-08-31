var PRICE = 9.99;
var LOAD_NUM = 10;

new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        results: [],
        cart: [],
        search: 'anime',
        lastSearch: '',
        loading: false,
        price: PRICE
    },
    computed: {
        noMoreItems: function() {
            return !this.loading && this.items.length === this.results.length;
        }
    },
    methods: {
        addItem: function(index) {
            item = this.items[index];
            this.total += PRICE;
            var found = false;
            for (var i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === item.id) {
                    this.cart[i].qty++;
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    price: PRICE,
                    qty: 1
                });
            }
        },
        increment: function(index) {
            var item = this.cart[index];
            item.qty++;
            this.total += item.price;
        },
        decrement: function(index) {
            var item = this.cart[index];
            item.qty--;
            this.total -= item.price;
            if (item.qty <= 0) {
                this.cart.splice(index, 1);
            }
        },
        onSubmit: function() {
            if (this.search.length) {
                this.loading = true;
                this.items = [];
                this.$http
                .get('/search/'.concat(this.search))
                .then(function(res) {
                    this.lastSearch = this.search;
                    this.results = res.data;
                    this.appendItems();
                    this.loading = false;
                });    
            }
        },
        appendItems: function() {
            if (this.items.length < this.results.length) {
                var append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
                this.items = this.items.concat(append);
            }
        }
    },
    filters: {
        currency: function(price) {
            return '$'.concat(price.toFixed(2));
        }
    },
    mounted: function() {
        this.onSubmit();
        
        var vueInstance = this;
        var elem = document.getElementById('product-list-bottom');
        var watcher = scrollMonitor.create(elem);
        watcher.enterViewport(function() {
            vueInstance.appendItems();
        });
    }
});