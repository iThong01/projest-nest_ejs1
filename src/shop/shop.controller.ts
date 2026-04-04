import { Controller, Get, Param, Render, Post, Res, UseInterceptors, UploadedFile, Body, Session, Query } from '@nestjs/common';
import { ShopService } from './shop.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlainObjectToDatabaseEntityTransformer } from 'typeorm/query-builder/transformer/PlainObjectToDatabaseEntityTransformer.js';
import type { MySessionData } from './interfaces/cart.interface';
import type { Response } from 'express';

@Controller('shop') 
export class ShopController {
    constructor(private readonly shopService: ShopService) { }

    @Get()
    @Render('shop/shop')
    async getShopPage(@Session() session: MySessionData) {
        const items = await this.shopService.findAll();
        const cartCount = session.cart ? session.cart.length : 0;
        return {
            Item: items,
            title: 'Shop Herb',
            activeMenu: 'shop',
            ItemCartCount: cartCount
        };
    }
    @Get('Manage')
    @Render('shop/manage-shop')
    async getManageShop(@Session() session: MySessionData) {
        const items = await this.shopService.findAll();
        const cartCount = session.cart ? session.cart.length : 0;
        return {
            Item: items,
            word: 'Manage-shop',
            activeMenu: 'manage',
            ItemCartCount: cartCount
        };
    }
    @Get('search')
    @Render('shop/search')
    async searchPage(@Query('q') q: string,@Session() session: MySessionData) {
        const items = await this.shopService.searchItems(q);
        const cartCount = session.cart ? session.cart.length : 0;
        return {
            Item: items,
            query: q,
            title: `Search Results for "${q}"`,
            activeMenu: 'shop',
            ItemCartCount: cartCount
        };
    }

    @Get('api/search')
    async searchApi(@Query('q') q: string) {
        const items = await this.shopService.searchItems(q);
        return { success: true, data: items, query: q };
    }

    @Get('Your-Basket')
    @Render('shop/basket')
    getBasketPage(@Session() session: MySessionData) {
        const cart = session.cart || [];
        const cartCount = session.cart ? session.cart.length :0;
        let totalPrice = 0;
        let totalItem = 0;
        for(const cartItem of cart){
            totalPrice += cartItem.item.price * cartItem.quantity;
            totalItem += cartItem.quantity;
        }
        return {
            cart: cart,
            totalPrice: totalPrice,
            totalItem: totalItem,
            word: 'Basket kub',
            activeMenu: 'basket',
            ItemCartCount: cartCount
        };
    }
    @Get('orders')
    @Render('shop/orders')
    async getHistory(@Session() session: MySessionData, @Res() res: Response){
        const cartCount = session.cart ? session.cart.length : 0;
        if(!session.userId){
            return res.redirect('/login');
        }
        try{
            const orders = await this.shopService.getUserOrders(session.userId.toString());
            return {
                orders: orders,
                word: 'My History',
                activeMenu: 'shop',
                ItemCartCount: cartCount
            };
        }catch(error){
            console.error('Error fetching orders: ',error);
            return {
                orders:[],
                word: 'wrong get Data',
                activeMenu:'shop',
                ItemCartCount: cartCount
            };
        }
    }

    @Get('edit/:id')
    async getEdit(@Param('id')id: string,@Res() res:Response){
        const items = await this.shopService.findOne(Number(id));
        if(!items){
            return res.redirect('/shop/Manage');
        }
        return res.render('shop/edit' ,{item:items});
    }

    @Post('edit/:id')
    @UseInterceptors(FileInterceptor('image',{})) //up image binary
    async editItem(@Param('id')id:string, @UploadedFile() file:Express.Multer.File, @Body() body: any,@Res() res: Response){
         const itemUpdate = await this.shopService.findOne(Number(id));
         if(!itemUpdate){
            return res.redirect('/shop/Manage');
         }
         itemUpdate.name = body.name;
         itemUpdate.price = Number(body.price);
         itemUpdate.description = body.description;
         itemUpdate.count = Number(body.count);
         if(file){
            itemUpdate.image = file.buffer;
         }
         await this.shopService.updateItem(itemUpdate);
         return res.redirect('/shop/Manage');
    }

    @Post('add-item')
    @UseInterceptors(FileInterceptor('image'))
    async createNewItem(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: any,
        @Res() res: Response
    ){
        const finalImageBuffer = file ? file.buffer : null;
        const { name, price, count, descript } = body;
        await this.shopService.createItem({
            name: name,
            price: price,
            count: count,
            description: descript,
            image: finalImageBuffer
        });
        console.log('เซฟรูปลง Database สำเร็จ');
        return res.redirect('/shop/Manage');
    }

    @Post('delete/:id')
    async deleteItem(@Param('id') id: string, @Res() res: Response) {
        await this.shopService.deleteItem(Number(id));
        return res.redirect('/shop/Manage');
    }

    @Post('add-to-cart')
    async addToCart(
        @Body() body: { itemId: string, quantity: string},
        @Session() session: MySessionData
    ){
        if(!session.cart){
            session.cart =[];
        }
        const itemIdNum = parseInt(body.itemId, 10);
        const qtyNum = parseInt(body.quantity, 10);
        const item = await this.shopService.findOne(itemIdNum);
        if(!item){
            return { success: false, message: 'ไม่พบสินค้า'};
        }
        const exitingItemIndex = session.cart.findIndex(cartItem => cartItem.item.id ===itemIdNum);
        if(exitingItemIndex > -1){
            session.cart[exitingItemIndex].quantity += qtyNum;
        }else{
            session.cart.push({
                item:item,
                quantity: qtyNum
            });
        }
        console.log('ตะกร้านี้ : ', session.cart);
        return {success: true, message: 'เพิ่มลงตะกร้าสำเร็จ' ,cartCount: session.cart.length};
    }
    @Post('remove-from-cart')
    removeFromCart(
        @Body() body: { itemId: string},
        @Session() session: MySessionData,
        @Res() res: Response
    ){
        if(session.cart){
            const itemIdNum = parseInt(body.itemId, 10);
            session.cart = session.cart.filter(cartItem => cartItem.item.id !== itemIdNum);
        }
        return res.redirect('/shop/Your-Basket');
    }

    @Post('checkout')
    async checkout(
        @Session() session: MySessionData,
        @Res() res: Response
    ) {
        if (!session.cart || session.cart.length === 0) {
            return res.status(400).json({ success: false, message: 'ตะกร้าสินค้าว่างเปล่า' });
        }

        try {
            const userId = session.userId ? session.userId.toString() : 'guest';

            const isSuccess = await this.shopService.checkout(session.cart, userId);            
            if (isSuccess) {
                session.cart = [];
                return res.json({ success: true, message: 'สั่งซื้อสำเร็จ! บันทึกข้อมูลลงฐานข้อมูลแล้ว' });
            } else {
                return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการสั่งซื้อ' });
            }
        } catch (error) {
            console.error('Checkout Error: ', error);
            return res.status(500).json({ success: false, message: 'เกิดข้อผิดพลาดในการประมวลผล' });
        }
    }
}