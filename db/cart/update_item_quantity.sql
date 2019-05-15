update order_item
set quantity = $1
where order_item_id = $2;