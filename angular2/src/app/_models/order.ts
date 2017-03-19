import {ServiceDetail} from "./service";

export class Order {
    id: number;
    name: string;
    message: string;
    price: number;
    m_name: string;
    status: number;
    uuid: string;
    details: OrderDetail[];
    user: AppUser;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

export class OrderDetail {
    id: number;
    price:number;
    content: string;
    serviceDetail: ServiceDetail;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

export class AppUser {
    id: number;
    name: string;
    email: string;
}