const ROOTS = {
  AUTH: "/auth",
  DASHBOARD: "/admin",
};
// ----------------------------------------------------------------------
export const paths = {
  product: {
    search: `/products`,
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id) => `/product/${id}`,
  },
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
      forgotPassword: `${ROOTS.AUTH}/jwt/forgot-password`,
      verify: `${ROOTS.AUTH}/jwt/verify`,
      resetPassword: `${ROOTS.AUTH}/jwt/reset-password`,
      otpVerify: `${ROOTS.AUTH}/jwt/otp-verify`,
    },
  },
  dashboard: {
    root: `${ROOTS.DASHBOARD}/dashboard`,
    new: {
      product: `${ROOTS.DASHBOARD}/new/product`,
      category: `${ROOTS.DASHBOARD}/new/category`,
      brand: `${ROOTS.DASHBOARD}/new/brand`,
      specification: `${ROOTS.DASHBOARD}/new/specification`,
      color: `${ROOTS.DASHBOARD}/new/color`,
      memory: `${ROOTS.DASHBOARD}/new/memory`,
    },
    edit: {
      product: (id) => `${ROOTS.DASHBOARD}/product/${id}`,
      category: (id) => `${ROOTS.DASHBOARD}/category/${id}`,
      brand: (id) => `${ROOTS.DASHBOARD}/brand/${id}`,
      user: (id) => `${ROOTS.DASHBOARD}/user/${id}`,
      order: (id) => `${ROOTS.DASHBOARD}/order/${id}`,
      specification: (id) => `${ROOTS.DASHBOARD}/specification/${id}`,
      color: (id) => `${ROOTS.DASHBOARD}/color/${id}`,
      memory: (id) => `${ROOTS.DASHBOARD}/memory/${id}`,
    },
    list: {
      product: `${ROOTS.DASHBOARD}/products`,
      category: `${ROOTS.DASHBOARD}/categories`,
      brand: `${ROOTS.DASHBOARD}/brands`,
      user: `${ROOTS.DASHBOARD}/users`,
      order: `${ROOTS.DASHBOARD}/orders`,
      specification: `${ROOTS.DASHBOARD}/specifications`,
      color: `${ROOTS.DASHBOARD}/colors`,
      memory: `${ROOTS.DASHBOARD}/memories`,
    }
  },
  user: {
    account: '/account',
    edit: '/password/update',
    update: '/me/update',
    orders: '/orders',
    confirmorder: '/order/confirm',
    success: '/success',
    cart: '/cart',
  }
};
