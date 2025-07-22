import os
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()  # Charge les variables du fichier .env

print("EMAIL_HOST_PASSWORD =", os.getenv("EMAIL_HOST_PASSWORD"))

BASE_DIR = Path(__file__).resolve().parent.parent

def get_env_variable(var_name):
    value = os.getenv(var_name)
    if not value:
        raise Exception(f"La variable d'environnement {var_name} est manquante !")
    return value

SECRET_KEY = get_env_variable("SECRET_KEY")

DEBUG = True
ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    # apps Django standards
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # libs tierces
    'corsheaders',
    'graphene_django',
    'graphql_jwt.refresh_token',

    # apps locales
    'users',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # doit être avant CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'Backend.urls'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'ia_content_db',
        'USER': 'postgres',
        'PASSWORD': 'sylvana',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

AUTH_USER_MODEL = 'users.CustomUser'

LANGUAGE_CODE = 'fr-fr'
TIME_ZONE = 'Indian/Antananarivo'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'

GRAPHENE = {
    'SCHEMA': 'Backend.schema.schema',
    'MIDDLEWARE': [
        'graphql_jwt.middleware.JSONWebTokenMiddleware',
    ],
}

AUTHENTICATION_BACKENDS = [
    'graphql_jwt.backends.JSONWebTokenBackend',
    'django.contrib.auth.backends.ModelBackend',
]

GRAPHQL_JWT = {
    'JWT_SECRET_KEY': SECRET_KEY,
    'JWT_ALGORITHM': 'HS256',
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_EXPIRATION_DELTA': timedelta(hours=1),
    'JWT_ALLOW_REFRESH': True,
    'JWT_REFRESH_EXPIRATION_DELTA': timedelta(days=7),
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'SafidySylvana333@gmail.com'
EMAIL_HOST_PASSWORD = "sjyt nesj izzw wvtz "
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],  # Chemin vers templates perso si besoin
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",  # obligatoire pour admin
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]
