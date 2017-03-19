export class Service {
    id: number;
    en_name: string;
    name: string;
    details: ServiceDetail[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

export class ServiceDetail {
    id: number;
    name: string;
    desc: string;
    price: number;
    phone: string;
    service_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}