-- MySQL Script generated by MySQL Workbench
-- Sat Nov 23 17:45:40 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema gamedb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gamedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gamedb` DEFAULT CHARACTER SET utf8 ;
USE `gamedb` ;

-- -----------------------------------------------------
-- Table `gamedb`.`tb_game`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamedb`.`tb_game` (
  `cd_game` INT NOT NULL,
  `tx_name` VARCHAR(40) NULL DEFAULT '',
  `tx_released` VARCHAR(12) NULL,
  `tx_pathimg` VARCHAR(80) NULL,
  `nr_rating` DECIMAL(4,2) NULL,
  `nr_metacritic` DECIMAL(3) NULL,
  PRIMARY KEY (`cd_game`),
  UNIQUE INDEX `cd_game_UNIQUE` (`cd_game` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gamedb`.`tb_plataform`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamedb`.`tb_plataform` (
  `cd_plataform` INT NOT NULL,
  `tx_name` VARCHAR(10) NULL,
  PRIMARY KEY (`cd_plataform`),
  UNIQUE INDEX `cd_plataform_UNIQUE` (`cd_plataform` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gamedb`.`tb_game_plataform`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamedb`.`tb_game_plataform` (
  `cd_plataform` INT NOT NULL,
  `cd_game` INT NOT NULL,
  PRIMARY KEY (`cd_plataform`, `cd_game`),
  INDEX `fk_tb_plataform_game_tb_game_idx` (`cd_game` ASC) ,
  INDEX `fk_tb_plataform_game_tb_plataform_idx` (`cd_plataform` ASC) ,
  CONSTRAINT `fk_tb_plataform_game_tb_plataform`
    FOREIGN KEY (`cd_plataform`)
    REFERENCES `gamedb`.`tb_plataform` (`cd_plataform`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tb_plataform_game_tb_game`
    FOREIGN KEY (`cd_game`)
    REFERENCES `gamedb`.`tb_game` (`cd_game`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gamedb`.`tb_genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamedb`.`tb_genre` (
  `cd_genre` INT NOT NULL,
  `tx_description` VARCHAR(10) NULL,
  PRIMARY KEY (`cd_genre`),
  UNIQUE INDEX `cd_genre_UNIQUE` (`cd_genre` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gamedb`.`tb_game_genre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gamedb`.`tb_game_genre` (
  `cd_game` INT NOT NULL,
  `cd_genre` INT NOT NULL,
  PRIMARY KEY (`cd_game`, `cd_genre`),
  INDEX `fk_tb_game_genre_tb_genre1_idx` (`cd_genre` ASC) ,
  INDEX `fk_tb_game_genre_tb_game1_idx` (`cd_game` ASC) ,
  CONSTRAINT `fk_tb_game_genre_tb_game1`
    FOREIGN KEY (`cd_game`)
    REFERENCES `gamedb`.`tb_game` (`cd_game`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tb_game_genre_tb_genre1`
    FOREIGN KEY (`cd_genre`)
    REFERENCES `gamedb`.`tb_genre` (`cd_genre`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

CREATE TABLE log (
 idlog int(11) NOT NULL,
 datahora timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 numeroregistros int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
ALTER TABLE log ADD PRIMARY KEY (idlog);
ALTER TABLE log MODIFY idlog int(11) NOT NULL AUTO_INCREMENT;
