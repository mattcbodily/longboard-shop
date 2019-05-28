select longboard_id, longboard_title, price, longboard_description from longboards
where custom = false
order by price desc;