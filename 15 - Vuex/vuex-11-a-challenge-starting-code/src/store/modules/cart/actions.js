export default{
    // here we use context.rootGetters to access other getters
    addToCart(context, payload){
        const prodId = payload.id;
        const products = context.rootGetters['product/products'];
        const product = products.find(prod=> prod.id === prodId);
        context.commit('addProductToCart', product);
    },
    removeFromCart(context, payload){
        context.commit('removeProductFromCart', payload);
    }
}