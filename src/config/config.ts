export interface PostgresConfig {
    host: string;
    user: string;
    password: string;
    database: string;
    port: string;
}

export const postgresDatabase:PostgresConfig = {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
}