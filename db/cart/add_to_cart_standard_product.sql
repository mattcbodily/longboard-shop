insert into order_item (
    order_id,
    standard_product,
    quantity,
    order_item_price
) values (
    $1,
    $2,
    $3,
    $4
);