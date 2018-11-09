## GC Talent Cloud
Talent Cloud aspires to be a cross-sectoral initiative testing new realities for talent in-and-out of government. This initiative is designed to test the viability of a new model for recruiting and mobilizing talent in the Public Service. The Talent Cloud itself is fundamentally a massive repository of pre-assessed talent, where the curation and distribution of talent is optimized for fast placement for project-based work.

The talent cloud initiative is a grass-roots project put forward by a group of employees passionate about imagining new options for public sector talent mobility. The project team is being incubated (as a cross-sector lab) under the CIOB at TBS. The project is being funded during its start-up and testing phases by contributions from partner departments.


## Nuage de talents du GC
Nuage de talent s'efforce d'être une initiative intersectorielle mettant à l'essai de nouvelles réalités pour le talent à l'intérieur et à l'extérieur du gouvernement. Cette initiative vise à tester la viabilité d'un nouveau modèle de recrutement et de mobilisation de talents au sein de la fonction publique. Le Nuage de talent est fondamentalement un répertoire massif de talents préévalulé, où l’organisation et la distribution des talents sont optimisées pour un placement rapide pour le travail de projet.

L'initiative de Nuage de talent est un projet de base proposé par un groupe d'employés passionné d'imaginer de nouvelles options pour la mobilité des talents du secteur public. L'équipe du projet est incubée (sous forme de laboratoire intersectoriel) dans le cadre du CIOB au SCT. Le projet est financé au cours de ses phases de démarrage et de test par les contributions des ministères partenaires.


## Attributions
The Talent Cloud site uses:
* Icons from Font-Awesome (https://fontawesome.com/free, https://creativecommons.org/licenses/by/4.0/)
* An image from Unsplash.com (Photo by José Martín Ramírez C on Unsplash)

## Running the Talent Cloud server with Docker on a Windows machine:
1. Install Docker for Windows

A) Check your evironment variables for any Docker Toolboxor or previous Docker installaion version remnants and clear them.

Go to Control Panel\All Control Panel Items\System Then click Advanced system settings, In System Properties, Go to Advanced Tab and Click Environment Variables. Delete all DOCKER_* from System/User variables.

Remove DOCKER_* from command prompt or PowerShell, i used PowerShell. using following steps
```
[Environment]::SetEnvironmentVariable("DOCKER_CERT_PATH", $null, "User")
[Environment]::SetEnvironmentVariable("DOCKER_HOST", $null, "User")
[Environment]::SetEnvironmentVariable("DOCKER_MACHINE_NAME", $null, "User")
[Environment]::SetEnvironmentVariable("DOCKER_TLS_VERIFY", $null, "User")
[Environment]::SetEnvironmentVariable("DOCKER_TOOLBOX_INSTALL_PATH", $null, "User")
```
Instructions sourced from : https://github.com/docker/for-win/issues/1746#issuecomment-376280377

B) If prompted, allow Docker through Windows Firewall.

2. If using Docker for Windows, add
	```
	127.0.0.1	talent.local.ca
	```
	to windows hosts file (at `C:\Windows\System32\Drivers\etc\hosts`).
    If using Docker Toolbox, instead of `127.0.0.1` use the ip address that appears when you open the Docker Quickstart Terminal.


3. Check out an appropriate branch of the `GCTC-NTGC/TalentCloud/` repository from github.com. (Best branch is currently `dev`)
	`git clone --single-branch -b dev https://github.com/GCTC-NTGC/TalentCloud.git`

	If you're using Docker Toolbox, ideally don't, but if you must clone the git repo into somewhere in your C:\\Users folder. If you're using Docker for Windows, you can put it anywhere, just make sure that in Docker Settings > Shared Drives, the appropriate drive is available to Docker.

4. If using Docker for Windows, ensure the Docker for Windows app is running. Open a Powershell terminal and navigate to the TalentCloud directory. Run the rest of the commands in this terminal.

    If using Docker Toolbox, open the Docker Quickstart Terminal. Navigate to the TalentCloud directory. Run the rest of the commands in this terminal.

5. Execute gen_certs.bat or run
	`docker run --rm -v $pwd/etc/ssl:/certificates -e "SERVER=talent.local.ca" jacoelho/generate-certificate`

	If that doesn't work, try manually replacing $pwd with the absolute path to the TalentCloud directory.

    If that doesn't work, you should restart your computer and attempt to run gen_certs.bat again.

6. In Task Manager > Services, stop any MySQL and Apache services you have running.

7. in root folder run `docker-compose up --build --force-recreate`

8. Copy `.env.example` to `.env`. Configure it with the following steps:
 	- run `docker-compose exec talentcloud sh -c "php artisan key:generate"` to create a random APP_KEY variable.
	- Get the `GCCOLLAB_CLIENT_SECRET` from another team member and paste it in
	- If testing, consider setting `FORCE_ADMIN` and/or `DEBUGBAR_ENABLED` to true.

8. Run the following commands to manually set up database
	```
	docker-compose exec talentcloud sh -c "php artisan migrate:fresh"
	docker-compose exec talentcloud-db sh -c "psql -U talentcloud -f /manual_db/insert-data.sql"
	```

9. For testing, you may want to create fake data with the following command:
	`docker-compose exec talentcloud sh -c "php artisan db:seed"`

10. After the first-time set up, you should be able to start up the server simply by running `docker-compose up`, as long as other MySQL and Apache services are stopped.

## OPTIONAL Installing and Running PHPUnit via composer in your docker container:

First confirm that you have a successful installation of Composer running by typing out the command `composer`.

Second, you will want to run `docker-compose up -d` if you have not already done so and then `docker-compose exec talentcloud sh -c` to connect to your workspace.

Finally, once you've connected to the TalentCloud server use the command below to run the tests in your tests folder.

```
docker-compose exec talentcloud sh -c "vendor/bin/phpunit"
```

Or specify wherever you keep your tests saved if saved elsewhere on your filesystem.

If the tests fail, or you get a Segmentation Fault, remove the Example.php or Sample.php files from both the Unit and Feature folders and attempt to run them again.

For further customization to your tests investigate the php.xml file and include or exclude options at your leisure.


## Useful Commands:
```
Generate site certificate
	docker run --rm -v ${pwd}/etc/ssl:/certificates -e "SERVER=talent.local.ca" jacoelho/generate-certificate

Run composer install
	docker run --rm -v ${pwd}:/app composer/composer install

Run composer update
	docker run --rm --interactive --tty --volume ${pwd}/:/app composer "update"

To stop and delete all existing Docker containers (can fix some errors)
	docker stop $(docker ps -a -q)
	docker rm $(docker ps -a -q)

To set up your database manually (MySQL)
	docker-compose exec talentcloud sh -c "php artisan migrate:fresh"
	docker-compose exec talentcloud-db sh -c "mysql --password talentcloud < /docker-entrypoint-initdb.d/seed_lookup_tables.sql"

To set up your database manually (PostGres)
	docker-compose exec talentcloud sh -c "php artisan migrate:fresh"
	docker-compose exec talentcloud-db sh -c "psql -U talentcloud -f /manual_db/insert-data.sql"
```
