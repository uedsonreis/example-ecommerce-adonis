import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

export class Repository<M> {

    constructor(private model: typeof BaseModel) {}

    public async findById(id: number): Promise<M | null> {
        const obj = await this.model.find(id)
        return (obj) ? obj as any as M : null
    }

    public async findOne(key: string, value: any): Promise<M | null> {
        const obj = await this.model.findBy(key, value)
        return (obj) ? obj as any as M : null
    }
    
    public async findMany(options?: { filter?: M, preload?: any }): Promise<M[]> {
        let array: any[]

        if (options) {
            const { filter, preload } = options

            let query = this.model.query()
            if (filter) query = query.where({ ...filter })
            if (preload) query = query.preload(preload)

            array = await query

        } else {
            array = await this.model.all()
        }

        return array as M[]
    }

    public async create(obj: M): Promise<M> {
        const newObj = await this.model.create(obj as any)
        return newObj as any as M
    }
    
    public async update(id: number, fieldsToUpdate: M): Promise<M | null> {
        const obj = await this.model.find(id)
        if (obj) {
            obj.merge(fieldsToUpdate as any)
            const updated = await obj.save()
            return updated as any as M
        }
        return null
    }

    public async delete(id: number): Promise<boolean> {
        const obj = await this.model.find(id)
        if (obj) {
            await obj.delete()
            return true
        }
        return false
    }

}