drop database store;
CREATE DATABASE `store` CHARACTER SET utf8 COLLATE utf8_general_ci;
use store;
insert into categories (title, eng_title) values
("ремни","belts"), ("хорошая обувь","shoes"), ("головные уборы","hats"), ("погоны","shoulder straps");

insert into items (price, description, category_id, manufacturer, name, photo) values 
(650, "голубая полоса, размеры 34-42", 1, "Россия", "тельняшка детская", "1.png"),
(4700, "хромовая кожа, уставные", 2, "Россия", "ботинки берцы", "1.png"),
(1200, "бесшовный 100% шерсть", 3, "Россия", "берет черный", "1.png"),
(150, "светло-голубые", 4, "Россия", "погоны МЧС", "1.png");