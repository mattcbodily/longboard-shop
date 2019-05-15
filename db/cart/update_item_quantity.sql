update order_item
set (quantity, order_item_price) = ($1, $2)
where order_item_id = $3;