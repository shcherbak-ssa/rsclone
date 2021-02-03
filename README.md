# rsclone #

Last task of the [RS School](https://rs.school/js/) course

### Setup ###

- Clone repository
```shell
> git clone https://github.com/shcherbak-ssa/rsclone.git .
```

- Switch to `develop` branch
```shell
> git checkout develop
```

---------------

### Run locally ###

If you want to run the project locally, you need to do the following steps:

1. Switch to `deploy` branch
```shell
> git checkout deploy
```
2. Create `.env` file of the root of the project
3. Add next content in created file (for more information see [dotenv](https://www.npmjs.com/package/dotenv))
```
JWT_SECRET_KEY=cross-checker
MONGODB_URL=mongodb+srv://cross-checker:1234567890@gitbook-clone.6xhqm.mongodb.net/?retryWrites=true&w=majority
```
4. Run next script
```shell
> npm start
```
5. Open next link in browser
```shell
> http://localhost:3000/
```
6. Enjoy! (I hope)

#### Notes ####

- You can select any jwt secret key
