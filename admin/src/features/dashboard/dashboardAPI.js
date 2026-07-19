import { supabase } from "../../services/supabaseAdmin";

// ==============================
// Dashboard Statistics
// ==============================
export const getDashboardStats = async () => {
  const [
    { count: productsCount, error: productError },
    { count: categoriesCount, error: categoryError },
    { count: ordersCount, error: orderError },
    { count: customersCount, error: customerError },
    { data: revenueData, error: revenueError },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),

    supabase.from("categories").select("*", { count: "exact", head: true }),

    supabase.from("orders").select("*", { count: "exact", head: true }),

    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "customer"),

    supabase.from("orders").select("total_amount"),
  ]);
  

  if (productError) throw productError;
  if (categoryError) throw categoryError;
  if (orderError) throw orderError;
  if (customerError) throw customerError;
  if (revenueError) throw revenueError;

  const revenue =
    revenueData?.reduce(
      (total, order) => total + Number(order.total_amount),
      0,
    ) || 0;

  return {
    products: productsCount || 0,
    categories: categoriesCount || 0,
    orders: ordersCount || 0,
    customers: customersCount || 0,
    revenue,
  };
};

// ==============================
// Recent Orders
// ==============================

export const getRecentOrders = async () => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      total_amount,
      payment_status,
      order_status,
      created_at,
      profiles (
        fullName,
        email
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) throw error;

  return data;
};
