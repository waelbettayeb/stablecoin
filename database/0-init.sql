CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `users` (`email`, `password`, `address`)
VALUES (
        'bettayebwael@gmail.com',
        'password123',
        '123 Test St'
    );