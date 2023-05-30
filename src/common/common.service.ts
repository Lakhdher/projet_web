import { Repository } from 'typeorm';
import { CommonEntity } from './entities/common.entity';

export abstract class CommonService<T extends CommonEntity> {
  constructor(readonly repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findById(id: any): Promise<T> {
    return await this.repository.findOne({where: {id}});
  }

  async create(data: any): Promise<T[]> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async update(id: number, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}