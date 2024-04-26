CREATE TABLE `users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `private_key` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `transactions` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `from` VARCHAR(255) NOT NULL,
    `to` VARCHAR(255) NOT NULL,
    `amount` DECIMAL(28, 18) NOT NULL,
    `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

INSERT INTO `users` (`email`, `password`, `private_key`)
VALUES (
        'bettayebwael@gmail.com',
        '$2b$10$A9Gl.1vvVwxqnXivywzlN.Zzp1o.Q6stGPUpQaKyG3tL8IyHiOGoS',
        '0xd1d2fdf57ca41ee67e985ed882aae04806ee91f576f1046b1f95a357755daad9'
    );