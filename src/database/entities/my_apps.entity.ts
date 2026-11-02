import { CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm'
import { UserClient } from '@database/entities/user-client.entity'

@Entity({ name: 'my_apps' })
@Index(['userId', 'appId'], { unique: true })
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ name: 'user_id' })
  userId!: string

  @Column({ name: 'app_id', length: 40 })
  appId!: string

  @CreateDateColumn()
  createdAt!: Date

  @ManyToOne(() => UserClient, { onDelete: 'CASCADE' })
  user!: UserClient
}
