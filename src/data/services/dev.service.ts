import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../auth/usuario/entities/usuario.entity";
import { Endereco } from "../../endereco/entities/endereco.entity";


@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3307,
            username: 'root',
            password: '16121995',
            database: 'db_gerenciamento',
            entities: [Usuario, Endereco],
            synchronize: true,
    };
}
}