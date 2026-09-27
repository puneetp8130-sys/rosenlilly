// ==========================================
// AUTH / CURRENT USER
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

export const setCurrentUser = (user) => {
  try {
    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    window.dispatchEvent(
      new Event("authChange")
    );

    window.dispatchEvent(
      new Event("userChange")
    );

    return true;
  } catch (error) {
    console.error("Error saving currentUser:", error);
    return false;
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
// USERS COLLECTION
// ==========================================

export const getUsers = () => {
  try {
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    return Array.isArray(users) ? users : [];
  } catch (error) {
    console.error("Error reading users:", error);
    return [];
  }
};

export const saveUsers = (users) => {
  try {
    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    return true;
  } catch (error) {
    console.error("Error saving users:", error);
    return false;
  }
};

// ==========================================
// CART
// ==========================================

export const getCartKey = (customUserId) => {
  const userId = customUserId || getUserKey();

  return userId ? `cart_${userId}` : null;
};

export const getUserCart = () => {
  const key = getCartKey();

  if (!key) {
    return [];
  }

  try {
    const cart = JSON.parse(
      localStorage.getItem(key) || "[]"
    );

    return Array.isArray(cart) ? cart : [];
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

export const clearUserCart = () => {
  const key = getCartKey();

  if (!key) {
    return false;
  }

  localStorage.removeItem(key);

  window.dispatchEvent(
    new Event("cartChange")
  );

  return true;
};

// ==========================================
// WISHLIST
// ==========================================

export const getWishlistKey = (customUserId) => {
  const userId = customUserId || getUserKey();

  return userId ? `wishlist_${userId}` : null;
};

export const getUserWishlist = () => {
  const key = getWishlistKey();

  if (!key) {
    return [];
  }

  try {
    const wishlist = JSON.parse(
      localStorage.getItem(key) || "[]"
    );

    return Array.isArray(wishlist) ? wishlist : [];
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
// ORDERS
// ==========================================

export const getOrders = () => {
  try {
    const orders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    return Array.isArray(orders) ? orders : [];
  } catch (error) {
    console.error("Error reading orders:", error);
    return [];
  }
};

export const saveOrders = (orders) => {
  try {
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    window.dispatchEvent(
      new Event("ordersChange")
    );

    return true;
  } catch (error) {
    console.error("Error saving orders:", error);
    return false;
  }
};

export const getUserOrders = (userId) => {
  const targetUserId = userId ?? getCurrentUser()?.id;

  if (!targetUserId) {
    return [];
  }

  const orders = getOrders();

  return orders.filter(
    (order) => String(order.userId) === String(targetUserId)
  );
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
