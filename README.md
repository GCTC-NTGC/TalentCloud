# GC Talent Cloud

[![Build Status](https://travis-ci.com/GCTC-NTGC/TalentCloud.svg?branch=dev)](https://travis-ci.com/GCTC-NTGC/TalentCloud) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/GCTC-NTGC/TalentCloud/badges/quality-score.png?b=dev)](https://scrutinizer-ci.com/g/GCTC-NTGC/TalentCloud/?branch=dev) [![codecov](https://codecov.io/gh/GCTC-NTGC/TalentCloud/branch/dev/graph/badge.svg)](https://codecov.io/gh/GCTC-NTGC/TalentCloud/?branch=dev)

## Summary

Talent Cloud aspires to be a cross-sectoral initiative testing new realities for talent in-and-out of government. This initiative is designed to test the viability of a new model for recruiting and mobilizing talent in the Public Service. The Talent Cloud itself is fundamentally a massive repository of pre-assessed talent, where the curation and distribution of talent is optimized for fast placement for project-based work.

The talent cloud initiative is a grass-roots project put forward by a group of employees passionate about imagining new options for public sector talent mobility. The project team is being incubated (as a cross-sector lab) under the CIOB at TBS. The project is being funded during its start-up and testing phases by contributions from partner departments.

## Nuage de talents du GC

Nuage de talent s'efforce d'être une initiative intersectorielle mettant à l'essai de nouvelles réalités pour le talent à l'intérieur et à l'extérieur du gouvernement. Cette initiative vise à tester la viabilité d'un nouveau modèle de recrutement et de mobilisation de talents au sein de la fonction publique. Le Nuage de talent est fondamentalement un répertoire massif de talents préévalulé, où l’organisation et la distribution des talents sont optimisées pour un placement rapide pour le travail de projet.

L'initiative de Nuage de talent est un projet de base proposé par un groupe d'employés passionné d'imaginer de nouvelles options pour la mobilité des talents du secteur public. L'équipe du projet est incubée (sous forme de laboratoire intersectoriel) dans le cadre du CIOB au SCT. Le projet est financé au cours de ses phases de démarrage et de test par les contributions des ministères partenaires.

## Attributions

The Talent Cloud site uses:

- [Icons from Font-Awesome](https://fontawesome.com/free) - [Creative Commons License](https://creativecommons.org/licenses/by/4.0/)
- An image from [Unsplash.com](https://unsplash.com/) (Photo by José Martín Ramírez C on Unsplash)

## Running the Talent Cloud server with Docker on a Windows machine

1. PHP 7.2 is required. Install PHP 7.2 on your system, create a php.ini file in root and copy the contents of php.ini-development file. Next, open up the file in a text editor and uncomment (eg. remove ';' before ';extention=curl') the following extensions:

   - curl
   - mbstring
   - xml
   - fileinfo
   - openssl

2. Install Docker for Windows

   A) Check your environment variables for any Docker Toolbox or previous Docker installation version remnants and clear them.

   Go to Control Panel -> All Control Panel Items -> System Then click Advanced system settings, In System Properties, Go to Advanced Tab and Click Environment Variables. Delete all DOCKER\_\* from System/User variables.

   Remove DOCKER\_\* from command prompt or PowerShell, using following steps

   ```bash
   [Environment]::SetEnvironmentVariable("DOCKER_CERT_PATH", $null, "User")
   [Environment]::SetEnvironmentVariable("DOCKER_HOST", $null, "User")
   [Environment]::SetEnvironmentVariable("DOCKER_MACHINE_NAME", $null, "User")
   [Environment]::SetEnvironmentVariable("DOCKER_TLS_VERIFY", $null, "User")
   [Environment]::SetEnvironmentVariable("DOCKER_TOOLBOX_INSTALL_PATH", $null, "User")
   ```

   [Instructions sourced from:](https://github.com/docker/for-win/issues/1746#issuecomment-376280377)

   B) If prompted, allow Docker through Windows Firewall.

3. If using Docker for Windows, add

   ```bash
   127.0.0.1    talent.test
   ```

   to windows hosts file (at `C:\Windows\System32\Drivers\etc\hosts`).
   If using Docker Toolbox, instead of `127.0.0.1` use the ip address that appears when you open the Docker Quickstart Terminal.

4. Check out an appropriate branch of the `GCTC-NTGC/TalentCloud/` repository from github.com. (Best branch is currently `dev`)

   `git clone --single-branch -b dev https://github.com/GCTC-NTGC/TalentCloud.git`

   If you're using Docker Toolbox, ideally don't, but if you must clone the git repo into somewhere in your C:\\Users folder. If you're using Docker for Windows, you can put it anywhere, just make sure that in Docker Settings > Shared Drives, the appropriate drive is available to Docker.

5. If using Docker for Windows, ensure the Docker for Windows app is running. Open a Powershell terminal and navigate to the TalentCloud directory. Run the rest of the commands in this terminal.

   If using Docker Toolbox, open the Docker Quickstart Terminal. Navigate to the TalentCloud directory. Run the rest of the commands in this terminal.

6. Execute gen_certs.bat or run

   `docker run --rm -v $PWD/etc/ssl:/certificates -e "SERVER=talent.test" jacoelho/generate-certificate`

   If that doesn't work, try manually replacing \$PWD with the absolute path to the TalentCloud directory.

   If that doesn't work, you should restart your computer and attempt to run gen_certs.bat again.

7. In Task Manager > Services, stop any MySQL and Apache services you have running.

8. In root folder run `docker-compose up --build --force-recreate`

9. Run `composer install`

10. Copy `.env.example` to `.env`. Configure it with the following steps:

    - run `docker-compose exec talentcloud sh -c "php artisan key:generate"` to create a random APP_KEY variable.
    - If testing, consider setting `FORCE_ADMIN` and/or `DEBUGBAR_ENABLED` to true.

11. Run the following command so that the database will persist across containers being brought and down:

    `docker volume create pgdata`
    You can run `docker-compose down -v` to erase this data volume.

12. Run the following commands to manually set up database

    ```bash
    docker-compose exec talentcloud sh -c "php artisan migrate:fresh"
    ```

13. For testing, you may want to create fake data with the following command:

    ```bash
    docker-compose exec talentcloud sh -c "php artisan db:seed"
    ```

14. After the first-time set up, you should be able to start up the server simply by running `docker-compose up`, as long as other MySQL and Apache services are stopped.

## OPTIONAL Installing and Running PHPUnit via composer in your docker container

First confirm that you have a successful installation of Composer running by typing out the command `composer`.

Second, you will want to run `docker-compose up -d` if you have not already done so and then `docker-compose exec talentcloud sh -c` to connect to your workspace.

Finally, once you've connected to the TalentCloud server use the command below to run the tests in your tests folder.

```bash
docker-compose exec talentcloud sh -c "vendor/bin/phpunit"
```

Or specify wherever you keep your tests saved if saved elsewhere on your filesystem.

If the tests fail, or you get a Segmentation Fault, remove the Example.php or Sample.php files from both the Unit and Feature folders and attempt to run them again.

For further customization to your tests investigate the php.xml file and include or exclude options at your leisure.

## Managing your database with Adminer

Adminer is a tool to manage your database through a browser interface. It can be accessed at `localhost:8080`. The database credentials and settings are set in your `.env` file. Here the settings provided by the `.env.example.`

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=talentcloud
DB_USERNAME=talentcloud
DB_PASSWORD=talentcloud
```

## Editing Frontend Assets (CSS/SASS and JavaScript files)

Laravel Mix is used to compile frontend assets (CSS, SASS, and JS).

Files in the `public/` folder must never be modified directly. Instead, modify files in the `resources/assets/` folder, and then run `npm run dev` or `npm run prod` to compile these assets to the `public/` folder.

[See the documentation for more details:](https://laravel.com/docs/5.5/mix)

See below for installing `npm`:

[First download the applicable package here:](https://nodejs.org/en/)

Then after installation completes, restart your computer and open Powershell. Navigate to your TalentCloud directory.

Type in the commands,

```bash
npm install
```

and then,

```bash
npm update
```

Finally type in,

```bash
npm run dev
```

And you are done.

## Seeding data

Laravel Data Seeders can be used to quickly generate fake data and add it to the database for testing purposes.

Use the following command to run the seeder within your docker container:

```bash
docker-compose exec talentcloud sh -c "php artisan db:seed --class=DevSeeder"
```

This will create:

- An applicant with email='applicant@test.com' and password='password'
- A manager with email='manager@test.com' and password='password'
- 3 JobPosters attached to this manager: one still a draft, one currently open, one already closed.
  Running the command again will create 3 more JobPosters without affecting the users or their profiles.

This functionality lies in the `database\seeds\DevSeeder.php` file.

See [](https://laravel.com/docs/5.7/seeding) for more documentation on seeders.

## Useful Commands

```bash
# Get an interactive shell prompt in a running container,
# $container being the name of a running container, like talentcloud.
docker exec -it $container /bin/sh

# Generate site certificate
docker run --rm -v $PWD/etc/ssl:/certificates -e "SERVER=talent.test" jacoelho/generate-certificate

# Run composer install
docker run --rm -v $PWD:/app composer/composer install

# Run composer dump-autoload
docker run --rm -it --volume $PWD/:/app composer "dump-autoload"

# Run composer update
docker run --rm -it --volume $PWD/:/app composer "update"

# To stop and delete all existing Docker containers (can fix some errors)
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

# Drop all tables and recreate from migrations
docker exec talentcloud sh -c "php artisan migrate:fresh"

# Generate mock data from included seeders
docker exec talentcloud sh -c "php artisan db:seed"

# Single command for two above
docker exec talentcloud sh -c "php artisan migrate:fresh && php artisan db:seed"
```
