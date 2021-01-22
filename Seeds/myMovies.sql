INSERT INTO "your_movie_list" ("title", "overview", "genre_id", "release_date", "disliked")
VALUES
(
    'Into the Wild', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non. Adipisci, pariatur. Molestiae, libero esse hic adipisci autem neque', '4', '02-02-2002', false
);

INSERT INTO "users" ("full_name", "password", "email")
VALUES (
    'Adminfirst Adminlast',
    -- 'password123',
    '$2a$04$Obb6yu1OjTsOqzjmJy8Xwe0oZ.7/wHrBAvaVA5qknnhXf6egk1fA.',
    'adminemail@gmail.com'
)