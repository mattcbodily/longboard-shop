select oi.order_item_id, oi.order_id, oi.quantity, oi.custom_product, oi.order_item_price, o.user_id, o.paid, l.longboard_id, l.longboard_title, l.longboard_picture, l.price from order_item oi
join longboards l on oi.standard_product = l.longboard_id
join orders o on oi.order_id = o.order_id
where o.user_id = $1
and o.paid = false;