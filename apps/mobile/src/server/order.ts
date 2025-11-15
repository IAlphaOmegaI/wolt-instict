import * as Item from "./item";

/**
 * Get user's past orders from database
 */
export const getPastOrders = (id: string) => {
  const items = Item.list();

  const start = Math.random() * items.length;
  const recent = items.slice(start, start + 3);

  return recent;
};
