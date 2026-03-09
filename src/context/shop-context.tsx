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
import { useToast } from "@/components/ui/toast-provider";
import type {
  CartItem,
  Category,
  Locale,
  Order,
  PaymentMethod,
  Product,
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
  productsLoading: boolean;
  ordersLoading: boolean;
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
  isAuthenticated: boolean;
  authLoading: boolean;
  login: (
    identity: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  register: (input: {
    name: string;
    phone: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateProfile: (
    profile: UserProfile,
  ) => Promise<{ success: boolean; message?: string }>;
  checkout: (
    payload: CheckoutPayload,
  ) => Promise<{ orderId: string; nextPath: string } | null>;
  fetchOrderById: (id: string) => Promise<Order | null>;
  orderHistory: Order[];
  getOrderById: (id: string) => Order | undefined;
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: Category) => Product[];
  searchProducts: (keyword: string) => Product[];
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

export function ShopProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [locale, setLocale] = useState<Locale>("en");
  const [productsLoading, setProductsLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCartHydrated, setIsCartHydrated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  const fetchUserOrders = useCallback(async () => {
    setOrdersLoading(true);
    try {
      const response = await fetch("/api/v1/orders", {
        cache: "no-store",
      });

      const payload = (await response.json()) as {
        success?: boolean;
        data?: Order[];
      };

      if (response.ok && payload.success && Array.isArray(payload.data)) {
        setOrderHistory(payload.data);
      } else {
        setOrderHistory([]);
      }
    } catch {
      setOrderHistory([]);
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  const fetchUserCart = useCallback(async () => {
    try {
      const response = await fetch("/api/v1/cart", {
        cache: "no-store",
      });
      const payload = (await response.json()) as {
        success?: boolean;
        data?: CartItem[];
      };

      if (response.ok && payload.success && Array.isArray(payload.data)) {
        setCart(payload.data);
      } else {
        setCart([]);
      }
    } catch {
      setCart([]);
    } finally {
      setIsCartHydrated(true);
    }
  }, []);

  useEffect(() => {
    const cachedCart = localStorage.getItem(CART_STORAGE_KEY);
    const cachedLocale = localStorage.getItem(
      LOCALE_STORAGE_KEY,
    ) as Locale | null;

    if (cachedCart) {
      setCart(JSON.parse(cachedCart));
    }
    setIsCartHydrated(true);
    if (cachedLocale === "en" || cachedLocale === "th") {
      setLocale(cachedLocale);
      document.documentElement.lang = cachedLocale;
    }

    void fetch("/api/v1/auth/me", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then(
        (
          payload: {
            success?: boolean;
            data?: UserProfile & { id?: string };
          } | null,
        ) => {
          if (payload?.success && payload.data) {
            setProfile(payload.data);
            setAuthUserId(payload.data.id ?? null);
            setIsAuthenticated(true);
            setIsCartHydrated(false);
            void fetchUserCart();
            void fetchUserOrders();
          } else {
            setProfile(defaultProfile);
            setAuthUserId(null);
            setIsAuthenticated(false);
            setOrderHistory([]);
          }
        },
      )
      .catch(() => {
        setProfile(defaultProfile);
        setAuthUserId(null);
        setIsAuthenticated(false);
        setOrderHistory([]);
      })
      .finally(() => {
        setAuthLoading(false);
      });

    // Initial product load comes from backend API.
    setProductsLoading(true);
    void fetch("/api/v1/products", { cache: "no-store" })
      .then((response) => response.json())
      .then(
        (
          payload: {
            success?: boolean;
            data?: Product[];
          } | null,
        ) => {
          if (payload?.success && Array.isArray(payload.data)) {
            setProducts(payload.data);
          }
        },
      )
      .catch(() => {
        setProducts([]);
      })
      .finally(() => {
        setProductsLoading(false);
      });
  }, [fetchUserCart, fetchUserOrders]);

  useEffect(() => {
    if (!isCartHydrated) {
      return;
    }

    if (isAuthenticated && authUserId) {
      void fetch("/api/v1/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });
      return;
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [authUserId, cart, isAuthenticated, isCartHydrated]);

  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const login = useCallback(
    async (identity: string, password: string) => {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identity, password }),
      });

      const payload = (await response.json()) as {
        success?: boolean;
        data?: UserProfile & { id?: string };
        error?: {
          message?: string;
        };
      };

      if (!response.ok || !payload.success || !payload.data) {
        toast({
          title: "Login failed",
          description:
            payload.error?.message ?? "Please check your credentials.",
          variant: "error",
        });
        return {
          success: false,
          message: payload.error?.message ?? "Login failed",
        };
      }

      setProfile(payload.data);
      setAuthUserId(payload.data.id ?? null);
      setIsAuthenticated(true);
      setIsCartHydrated(false);
      await fetchUserCart();
      await fetchUserOrders();
      toast({
        title: "Logged in",
        variant: "success",
      });
      return { success: true };
    },
    [fetchUserCart, fetchUserOrders, toast],
  );

  const register = useCallback(
    async (input: {
      name: string;
      phone: string;
      email: string;
      password: string;
    }) => {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const payload = (await response.json()) as {
        success?: boolean;
        data?: UserProfile & { id?: string };
        error?: {
          message?: string;
        };
      };

      if (!response.ok || !payload.success || !payload.data) {
        toast({
          title: "Register failed",
          description: payload.error?.message ?? "Please review your details.",
          variant: "error",
        });
        return {
          success: false,
          message: payload.error?.message ?? "Register failed",
        };
      }

      setProfile(payload.data);
      setAuthUserId(payload.data.id ?? null);
      setIsAuthenticated(true);
      setIsCartHydrated(false);
      await fetchUserCart();
      await fetchUserOrders();
      toast({
        title: "Account created",
        variant: "success",
      });
      return { success: true };
    },
    [fetchUserCart, fetchUserOrders, toast],
  );

  const logout = useCallback(async () => {
    await fetch("/api/v1/auth/logout", {
      method: "POST",
    });
    setIsAuthenticated(false);
    setAuthUserId(null);
    setProfile(defaultProfile);
    setOrderHistory([]);
    setCart([]);
    setIsCartHydrated(true);
    toast({
      title: "Logged out",
      variant: "info",
    });
  }, [toast]);

  const updateProfile = useCallback(
    async (nextProfile: UserProfile) => {
      const response = await fetch("/api/v1/auth/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nextProfile),
      });

      const payload = (await response.json()) as {
        success?: boolean;
        data?: UserProfile;
        error?: {
          message?: string;
        };
      };

      if (!response.ok || !payload.success || !payload.data) {
        toast({
          title: "Profile update failed",
          description: payload.error?.message ?? "Please try again.",
          variant: "error",
        });
        return {
          success: false,
          message: payload.error?.message ?? "Cannot update profile",
        };
      }

      setProfile(payload.data);
      setIsAuthenticated(true);
      toast({
        title: "Profile saved",
        variant: "success",
      });
      return { success: true };
    },
    [toast],
  );

  const toggleLocale = useCallback(() => {
    setLocale((current) => (current === "en" ? "th" : "en"));
  }, []);

  const addToCart = useCallback(
    (productId: string, quantity = 1) => {
      const product = products.find((item) => item.id === productId);
      if (!product) {
        toast({
          title: "Product unavailable",
          variant: "error",
        });
        return;
      }

      let reachedStockLimit = false;

      setCart((current) => {
        const existing = current.find((item) => item.productId === productId);
        if (!existing) {
          const nextQty = Math.min(quantity, product.stockQty);
          reachedStockLimit = quantity > product.stockQty;
          return [...current, { productId, quantity: nextQty }];
        }

        const nextQty = Math.min(
          existing.quantity + quantity,
          product.stockQty,
        );
        reachedStockLimit = existing.quantity + quantity > product.stockQty;

        return current.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity: nextQty,
              }
            : item,
        );
      });

      toast({
        title: "Added to cart",
        description: reachedStockLimit
          ? "Quantity capped by available stock."
          : undefined,
        variant: "success",
      });
    },
    [products, toast],
  );

  const updateCartItem = useCallback(
    (productId: string, quantity: number) => {
      const product = products.find((item) => item.id === productId);
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
    },
    [products],
  );

  const removeCartItem = useCallback(
    (productId: string) => {
      const removedProduct = products.find((item) => item.id === productId);
      setCart((current) =>
        current.filter((item) => item.productId !== productId),
      );
      toast({
        title: "Item removed",
        description: removedProduct?.name,
        variant: "info",
      });
    },
    [products, toast],
  );

  const clearCart = useCallback(() => {
    setCart([]);
    toast({
      title: "Cart cleared",
      variant: "info",
    });
  }, [toast]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.productId);
      if (!product) {
        return sum;
      }
      return sum + product.price * item.quantity;
    }, 0);
  }, [cart, products]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const cartItemsDetailed = useMemo(() => {
    return cart.flatMap((item) => {
      const product = products.find((entry) => entry.id === item.productId);
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
  }, [cart, products]);

  const checkout = useCallback(
    async ({ address, phone, paymentMethod }: CheckoutPayload) => {
      if (!isAuthenticated) {
        toast({
          title: "Please login before checkout",
          variant: "error",
        });
        return null;
      }

      if (!cart.length) {
        toast({
          title: "Cart is empty",
          variant: "error",
        });
        return null;
      }

      const response = await fetch("/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          paymentMethod,
          contactPhone: phone,
          deliveryAddress: address,
        }),
      });

      const payload = (await response.json()) as {
        success: boolean;
        data?: Order;
      };

      if (!response.ok || !payload.success || !payload.data) {
        if (response.status === 401) {
          toast({
            title: "Session expired",
            description: "Please login again.",
            variant: "error",
          });
          return null;
        }
        toast({
          title: "Checkout failed",
          variant: "error",
        });
        return null;
      }

      const createdOrder = payload.data;

      setOrderHistory((current) => [createdOrder, ...current]);
      setProfile((current) => ({
        ...current,
        phone,
        address,
      }));
      await fetchUserOrders();
      setCart([]);
      toast({
        title: "Order placed",
        description: `Order ID: ${createdOrder.id}`,
        variant: "success",
      });

      // Refresh product stock after successful order placement.
      void fetch("/api/v1/products", { cache: "no-store" })
        .then((nextResponse) => nextResponse.json())
        .then(
          (
            nextPayload: {
              success?: boolean;
              data?: Product[];
            } | null,
          ) => {
            if (nextPayload?.success && Array.isArray(nextPayload.data)) {
              setProducts(nextPayload.data);
            }
          },
        )
        .catch(() => {
          // Keep current product snapshot when refresh fails.
        });

      return {
        orderId: createdOrder.id,
        nextPath:
          paymentMethod === "cod"
            ? `/order/${createdOrder.id}/confirmation`
            : `/payment/process?orderId=${createdOrder.id}&method=${paymentMethod}`,
      };
    },
    [cart, fetchUserOrders, isAuthenticated, toast],
  );

  const fetchOrderById = useCallback(async (id: string) => {
    const response = await fetch(`/api/v1/orders/${id}`, {
      cache: "no-store",
    });
    const payload = (await response.json()) as {
      success?: boolean;
      data?: Order;
    };

    if (!response.ok || !payload.success || !payload.data) {
      return null;
    }

    setOrderHistory((current) => {
      const filtered = current.filter((order) => order.id !== payload.data?.id);
      return [payload.data as Order, ...filtered];
    });

    return payload.data;
  }, []);

  const getOrderById = useCallback(
    (id: string) => {
      return orderHistory.find((order) => order.id === id);
    },
    [orderHistory],
  );

  const getProductById = useCallback(
    (id: string) => products.find((product) => product.id === id),
    [products],
  );

  const getProductsByCategory = useCallback(
    (category: Category) => {
      return products.filter((product) => product.category === category);
    },
    [products],
  );

  const searchProducts = useCallback(
    (keyword: string) => {
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
    },
    [products],
  );

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
      productsLoading,
      ordersLoading,
      cart,
      cartCount,
      subtotal,
      cartItemsDetailed,
      addToCart,
      updateCartItem,
      removeCartItem,
      clearCart,
      profile,
      isAuthenticated,
      authLoading,
      login,
      register,
      logout,
      updateProfile,
      checkout,
      fetchOrderById,
      orderHistory,
      getOrderById,
      products,
      getProductById,
      getProductsByCategory,
      searchProducts,
      pathname,
      navigate,
    }),
    [
      addToCart,
      authLoading,
      cart,
      cartCount,
      cartItemsDetailed,
      checkout,
      fetchOrderById,
      getOrderById,
      getProductById,
      getProductsByCategory,
      isAuthenticated,
      locale,
      login,
      logout,
      orderHistory,
      pathname,
      products,
      profile,
      removeCartItem,
      register,
      searchProducts,
      subtotal,
      toggleLocale,
      productsLoading,
      ordersLoading,
      updateProfile,
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
