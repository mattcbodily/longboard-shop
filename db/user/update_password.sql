update users
set password = $1
where user_id = $2;