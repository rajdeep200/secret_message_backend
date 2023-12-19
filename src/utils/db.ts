import pg from 'pg'
import { config } from 'dotenv'
import { PostgresConfig } from '../config/config.js'
config()

export const connect = (postgresConnection: PostgresConfig) => {
    return new Promise((resolve, reject) => {
        let client = new pg.Client(postgresConnection)
        client.connect((err: any) => {
            if (err) {
                reject(err)
            } else {
                console.log("Connected to database");
                resolve(client)
            }
        })
    })
}

export const getReq = async (query: string, postgresConnection: PostgresConfig) => {
    return new Promise((resolve, reject) => {
        let client = new pg.Client(postgresConnection)
        client.connect();
        return client.query(query, (err: any, res: any) => {
            if (err) {
                reject(err)
            }
            resolve(res?.rows)
            client.end()
        })
    })
}

export const postReq = (query: any, postgresConnection: PostgresConfig) => {
    return new Promise((resolve, reject) => {
        let client = new pg.Client(postgresConnection)
        client.connect();
        return client.query(query, (error: any, res: any) => {
            if (error) {
                reject(error)
            }
            if(res?.rowCount) {
                console.log('res =>> ', res)
                resolve(res.rowCount)
            }else {
                reject(error)
            }
            client.end()
        })
    })
}