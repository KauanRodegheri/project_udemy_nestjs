/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
    list: any[];

    constructor(){
        this.list = [];
    }

    finAll(){
        return this.list
    }

    findOne(id: number): any{
        try{
            const list_id = this.list[id - 1]
            if (!list_id){
                return {"Not Found": 404}
            }
            return list_id
        }
        catch{
            const list_id = {"message": "usuario não achado"}
            return list_id
        }
    }

    create(message: any): any{
        let id: number
        if (this.list.length == 0){
            id = 0
            message['id'] = id + 1
            this.list.push(message)
            console.log(this.list)
            return this.list[this.list.length - 1]

        }
        else{
            id = this.list[this.list.length - 1]['id'] + 1
            message['id'] = id
            this.list.push(message)
            return this.list[this.list.length - 1];
        }
    }

    update(id: number, message: any): any{
        const list_keys = ['name', 'age', 'isMan']
        let cont = 0
        for (const i of this.list){
            cont += 1
            if (i['id'] == id){
                break
            }
        }
        for (const key in message){
            if (list_keys.includes(key)){
                this.list[cont - 1][key] = message[key]
            }
        }
        return message
    }

    delete(id: number): any{
        for (let i = 0; i <= this.list.length; i++){
            if (this.list[i]['id'] == id){
                this.list.splice(i, 1)
                return {"message": "deleted success"}
            }
        }
        return {"message": "not found 404"}
    }
}
