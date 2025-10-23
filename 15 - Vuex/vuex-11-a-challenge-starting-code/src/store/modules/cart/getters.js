export default{
    cartItems(state){
        return state.cartItems
    },
    total(state){
        return state.total.toFixed(2);
    },
    qty(state){
        return state.cartItems.reduce((sum, item) => sum + item.qty, 0);
    }
}