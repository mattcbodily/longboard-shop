select l.longboard_id, l.longboard_title, l.longboard_picture, l.price, l.longboard_description from longboards l
join board_design d on l.longboard_design = d.id
where d.part_name = $1
and custom = false
order by l.price desc;