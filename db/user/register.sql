insert into users (
    email,
    password,
    mailing_address,
    city,
    state,
    zip_code
) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
)
returning *;