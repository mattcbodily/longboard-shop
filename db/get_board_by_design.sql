select l.longboard_id, l.longboard_title, l.price, l.longboard_description from longboards l
join board_design d on l.longboard_design = d.design_id
where d.design_name = $1;