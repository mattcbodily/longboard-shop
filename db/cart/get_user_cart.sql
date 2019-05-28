select oi.order_item_id, oi.order_id, oi.quantity, oi.product_id, oi.custom_product, oi.order_item_price, o.user_id, o.paid, l.longboard_id, l.longboard_title, l.longboard_picture, l.price from order_item oi
join longboards l on oi.product_id = l.longboard_id
join orders o on oi.order_id = o.order_id
where o.user_id = $1
and o.paid = false
order by oi.order_item_id;