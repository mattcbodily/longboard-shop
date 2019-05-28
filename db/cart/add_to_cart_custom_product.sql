with custom_board as (
    insert into longboards(longboard_title, longboard_design, longboard_grip, longboard_trucks, longboard_wheels, price, custom, graphic)
    values('Custom Board', $1, $2, $3, $4, $5, true, $6)
    returning longboard_id as longboard_id,
    price as price
)
insert into order_item(order_id, product_id, quantity, order_item_price, custom_product)
select $7, longboard_id, 1, price, true from custom_board;