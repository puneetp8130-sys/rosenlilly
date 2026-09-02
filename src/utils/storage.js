// ==========================================
// AUTH
// ==========================================

export const getCurrentUser = () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("currentUser")
    );

    return user || null;
  } catch (error) {
    console.error("Error reading currentUser:", error);
    return null;
  }
};


// ==========================================
// USER KEY
// ==========================================

const getUserKey = () => {
  const user = getCurrentUser();

  if (!user?.id) {
    return null;
  }

  return user.id;
};


// ==========================================
// CART
// ==========================================

export const getCartKey = () => {
  const userId = getUserKey();

  return userId ? `cart_${userId}` : null;
};


export const getUserCart = () => {
  const key = getCartKey();

  if (!key) {
    return [];
  }

  try {
    return JSON.parse(
      localStorage.getItem(key) || "[]"
    );
  } catch (error) {
    console.error("Error reading cart:", error);
    return [];
  }
};


export const saveUserCart = (cart) => {
  const key = getCartKey();

  if (!key) {
    return false;
  }

  localStorage.setItem(
    key,
    JSON.stringify(cart)
  );

  window.dispatchEvent(
    new Event("cartChange")
  );

  return true;
};


// ==========================================
// WISHLIST
// ==========================================

export const getWishlistKey = () => {
  const userId = getUserKey();

  return userId ? `wishlist_${userId}` : null;
};


export const getUserWishlist = () => {
  const key = getWishlistKey();

  if (!key) {
    return [];
  }

  try {
    return JSON.parse(
      localStorage.getItem(key) || "[]"
    );
  } catch (error) {
    console.error(
      "Error reading wishlist:",
      error
    );

    return [];
  }
};


export const saveUserWishlist = (wishlist) => {
  const key = getWishlistKey();

  if (!key) {
    return false;
  }

  localStorage.setItem(
    key,
    JSON.stringify(wishlist)
  );

  window.dispatchEvent(
    new Event("wishlistChange")
  );

  return true;
};


// ==========================================
// LOGOUT
// ==========================================

export const logoutUser = () => {
  localStorage.removeItem("currentUser");

  window.dispatchEvent(
    new Event("authChange")
  );

  window.dispatchEvent(
    new Event("cartChange")
  );

  window.dispatchEvent(
    new Event("wishlistChange")
  );
};