import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Restaurant as RestaurantModel } from '@prisma/client';
import { Product as ProductModel } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';
import { AddRestaurantDto, EditRestaurantDto, AddProduct, EditProduct } from './admin.restaurants.dto';

@Injectable()
export class AdminRestaurantsService {
	constructor(private readonly prismaService: PrismaService) {}

	public async deleteRestaurant(id: number): Promise<void> {
		try {
			const result = await this.prismaService.restaurant.delete({
				where: { id: id }
			});

			Logger.log(`Restauracja ${result.name} została usunięta`);
		} catch {
			throw new NotFoundException();
		}
	}

	public async editRestaurant(id: number, dto: EditRestaurantDto): Promise<void> {
		const result: RestaurantModel = await this.prismaService.restaurant.update({
			where: {id: id},
			data: {
				name: dto.name,
				email: dto.email,
				url: dto.url,
				logoUrl: dto.logoUrl,
			}
		});

		if(!result) {
			throw new NotFoundException();
		}

		Logger.log(`Restauracja ${result.name} została zedytowana`);
	}

	public async addRestaurant(dto: AddRestaurantDto): Promise<number> {
		console.log(dto)
		try {
			const result: RestaurantModel = await this.prismaService.restaurant.create({
				data: {
					name: dto.name,
					email: dto.email,
					url: dto.url || null,
					logoUrl: dto.logoUrl || null,
				}
			});

			Logger.log(`Restauracja ${result.name} została dodana, id: ${result.id}`);
			return result.id;
		} catch(ex) {
			Logger.error(ex);
			throw new BadRequestException('Tworzenie restauracji się nie powiodło (prawdopodobnie restauracja o podanej nazwie, emailu lub url już istnieje"');
		}
	}

	public async addProduct(dto: AddProduct): Promise<number> {
		try {
			const result: ProductModel = await this.prismaService.product.create({
				data: {
					name: dto.name,
					price: dto.price,
					logoUrl: dto.logoUrl,
					restaurantId: dto.restaurantID,
				}
			});

			Logger.log(`Produkt ${result.name} został dodany, id: ${result.id}`);
			return result.id
		} catch(ex) {
			Logger.error(ex);
			throw new BadRequestException('Dodanie produktu sie nie powiodło');
		}

	}

	public async editProduct(id: number, dto: EditProduct): Promise<void> {
		const result: ProductModel = await this.prismaService.product.update({
			where: {id: id},
			data: {
				name: dto.name,
				price: dto.price,
				logoUrl: dto.logoUrl,
				restaurantId: dto.restaurantID,
			}
		});

		if(!result) {
			throw new NotFoundException();
		}

		Logger.log(`Produkt ${result.name} został zedytowany`);
	}


	public async deleteProduct(id: number): Promise<void> {
		try {
			const result = await this.prismaService.product.delete({
				where: { id: id }
			});

			Logger.log(`Produkt ${result.name} został usunięty`);
		} catch {
			throw new NotFoundException();
		}
	}

}
