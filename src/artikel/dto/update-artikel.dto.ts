import { PartialType } from '@nestjs/swagger';
import { CreateArtikelDto } from './create-artikel.dto';

export class UpdateArtikelDto extends PartialType(CreateArtikelDto) {}
