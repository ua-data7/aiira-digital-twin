# AIIRA Sierra Deployment

https://sierra.cyverse.org

The AIIRA Sierra platform lives on CyVerse VM [shimerdas.cyverse.org](http://shimerdas.cyverse.org) 

`ssh -p 1657 root@shimerdas.cyverse.org`

On shimerdas, the git repository (https://github.com/ua-data7/aiira-digital-twin) is cloned to `/srv/aiira-digital-twin` .

SSL certs are installed in `/root/ssl`. Postgres is installed on the VM.

## Production Deployment
---

Clone the repository (https://github.com/ua-data7/aiira-digital-twin).


### Configure .env file
---

In the root directory of the repo, copy the `.env.example` file into a new file `.env`. 

1. Install PostgreSQL on the host machine if not installed.  Create a new Postgres user and database for the project.  Populate the database info into the `POSTGRES_` vars:
    1. `POSTGRES_NAME`: name of database
    2. `POSTGRES_USER` : name of database user
    3. `POSTGRES_PASSWORD` : password for database user
    4. `POSTGRES_HOST` : Host IP address
2. If using SSL, install the certs on the host machine and specify the paths to the `.crt` and `.key` files using `SSL_CERT_PATH` and `SSL_KEY_PATH.`    
3. On shimerdas VM, the firewall was preventing the Django docker container from connecting to the local Postgres database, so we need to enable a firewall rule that allows the docker subnet to access port 5432.  The IP kept changing, therefore we assign a subnet to use with `DOCKER_SUBNET` , for example `172.19.0.0/16` .

### Configure Django settings

---

Copy `/django/digital_twin/local_example.py` to `[local.py](http://local.py)` .

1. Add a long random string for `SECRET_KEY`
2. Include the hostname in `ALLOWED_HOSTS`, `CORS_ORIGIN_WHITELIST`, and `CSRF_TRUSTED_ORIGINS`  as follows.  `django` must be included in `ALLOWED_HOSTS` because it is the name of the docker service for the Django app.

```
DEBUG = True

# https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
SECRET_KEY = "<long random string here>"

# https://docs.djangoproject.com/en/dev/ref/settings/#allowed-hosts
ALLOWED_HOSTS = ["django", "sierra.cyverse.org"]

CORS_ORIGIN_WHITELIST = [
  "https://sierra.cyverse.org"
]

CSRF_TRUSTED_ORIGINS = ['https://sierra.cyverse.org']
```

### Configure .env for NextJS

---

Copy the `frontend/.env.example` to `frontend/.env` .  `NEXT_PUBLIC_API_URL` is only used for development so this can be empty.  `SERVER_API_URL` should be `[http://django:8000](http://django:8000)` which refers to the Django Docker container.  The NextJS app needs its own .env file because setting the variable in the docker-compose with `environment` did not pass the vars to the app properly.

Serve the app with docker-compose

---

1. Build and run the app: `docker-compose up --build -d`
2. Apply database migrations: `docker compose exec django python [manage.py](http://manage.py/) migrate --noinput`
3. Create a Django superuser: `docker-compose exec django python [manage.py](http://manage.py/) createsuperuser`

Troubleshooting Postgres connection

---

1. `sudo ufw allow from <DOCKER_SUBNET> to any port 5432` enables the firewall rule to allow the Django container to connect to Postgres.
2. In `/etc/postgresql/14/main/postgresql.conf`
    1. `listen_addresses = '*’` to listen on all IPs, not just localhost
3. Had to add this line to `/etc/postgresql/14/main/pg_hba.conf` using `DOCKER_SUBNET` value

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD

host    all             all             172.19.0.0/16           md5
```