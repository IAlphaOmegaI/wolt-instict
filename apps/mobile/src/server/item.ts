import items from "@/assets/stubs/items.json";

export const list = () => {
  return items;
};

export type Type = (typeof items)[number];

/**
 * Format food items for AI prompt
 */
export const promptify = (items: Type[]): string => {
  const list = items
    .map(
      (item) =>
        `- itemId: ${item.id} | ${item.name} | ${item.description} | €${
          item.price
        } | Category: ${item.category} | Tags: ${item.tags.join(
          ", "
        )} | Restaurant: ${item.restaurantName}`
    )
    .join("\n");

  const valid = items.map((item) => item.id).join(", ");
  const example = items
    .slice(0, 5)
    .map((item) => item.id)
    .join(", ");

  return `
      ## Available Food Items (SELECT itemIds FROM THIS LIST ONLY):

      VALID itemIds format examples: ${example}
      ALL valid itemIds: ${valid}
      LIST: ${list}

      IMPORTANT: You MUST use the exact itemId strings from the list above (e.g., "item_001", "item_002"). Do NOT create new itemIds.
      `;
};

type Get = {
  (input: string): Type;
  (input: string[]): Type[];
};
export const get = ((input) => {
  const all = list();

  const isArray = Array.isArray(input);
  const ids = isArray ? input : [input];

  const selected = ids.map((id) => {
    const item = all.find((item) => item.id === id);
    if (!item) throw new Error(`Item with id ${id} not found`);

    return item;
  });

  return isArray ? selected : selected[0]!;
}) as Get;
