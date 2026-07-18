import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Products", "Categories", "Cart", "Wishlist", "Orders", "Me", "Addresses"],
  endpoints: (builder) => ({
    // ---------- Categories ----------
    getCategories: builder.query({
      query: () => "/api/categories",
      transformResponse: (res) => res.categories || [],
      providesTags: ["Categories"],
    }),

    // ---------- Products ----------
    getProducts: builder.query({
      // params: { search, category, page, limit }
      query: (params = {}) => {
        const search = new URLSearchParams(
          Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
        ).toString();
        return `/api/products${search ? `?${search}` : ""}`;
      },
      transformResponse: (res) => ({
        products: res.products || [],
        total: res.total,
        page: res.page,
        pages: res.pages,
      }),
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query: (id) => `/api/products/${id}`,
      transformResponse: (res) => res.product,
    }),

    // ---------- Auth ----------
    googleLogin: builder.mutation({
      query: (idToken) => ({
        url: "/api/auth/google",
        method: "POST",
        body: { idToken },
      }),
      invalidatesTags: ["Cart", "Wishlist", "Me", "Orders"],
    }),
    getMe: builder.query({
      query: () => "/api/auth/me",
      providesTags: ["Me"],
    }),

    // ---------- User profile ----------
    updateProfile: builder.mutation({
      query: (body) => ({
        url: "/api/users/me/update",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Me"],
    }),

    // ---------- Cart ----------
    getCart: builder.query({
      query: () => "/api/cart",
      transformResponse: (res) => res.cart,
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: (body) => ({ url: "/api/cart/add", method: "POST", body }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation({
      query: ({ itemId, quantity }) => ({
        url: `/api/cart/item/${itemId}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCartItem: builder.mutation({
      query: (itemId) => ({ url: `/api/cart/item/${itemId}`, method: "DELETE" }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({ url: "/api/cart", method: "DELETE" }),
      invalidatesTags: ["Cart"],
    }),

    // ---------- Wishlist ----------
    getWishlist: builder.query({
      query: () => "/api/wishlist",
      transformResponse: (res) => res.wishlist,
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation({
      query: (product) => ({
        url: "/api/wishlist/add",
        method: "POST",
        body: { product },
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/api/wishlist/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // ---------- Orders ----------
    placeOrder: builder.mutation({
      query: (body) => ({ url: "/api/orders", method: "POST", body }),
      invalidatesTags: ["Orders", "Cart"],
    }),
    getMyOrders: builder.query({
      query: () => "/api/orders/my",
      transformResponse: (res) => res.orders || [],
      providesTags: ["Orders"],
    }),

    // ---------- Addresses ----------
    getAddresses: builder.query({
      query: () => "/api/addresses",
      transformResponse: (res) => res.addresses || [],
      providesTags: ["Addresses"],
    }),
    addAddress: builder.mutation({
      query: (body) => ({ url: "/api/addresses", method: "POST", body }),
      invalidatesTags: ["Addresses"],
    }),
    updateAddress: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/api/addresses/${id}`, method: "PUT", body }),
      invalidatesTags: ["Addresses"],
    }),
    setDefaultAddress: builder.mutation({
      query: (id) => ({ url: `/api/addresses/${id}/default`, method: "PUT" }),
      invalidatesTags: ["Addresses"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({ url: `/api/addresses/${id}`, method: "DELETE" }),
      invalidatesTags: ["Addresses"],
    }),

    // ---------- Contact form ----------
    submitContactMessage: builder.mutation({
      query: (body) => ({ url: "/api/messages", method: "POST", body }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGoogleLoginMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetAddressesQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useSetDefaultAddressMutation,
  useDeleteAddressMutation,
  usePlaceOrderMutation,
  useGetMyOrdersQuery,
  useSubmitContactMessageMutation,
} = api;

export const fileUrl = (path) => {
  if (!path) return "";
  // Cloudinary (and any other absolute) URLs are used as-is; only old local
  // relative paths like "/uploads/..." get the backend origin prefixed.
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_BASE}${path}`;
};
