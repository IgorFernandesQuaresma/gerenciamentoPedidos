import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Endereco } from "./entities/endereco.entity";
import { EnderecoService } from "./service/endereco.service";
import { EnderecoController } from "./controller/endereco.controller";


@Module ({
    imports: [TypeOrmModule.forFeature([Endereco])],
    providers: [EnderecoService],
    controllers: [EnderecoController],
    exports: [TypeOrmModule]
})

export class EnderecoModule {}