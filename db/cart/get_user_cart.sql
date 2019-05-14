select oi.order_item_id, oi.order_id, oi.quantity, oi.price, o.user_id, o.paid, l.longboard_id, l.longboard_title, l.longboard_picture, cl.custom_id from order_item oi
join longboards l on oi.standard_product = l.longboard_id
join custom_longboards cl on oi.custom_product = cl.custom_id
join orders o on oi.order_id = o.order_id
where oi.order_id = $1
and o.paid = false;