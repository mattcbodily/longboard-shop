with custom_board as (
    insert into custom_longboards(longboard_design, longboard_grip, longboard_trucks, longboard_wheels, longboard_graphic, price)
    values($1, $2, $3, $4, $5, $6)
    returning custom_id as custom_id,
    price as price
)
insert into order_item(order_id, custom_product, quantity, order_item_price)
select $7, custom_id, 1, price from custom_board;