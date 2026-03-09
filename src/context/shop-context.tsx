"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { findProductById, products } from "@/data/products";
import type {
  CartItem,
  Category,
  Locale,
  Order,
  PaymentMethod,
  UserProfile,
} from "@/types/domain";

interface CheckoutPayload {
  address: UserProfile["address"];
  phone: string;
  paymentMethod: PaymentMethod;
}

interface ShopContextValue {
  locale: Locale;
  toggleLocale: () => void;
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  cartItemsDetailed: Array<{
    item: CartItem;
    productName: string;
    productImage: string;
    unitPrice: number;
    lineTotal: number;
    maxQty: number;
  }>;
  addToCart: (productId: string, quantity?: number) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  removeCartItem: (productId: string) => void;
  clearCart: () => void;
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
  checkout: (payload: CheckoutPayload) => string | null;
  orderHistory: Order[];
  getOrderById: (id: string) => Order | undefined;
  getProductsByCategory: (category: Category) => typeof products;
  searchProducts: (keyword: string) => typeof products;
  pathname: string;
  navigate: (path: string) => void;
}

const defaultProfile: UserProfile = {
  name: "Narin S.",
  phone: "0891234567",
  email: "narin@example.com",
  address: {
    line1: "88 Rama IX Road",
    district: "Huai Khwang",
    province: "Bangkok",
    postalCode: "10310",
  },
  paymentMethods: ["credit-card", "qr-code", "cod"],
};

const ShopContext = createContext<ShopContextValue | null>(null);

const CART_STORAGE_KEY = "electric-shop-cart";
const LOCALE_STORAGE_KEY = "electric-shop-locale";
const PROFILE_STORAGE_KEY = "electric-shop-profile";
const ORDERS_STORAGE_KEY = "electric-shop-orders";

export function ShopProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const cachedCart = localStorage.getItem(CART_STORAGE_KEY);
    const cachedLocale = localStorage.getItem(
      LOCALE_STORAGE_KEY,
    ) as Locale | null;
    const cachedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    const cachedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);

    if (cachedCart) {
      setCart(JSON.parse(cachedCart));
    }
    if (cachedLocale === "en" || cachedLocale === "th") {
      setLocale(cachedLocale);
      document.documentElement.lang = cachedLocale;
    }
    if (cachedProfile) {
      setProfile(JSON.parse(cachedProfile));
    }
    if (cachedOrders) {
      setOrderHistory(JSON.parse(cachedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orderHistory));
  }, [orderHistory]);

  const toggleLocale = useCallback(() => {
    setLocale((current) => (current === "en" ? "th" : "en"));
  }, []);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    const product = findProductById(productId);
    if (!product) {
      return;
    }

    setCart((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (!existing) {
        return [
          ...current,
          { productId, quantity: Math.min(quantity, product.stockQty) },
        ];
      }

      return current.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: Math.min(item.quantity + quantity, product.stockQty),
            }
          : item,
      );
    });
  }, []);

  const updateCartItem = useCallback((productId: string, quantity: number) => {
    const product = findProductById(productId);
    if (!product) {
      return;
    }

    if (quantity <= 0) {
      setCart((current) =>
        current.filter((item) => item.productId !== productId),
      );
      return;
    }

    setCart((current) =>
      current.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: Math.min(quantity, product.stockQty),
            }
          : item,
      ),
    );
  }, []);

  const removeCartItem = useCallback((productId: string) => {
    setCart((current) =>
      current.filter((item) => item.productId !== productId),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const product = findProductById(item.productId);
      if (!product) {
        return sum;
      }
      return sum + product.price * item.quantity;
    }, 0);
  }, [cart]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const cartItemsDetailed = useMemo(() => {
    return cart.flatMap((item) => {
      const product = findProductById(item.productId);
      if (!product) {
        return [];
      }

      return [
        {
          item,
          productName: product.name,
          productImage: product.image,
          unitPrice: product.price,
          lineTotal: item.quantity * product.price,
          maxQty: product.stockQty,
        },
      ];
    });
  }, [cart]);

  const checkout = useCallback(
    ({ address, phone, paymentMethod }: CheckoutPayload) => {
      if (!cart.length) {
        return null;
      }

      const newOrderId = `ES-${Date.now()}`;
      const paymentStatus = paymentMethod === "cod" ? "pending" : "success";

      const order: Order = {
        id: newOrderId,
        items: cart.map((item) => {
          const product = findProductById(item.productId);
          return {
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: product?.price ?? 0,
          };
        }),
        totalAmount: subtotal,
        paymentMethod,
        paymentStatus,
        deliveryAddress: address,
        orderStatus: paymentMethod === "cod" ? "pending" : "paid",
        createdAt: new Date().toISOString(),
      };

      setOrderHistory((current) => [order, ...current]);
      setProfile((current) => ({
        ...current,
        phone,
        address,
      }));
      clearCart();

      return newOrderId;
    },
    [cart, clearCart, subtotal],
  );

  const getOrderById = useCallback(
    (id: string) => {
      return orderHistory.find((order) => order.id === id);
    },
    [orderHistory],
  );

  const getProductsByCategory = useCallback((category: Category) => {
    return products.filter((product) => product.category === category);
  }, []);

  const searchProducts = useCallback((keyword: string) => {
    const normalized = keyword.trim().toLowerCase();
    if (!normalized) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalized) ||
        product.description.toLowerCase().includes(normalized)
      );
    });
  }, []);

  const navigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );

  const value = useMemo<ShopContextValue>(
    () => ({
      locale,
      toggleLocale,
      cart,
      cartCount,
      subtotal,
      cartItemsDetailed,
      addToCart,
      updateCartItem,
      removeCartItem,
      clearCart,
      profile,
      updateProfile: setProfile,
      checkout,
      orderHistory,
      getOrderById,
      getProductsByCategory,
      searchProducts,
      pathname,
      navigate,
    }),
    [
      addToCart,
      cart,
      cartCount,
      cartItemsDetailed,
      checkout,
      getOrderById,
      getProductsByCategory,
      locale,
      orderHistory,
      pathname,
      profile,
      removeCartItem,
      searchProducts,
      subtotal,
      toggleLocale,
      updateCartItem,
      clearCart,
      navigate,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used within ShopProvider");
  }

  return context;
};
