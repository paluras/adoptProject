                                      Table "public.animals"

Column | Type | Collation | Nullable | Default
-------------+------------------------+-----------+----------+-------------------------------------
id | integer | | not null | nextval('animals_id_seq'::regclass)
name | character varying(255) | | |
species | character varying(255) | | |
age | integer | | |
breed | character varying(255) | | |
status | character varying(255) | | |
image_url | text[] | | |
sex | character varying(255) | | |
description | text | | |
user_id | integer | | |
Indexes:
"animals_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
"animals_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
TABLE "medical_history" CONSTRAINT "medical_history_animal_id_fkey" FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE

                                        Table "public.medical_history"

Column | Type | Collation | Nullable | Default
------------+-----------------------------+-----------+----------+---------------------------------------------
id | integer | | not null | nextval('medical_history_id_seq'::regclass)
animal_id | integer | | |
dewormings | text | | |
treatments | text | | |
notes | text | | |
created_at | timestamp without time zone | | | CURRENT_TIMESTAMP
vaccines | text | | |
Indexes:
"medical_history_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
"medical_history_animal_id_fkey" FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE

                                        Table "public.users"

Column | Type | Collation | Nullable | Default
------------+-----------------------------+-----------+----------+-----------------------------------
id | integer | | not null | nextval('users_id_seq'::regclass)
username | character varying(100) | | not null |
password | character varying(255) | | not null |
created_at | timestamp without time zone | | | CURRENT_TIMESTAMP
is_admin | boolean | | | false
Indexes:
"users_pkey" PRIMARY KEY, btree (id)
"users_username_key" UNIQUE CONSTRAINT, btree (username)
Referenced by:
TABLE "animals" CONSTRAINT "animals_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
