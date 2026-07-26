/**
 * Order/cart items store the chosen color as a plain string (e.g. "Maroon").
 * The product itself stores richer color data: [{ value, image }]. This finds
 * the matching swatch so the UI can show a small photo instead of just text.
 */
export function findColorSwatch(product, colorValue) {
  if (!product?.colors || !colorValue) return null;
  return product.colors.find((c) => c.value === colorValue) || null;
}

/**
 * Resolves the best image to show for a cart/order line item:
 * 1. The order's own saved `colorImage` snapshot (most accurate — survives
 *    the product's colors being edited/removed later)
 * 2. A live lookup against the product's current colors (cart items, or
 *    older orders placed before the snapshot was introduced)
 * 3. The product's main photo
 */
export function resolveItemImage(item, fileUrlFn) {
  if (item.colorImage) return fileUrlFn(item.colorImage);
  const liveSwatch = findColorSwatch(item.product, item.color);
  if (liveSwatch?.image) return fileUrlFn(liveSwatch.image);
  return fileUrlFn(item.product?.images?.[0]);
}
