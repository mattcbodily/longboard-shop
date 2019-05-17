-- select * from users
-- where email = $1;

select * from users u
join orders o on u.user_id = o.user_id
where u.email = $1
and o.paid = false;
