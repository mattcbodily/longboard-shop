select oi.order_item_id, oi.order_id, oi.quantity, oi.custom_product, oi.order_item_price, o.user_id, o.paid, o.date, cl.custom_id, cl.price from order_item oi
join custom_longboards cl on oi.custom_product = cl.custom_id
join orders o on oi.order_id = o.order_id
where o.user_id = $1
and o.paid = true
order by date;