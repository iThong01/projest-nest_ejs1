import { Controller, Get ,Render} from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
    constructor(private readonly shopService: ShopService){}
    
    @Get()
    @Render('shop/shop')
    async getShopPage() {
        const items = await this.shopService.findAll();
        return {
            Item: items,
            title: 'Shop Herb',
            activeMenu: 'shop'
        };
    }
    @Get('Manage')
    @Render('shop/manage-shop')
    getManageShop(){
        return {
            word: 'Manage-shop',
            activeMenu: 'manage'
        };
    }
    @Get('Your-Basket')
    @Render('shop/basket')
    getBasketPage(){
        return {
            word:'Basket kub',
            activeMenu: 'basket'
        };
    }
}