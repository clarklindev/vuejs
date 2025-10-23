export default{
    addProductToCart(state, payload) {
      const productInCartIndex = state.cartItems.findIndex(
        (ci) => ci.productId === payload.id
      );

      if (productInCartIndex >= 0) {
        state.cartItems[productInCartIndex].qty++;
      } else {
        const newItem = {
          productId: payload.id,
          title: payload.title,
          image: payload.image,
          price: payload.price,
          qty: 1,
        };
        state.cartItems.push(newItem);
      }
      state.total += payload.price;
    },

    removeProductFromCart(state, prodId) {
      const productInCartIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.productId === prodId
      );
      const prodData = state.cartItems[productInCartIndex];
      state.cartItems.splice(productInCartIndex, 1);
      state.total -= prodData.price * prodData.qty;
    },
}