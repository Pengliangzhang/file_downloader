SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Unused tables currently
-- ----------------------------

-- ----------------------------
-- Table structure for common_user
-- ----------------------------
DROP TABLE IF EXISTS `common_user`;
CREATE TABLE `common_user`
(
    `id`                                  int(8)      NOT NULL AUTO_INCREMENT,
    `first_name`                          varchar(16) NOT NULL COMMENT '',
    `last_name`                           varchar(16) NOT NULL COMMENT '',
    `create_date_time`                    datetime             DEFAULT CURRENT_TIMESTAMP COMMENT 'create date time',
    `update_date_time`                    datetime             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'update date time',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- ----------------------------
-- Table structure for common_file
-- ----------------------------
DROP TABLE IF EXISTS `common_file`;
CREATE TABLE `common_file`
(
    `id`                                  int(8)      NOT NULL AUTO_INCREMENT,
    `file_name`                           varchar(16) NOT NULL COMMENT '',
    `path`                                varchar(16) NOT NULL COMMENT '',
    `is_approved`                         tinyint(1)  DEFAULT NULL,
    `create_date_time`                    datetime             DEFAULT CURRENT_TIMESTAMP COMMENT 'create date time',
    `update_date_time`                    datetime             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'update date time',
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;