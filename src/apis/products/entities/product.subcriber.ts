import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';
import { BigQuery } from '@google-cloud/bigquery';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
    constructor(connection: Connection) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return Product;
    }

    afterInsert(event: InsertEvent<Product>) {
        console.log(event);

        const bigQuery = new BigQuery({
            keyFilename: process.env.BIG_QUERY_KEY_FILENAME,
            projectId: process.env.BIG_QUERY_PROJECT_ID,
        });

        bigQuery
            .dataset(process.env.BIG_QUERY_DATABASE_NAME)
            .table(process.env.BIG_QUERY_TABLE_NAME)
            .insert([
                {
                    id: event.entity.id,
                    name: event.entity.name,
                    description: event.entity.description,
                    price: event.entity.price,
                    isSoldout: event.entity.isSoldout,
                },
            ]);
    }
}
