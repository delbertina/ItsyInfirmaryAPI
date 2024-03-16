import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('supplyitem')
export class SupplyItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 70, nullable: false })
  name: string;

  @Column({ name: 'description', length: 180, nullable: false })
  description: string;

  @Column({ name: 'perishable', nullable: false })
  perishable: boolean;
}

export const checkIsSupplyItem = (item: any): boolean => {
  if (
    item.name !== undefined &&
    item.description !== undefined &&
    item.perishable !== undefined
  ) {
    return true;
  }
  return false;
};
