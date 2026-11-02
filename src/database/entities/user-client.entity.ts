import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Unique } from 'typeorm'

@Entity({ name: 'user_clients' })
@Unique(['email'])
export class UserClient {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ length: 160 })
  name!: string

  @Column({ length: 180 })
  email!: string

  @Column({ name: 'password_hash', select: false })
  passwordHash!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
