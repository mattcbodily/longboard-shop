-- this sql command updates the current orders paid column to true, 
-- and then creates a new order with paid set to false for the customer
-- so that the customer will always have an open cart

update orders
set paid = true
where order_id = $1;

insert into orders (
    user_id,
    paid
) values (
    $2,
    false
);