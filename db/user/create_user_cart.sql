insert into orders (
    user_id,
    paid
) values (
    $1,
    false
)
returning order_id, paid;