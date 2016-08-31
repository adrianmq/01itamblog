use `blog`;

DROP TABLE IF EXISTS `contact`;

CREATE TABLE `contact` (
  `id` INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `first_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `message` TEXT,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC)
);

ALTER TABLE `contact`
  DROP INDEX `email_UNIQUE`;
  
ALTER TABLE `contact`
  ADD INDEX `id_UNIQUE` (`id` ASC);
  
DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` INT(2) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `passphrase` VARCHAR(255) NOT NULL,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)
) ENGINE=InnoDB;