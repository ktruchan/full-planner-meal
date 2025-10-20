import {BeforeInsert, Column, PrimaryGeneratedColumn} from "typeorm";
import bcrypt from "bcryptjs";

export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    /**
     * Hook "BeforeInsert"
     * Ta funkcja uruchomi się automatycznie tuż PRZED zapisaniem
     * nowego użytkownika do bazy danych
     */
    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

}
