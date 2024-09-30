import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Endereco } from "../entities/endereco.entity";



@Injectable()
export class EnderecoService{
    constructor(
        @InjectRepository(Endereco)
        private enderecoRepository: Repository<Endereco>
    ){}


    async findAll(): Promise<Endereco[]> {
        return await this.enderecoRepository.find({
            relations: {
                usuario: true
            }
        });   
    }

    async create(endereco: Endereco): Promise<Endereco>{
        return await this.enderecoRepository.save(endereco);
    }

    async findById(id: number): Promise<Endereco> {

        let endereco = await this.enderecoRepository.findOne({
            where: {
                id
            }
        });

        if (!endereco)
            throw new HttpException('endereco não encontrado!', HttpStatus.NOT_FOUND);

        return endereco;
    }



    async update(endereco: Endereco): Promise<Endereco> {
        
        let buscarEndereco = await this.findById(endereco.id);

        if (!buscarEndereco || !endereco.id)
            throw new HttpException('endereco não encontrado!', HttpStatus.NOT_FOUND);
        
        return await this.enderecoRepository.save(endereco);
    }

    
    async delete(id: number): Promise<DeleteResult> {
        
        let buscarEndereco = await this.findById(id);

        if (!buscarEndereco)
            throw new HttpException('Servico não encontrado!', HttpStatus.NOT_FOUND);

        return await this.enderecoRepository.delete(id);

    }
}