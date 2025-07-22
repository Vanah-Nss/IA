import secrets

def generate_django_secret_key():
    chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
    return ''.join(secrets.choice(chars) for _ in range(50))

if __name__ == "__main__":
    print(generate_django_secret_key())


