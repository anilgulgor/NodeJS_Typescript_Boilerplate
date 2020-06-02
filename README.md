# NodeJS Typescript Boilerplate

<img src="https://miro.medium.com/max/1400/1*dSqXPEWnNgUhEmCrjxRI4Q.png" width=100 align=left> 
<img src="https://raw.githubusercontent.com/hapijs/assets/master/images/hapi.png" width=60 align=left>
<img src="https://peakup.org/wp-content/uploads/2017/10/swagger-logo-500x188-1.png" width=100 align=left>
<img src="https://getpino.io/pino-banner.png" width=150 align=center>

This is basic NodeJS w/ Typescript boilerplate.

It is ready to use w/ Hapi Framework, Hapi-Swagger, JsonWebToken, Hapi-Pino.

Code formatting with eslint with a little help of prettier.

Husky is waiting for pre-commit. 
# bark bark! 🐶

Hapi-Pino for logging data on terminal or text file according to the env file.

Scripts for building or debugging:

- mongodb => Start mongodb locally
- mongodb_fork_process => Get mongodb process (PID). After that you can type "kill -(PID)" to stop mongodb.
- create_secret => Create powerful base64 secret for jsonwebtoken to use with hapi-auth-jwt
- lint => Linting code
- lint_fix => Fix after linting
- prettier_format => Format code by rules on prettierrc.
- nodemon => For Nodemon :)
- dev => Run project on DEV environment. w/ Nodemon support.
- prod => Run project on PROD environment. w/ Nodemon support.
- build => Build typescript project on /build folder.
- clean_build => Delete build folder with help of rimraf.
- try:build:dev => Run project from /build folder on DEV environment.
- try:build:prod => Run project from /build folder on PROD environment.

On pre-commit, Husky calls;

```bash
npm run prettier_format && npm run lint
```

To run project locally on dev, just call;

```bash
npm run dev
```

# and finally, don't forget to create your .env_dev and .env_prod files. Example:
```javascript
// inside of env file.
ENV=development
NAME=your-name //...
```





