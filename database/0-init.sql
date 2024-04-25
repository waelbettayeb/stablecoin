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
        '$2b$10$A9Gl.1vvVwxqnXivywzlN.Zzp1o.Q6stGPUpQaKyG3tL8IyHiOGoS',
        '0x0AFfB0a96FBefAa97dCe488DfD97512346cf3Ab8'
    );