import { Inject, Injectable, Logger } from '@nestjs/common';
import Neode from 'neode';

import { NEO4J_TOKEN } from './neode.provider';

@Injectable()
export abstract class BaseNeodeService<T, CreateDto = Partial<T>, UpdateDto = Partial<T>> {
  private readonly logger = new Logger(BaseNeodeService.name);

  constructor(
    @Inject(NEO4J_TOKEN) protected readonly neode: Neode,
    private readonly modelName: string
  ) {}

  async create(data: CreateDto): Promise<T> {
    try {
      const instance = await this.neode.model(this.modelName).create(data);
      return instance.toJson() as T;
    } catch (error) {
      this.logger.error(`Error creating ${this.modelName}:`, error);
      throw error;
    }
  }

  async findAll(): Promise<T[]> {
    try {
      const instances = await this.neode.model(this.modelName).all();
      return instances.map((node: Neode.Node<T>) => node.toJson()) as T[];
    } catch (error) {
      this.logger.error(`Error fetching all ${this.modelName}:`, error);
      throw error;
    }
  }

  async findOne(id: string): Promise<T | null> {
    try {
      const instance = await this.neode.model(this.modelName).first('id', id);
      return instance ? (instance.toJson() as T) : null;
    } catch (error) {
      this.logger.error(`Error finding ${this.modelName} by id:`, error);
      throw error;
    }
  }

  async update(id: string, data: UpdateDto): Promise<T | null> {
    try {
      const instance = await this.neode.model(this.modelName).first('id', id);
      if (!instance) return null;
      await instance.update(data);
      return instance.toJson() as T;
    } catch (error) {
      this.logger.error(`Error updating ${this.modelName}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const instance = await this.neode.model(this.modelName).first('id', id);
      if (!instance) return false;
      await instance.delete();
      return true;
    } catch (error) {
      this.logger.error(`Error deleting ${this.modelName}:`, error);
      throw error;
    }
  }
}
