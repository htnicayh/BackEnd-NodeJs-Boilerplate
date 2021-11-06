DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `token` (
	`id_token` int NOT NULL AUTO_INCREMENT,
    `refresh_token` varchar(255) NOT NULL,
    PRIMARY KEY (`id_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `name` nvarchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `birth` varchar(255) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `image` varchar(500) NOT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT FOREIGN KEY (`userId`) REFERENCES `account` (`id`)
);

INSERT INTO `account` (`username`, `password`, `email`, `role`) VALUES ('hyacinth', '$12$rq5lTc6TlbBGt9bZvzN2me8ubHMExnA2g7mAZwfDImMpCPLcdrqKq', 'hieuhpcf@gmail.com', 'admin')
INSERT INTO `user` (`name`, `password`, `email`, `address`, `birth`, `gender`, `image`) VALUES ('Đào Bá Hiếu', '$12$rq5lTc6TlbBGt9bZvzN2me8ubHMExnA2g7mAZwfDImMpCPLcdrqKq', 'admin@gmail.com', 'Hai Phong', '13-06-2000', '0', '');