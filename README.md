# Nest-First (v1.1)
2022.06.03 

## in this branch (v1.1)

Nest.js + TypeScript:

branch: v1.0
* [x] `nest `
* [x] query
* [x] body
* [x] params
* [x] GET 
* [x] POST
branch: v1.1

```

// 
nest g module user
nest g service prisma --no-spec

// 
yarn add @prisma/client
npx prisma init

// after define model 
npx prisma migrate dev
npx prisma generate

// (optional)
npx prisma studio

// configuration
yarn add @nestjs/config

//
yarn add @nestjs/passport passport @nestjs/jwt passport-jwt
yarn add -D @types/passport-jwt

// strategy for safe routes
```

## Run

`yarn start:dev` or  `npm run start:dev`

## Next Steps

### Courses

1. [Angular + Nest.js + Docker + RestAPI](https://download.ir/udemy-nestjs-rest-apis-with-docker-a-practical-guide/)

2. [dev.to](https://dev.to/tkssharma/nest-js-advanced-course-coming-up-3ih9)

### Articles

1. [Fullstack typescript: Prisma + Nestjs + Angular](https://www.prisma.io/blog/full-stack-typesafety-with-angular-nest-nx-and-prisma-CcMK7fbQfTWc)

2. [buddy: Nestjs + Angular](https://buddy.works/tutorials/build-a-full-stack-web-application-with-angular-7-and-nest-js)

