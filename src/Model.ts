import { DataModel, Type, Field, TypeRef } from "./DataModel";

interface FieldP extends Field {
    flags: string[]
}


export class Model {

    dataModel!: DataModel
    constructor(model:{dataModel:DataModel}) {
        this.dataModel = model.dataModel
        this.dataModel.types.flatMap(t => t.fields).forEach(
            (field: Field) => {
                const fp = field as FieldP
                fp.flags = []
                if (fp.directives.find(d => d.name === "id")) {
                    fp.flags.push("id")
                }
                if (fp.directives.find(d => d.name === "relation")) {
                    fp.flags.push("relation")
                }
                if (fp.directives.find(d => d.name === "brief")) {
                    fp.flags.push("brief")
                }
            })
    }

    public get types(): Type[] {
        return this.dataModel.types
    }


    findField(flag: string): [Type, Field] | undefined {
        const zipTypeWithField: [Type, Field][] = this.dataModel.types.flatMap(t => t.fields.map(f => [t, f]))
        if (!zipTypeWithField) return undefined
        return zipTypeWithField.find(([t, f]) => (f as FieldP).flags.includes(flag))
    }

    getBriefFieldName(typeRef: TypeRef): string | undefined {
        const reType = this.dataModel.types.find(t => t.name === typeRef.name)
        if (reType) {
            const field = reType.fields.find(f => (f as FieldP).flags.includes("brief"))
            return field ? field.name : undefined
        }
        return undefined
    }
}