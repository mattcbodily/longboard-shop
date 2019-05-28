insert into order_item (
    order_id,
    product_id,
    quantity,
    order_item_price,
    custom_product
) values (
    $1,
    $2,
    $3,
    $4,
    false
);