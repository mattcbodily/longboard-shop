select longboard_id, longboard_title, longboard_picture, price, longboard_description from longboards
where custom = false
order by price desc;