BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) VALUES ('Nick', 'nick@gmail.com', 2, '2018-10-05');
INSERT INTO login (hash, email) VALUES ('$2a$10$urBS/W0noUxD5bgt2ENHV.HyB1FoH4ZB8OPeHTjaDp0HMSHFXYW7K', 'nick@gmail.com');

COMMIT;
