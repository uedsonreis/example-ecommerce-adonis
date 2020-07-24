import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Manufacturer from 'App/Models/Manufacturer'

export default class ManufacturerSeeder extends BaseSeeder {
    
    public async run() {
        await Manufacturer.createMany([
            { name: 'Apple' },
            { name: 'Samsung' }
        ])
    }

}
