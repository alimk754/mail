DROP TABLE IF EXISTS contact_emails;
 DROP TABLE IF EXISTS contact;
 DROP TABLE IF EXISTS attachment;
 DROP TABLE IF EXISTS trash;
 DROP TABLE IF EXISTS message;
 DROP TABLE IF EXISTS mail;


CREATE TABLE mail (
    id VARCHAR(255) COLLATE utf8mb4_bin PRIMARY KEY,
    pass VARCHAR(255) NOT NULL
);
CREATE TABLE folder (
    id INT PRIMARY KEY AUTO_INCREMENT,
    folder_name VARCHAR(255) NOT NULL, 
    mail_id VARCHAR(255) COLLATE utf8mb4_bin,
    FOREIGN KEY (mail_id) REFERENCES mail(id) 
);

CREATE TABLE message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci, 
    subject VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    importance INT,
    sender_email VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    receiver_email VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    toemail VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    fromemail VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_email) REFERENCES mail(id),
    FOREIGN KEY (receiver_email) REFERENCES mail(id),
     message_id INT,
	FOREIGN KEY (message_id) REFERENCES folder(id) ON DELETE CASCADE
);



CREATE TABLE trash (
    message_id INT NOT NULL,
    mail_id VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    
    PRIMARY KEY (message_id, mail_id),
    FOREIGN KEY (message_id) REFERENCES message(id) ON DELETE CASCADE,
    FOREIGN KEY (mail_id) REFERENCES mail(id) ON DELETE CASCADE
);


CREATE TABLE attachment (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    message_id INT NOT NULL,
    file_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    content_type VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    file_size BIGINT NOT NULL,
    data LONGBLOB NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (message_id) REFERENCES message(id) ON DELETE CASCADE
);

CREATE TABLE contact (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    mail_id VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mail_id) REFERENCES mail(id) ON DELETE CASCADE
);


CREATE TABLE contact_emails (
    contact_id BIGINT NOT NULL,
    email VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (contact_id, email),
    FOREIGN KEY (contact_id) REFERENCES contact(id) 
);

