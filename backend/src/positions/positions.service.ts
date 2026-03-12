import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

// service instance for the positions resource, all boiler plate NestJs setup except for the findLatest function.
@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private posRepository: Repository<Position>,
  ) {}

  findAll(): Promise<Position[]> {
    return this.posRepository.find();
  }

  // custom fucntion to get the latest robot position.
  async findLatest(): Promise<Position | null> {
    const [latest] = await this.posRepository.find({
      order: { timestamp: 'DESC' },
      take: 1,
    });
    return latest ?? null;
  }

  findOne(id: number): Promise<Position | null> {
    return this.posRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.posRepository.delete(id);
  }

  async create(createPositionDto: CreatePositionDto): Promise<Position> {
    const position = this.posRepository.create(createPositionDto);
    return this.posRepository.save(position);
  }

  async update(
    id: number,
    updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    await this.posRepository.update(id, updatePositionDto);
    const updated = await this.posRepository.findOneBy({ id });
    if (!updated) throw new NotFoundException(`Position #${id} not found`);
    return updated;
  }
}
