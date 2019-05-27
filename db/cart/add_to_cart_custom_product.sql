insert into order_item (
    order_id,
    longboard_design,
    -- longboard_size
    longboard_grip,
    longboard_trucks,
    longboard_wheels,
    longboard_graphic,
    price
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
);