-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 03 déc. 2021 à 05:53
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `asktech`
--

-- --------------------------------------------------------

--
-- Structure de la table `catégorie`
--

DROP DATABASE IF EXISTS `asktech`;
create database asktech;
use asktech;

DROP TABLE IF EXISTS `catégorie`;
CREATE TABLE IF NOT EXISTS `catégorie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `catégorie`
--

INSERT INTO `catégorie` (`id`, `Nom`) VALUES
(1, 'Pannes'),
(2, 'Annonces');

-- --------------------------------------------------------

--
-- Structure de la table `departement`
--

DROP TABLE IF EXISTS `departement`;
CREATE TABLE IF NOT EXISTS `departement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `departement`
--

INSERT INTO `departement` (`id`, `Nom`) VALUES
(1, 'Production'),
(2, 'Maintenance'),
(3, 'Informatique');

-- --------------------------------------------------------

--
-- Structure de la table `etat_sujet`
--

DROP TABLE IF EXISTS `etat_sujet`;
CREATE TABLE IF NOT EXISTS `etat_sujet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Etat` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `etat_sujet`
--

INSERT INTO `etat_sujet` (`id`, `Etat`) VALUES
(1, 'Ouvert'),
(2, 'Cloturé');

-- --------------------------------------------------------

--
-- Structure de la table `reponses`
--

DROP TABLE IF EXISTS `reponses`;
CREATE TABLE IF NOT EXISTS `reponses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Sujet_id` int(11) NOT NULL,
  `Utilisateur_id` int(11) NOT NULL,
  `Message` varchar(1000) NOT NULL,
  `Date` date NOT NULL,
  `Heure` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `reponses`
--

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `Nom`) VALUES
(1, 'Employe'),
(2, 'Cadre');

-- --------------------------------------------------------

--
-- Structure de la table `sujet`
--

DROP TABLE IF EXISTS `sujet`;
CREATE TABLE IF NOT EXISTS `sujet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Titre` varchar(50) NOT NULL,
  `Categorie_id` int(11) NOT NULL,
  `Utilisateur_id` int(11) NOT NULL,
  `Message` varchar(1000) NOT NULL,
  `Etat_id` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Heure` time NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `sujet`
--

INSERT INTO `sujet` (`id`, `Titre`, `Categorie_id`, `Utilisateur_id`, `Message`, `Etat_id`, `Date`, `Heure`) VALUES
(1, 'Bureau DRH', 1, 1, 'Où se trouve le bureau de la DRH', 1, '2021-11-01', '15:36:05');


-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(50) NOT NULL,
  `Prenom` varchar(50) NOT NULL,
  `Log` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `Role_id` int(11) NOT NULL,
  `Nb_sujets` int(11) NOT NULL,
  `Nb_reponses` int(11) NOT NULL,
  `Nb_connexion` int(11) NOT NULL,
  `Departement_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `Nom`, `Prenom`, `Log`, `Password`, `Role_id`, `Nb_sujets`, `Nb_reponses`, `Nb_connexion`, `Departement_id`) VALUES
(1, 'ADAGBE', 'Brunei', 'Abrunei', 'azerty', 2, 0, 0, 0, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
