import Redis from 'ioredis'

const redis = new Redis({ password: process.env.REDIS_PASSWORD })

export default redis
