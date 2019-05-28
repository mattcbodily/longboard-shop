insert into users (
    email,
    password
) values (
    $1,
    $2
)
returning *;