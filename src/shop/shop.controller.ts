import { Controller, Get ,Render} from '@nestjs/common';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
    constructor(private readonly shopService: ShopService){}
    
    @Get()
    @Render('shop/shop')
    getShopPage() {
        const mockUp = [
            { id: 1, name: 'Ginseng Extract', price: 590, des: 'เพิ่มพลังงานและภูมิคุ้มกัน' },
            { id: 2, name: 'Organic Green Tea', price: 250, des: 'ชาเขียวออร์แกนิคแท้ 100%' },
            { id: 3, name: 'Chamomile Flower', price: 180, des: 'ช่วยให้ผ่อนคลาย หลับสบาย' }
        ];
        return {
            Item: mockUp,
            title: 'Shop Herb'
        };
    }
    @Get('Manage')
    @Render('shop/manage-shop')
    getManageShop(){
        return {
            word: 'Manage-shop',
        };
    }
}