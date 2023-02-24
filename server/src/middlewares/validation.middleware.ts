import { plainToClass } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToClass(type, req[value]), {
      skipMissingProperties,
      whitelist,
      forbidNonWhitelisted,
    }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          statusCode: StatusCodes.BAD_REQUEST,
          status: StatusCodes.BAD_REQUEST,
          errors: errors.map((error: ValidationError) =>
            Object.values(error.constraints)
          ),
        })
      } else {
        next()
      }
    })
  }
}

export default validationMiddleware
