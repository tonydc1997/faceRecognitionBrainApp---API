BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined) VALUES ('Nick', 'nick@gmail.com', 2, '2018-10-05');

COMMIT;
