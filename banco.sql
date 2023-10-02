-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema EJRMoney
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema EJRMoney
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `EJRMoney` DEFAULT CHARACTER SET utf8 ;
USE `EJRMoney` ;

-- -----------------------------------------------------
-- Table `EJRMoney`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EJRMoney`.`usuario` (
  `id` INT UNSIGNED NOT NULL,
  `nome` VARCHAR(200) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `senha` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EJRMoney`.`categoria_receita`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EJRMoney`.`categoria_receita` (
  `id` INT UNSIGNED NOT NULL,
  `nome` VARCHAR(50) NULL,
  `tipo` VARCHAR(50) NULL,
  `usuario_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_categoria_receita_usuario_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_categoria_receita_usuario`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `EJRMoney`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EJRMoney`.`categoria_despesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EJRMoney`.`categoria_despesa` (
  `id` INT UNSIGNED NOT NULL,
  `nome` VARCHAR(50) NULL,
  `tipo` VARCHAR(50) NULL,
  `usuario_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_categoria_despesa_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_categoria_despesa_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `EJRMoney`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EJRMoney`.`receitas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EJRMoney`.`receitas` (
  `id` INT UNSIGNED NOT NULL,
  `descricao` VARCHAR(200) NULL,
  `valor` DECIMAL(10) NULL,
  `data` DATETIME NULL,
  `categoria_receita_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_receitas_categoria_receita1_idx` (`categoria_receita_id` ASC) VISIBLE,
  CONSTRAINT `fk_receitas_categoria_receita1`
    FOREIGN KEY (`categoria_receita_id`)
    REFERENCES `EJRMoney`.`categoria_receita` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `EJRMoney`.`despesas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `EJRMoney`.`despesas` (
  `id` INT UNSIGNED NOT NULL,
  `descricao` VARCHAR(200) NULL,
  `valor` DECIMAL(10) NULL,
  `data` DATETIME NULL,
  `categoria_despesa_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_despesas_categoria_despesa1_idx` (`categoria_despesa_id` ASC) VISIBLE,
  CONSTRAINT `fk_despesas_categoria_despesa1`
    FOREIGN KEY (`categoria_despesa_id`)
    REFERENCES `EJRMoney`.`categoria_despesa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
