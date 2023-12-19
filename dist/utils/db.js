import pg from 'pg';
import { config } from 'dotenv';
config();
export const connect = (postgresConnection) => {
    return new Promise((resolve, reject) => {
        let client = new pg.Client(postgresConnection);
        client.connect((err) => {
            if (err) {
                reject(err);
            }
            else {
                console.log("Connected to database");
                resolve(client);
            }
        });
    });
};
export const getReq = async (query, postgresConnection) => {
    return new Promise((resolve, reject) => {
        let client = new pg.Client(postgresConnection);
        client.connect();
        return client.query(query, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res?.rows);
            client.end();
        });
    });
};
export const postReq = (query, postgresConnection) => {
    return new Promise((resolve, reject) => {
        let client = new pg.Client(postgresConnection);
        client.connect();
        return client.query(query, (error, res) => {
            if (error) {
                reject(error);
            }
            if (res?.rowCount) {
                console.log('res =>> ', res);
                resolve(res.rowCount);
            }
            else {
                reject(error);
            }
            client.end();
        });
    });
};
//# sourceMappingURL=db.js.map