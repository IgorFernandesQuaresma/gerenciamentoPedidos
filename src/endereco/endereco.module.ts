import { Module } from "@nestjs/common";
import { Servico } from "./entities/servico.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicoService } from "./service/servico.service";
import { ServicoController } from "./controller/servico.controller";

@Module ({
    imports: [TypeOrmModule.forFeature([Servico])],
    providers: [ServicoService],
    controllers: [ServicoController],
    exports: [TypeOrmModule]
})

export class ServicoModule {}