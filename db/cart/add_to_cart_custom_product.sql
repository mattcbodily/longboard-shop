insert into order_item (
    order_id,
    custom_product,
    quantity,
    order_item_price
) values (
    $1,
    $2,
    $3,
    $4
);