import { Injectable } from '@nestjs/common';
import { CreateArtikelDto } from './dto/create-artikel.dto';
import { UpdateArtikelDto } from './dto/update-artikel.dto';

@Injectable()
export class ArtikelService {
  create(createArtikelDto: CreateArtikelDto) {
    return 'This action adds a new artikel';
  }

  findAll() {
    return `This action returns all artikel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artikel`;
  }

  update(id: number, updateArtikelDto: UpdateArtikelDto) {
    return `This action updates a #${id} artikel`;
  }

  remove(id: number) {
    return `This action removes a #${id} artikel`;
  }
}
