#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hrms_backend.settings')

    try:
        from django.core.management import execute_from_command_line
        from django.contrib.auth import get_user_model
        import django

        # Setup Django
        django.setup()

        # Create superuser automatically (ONLY if not exists)
        User = get_user_model()

        username = "admin"
        email = "admin@gmail.com"
        password = "admin123"

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username, email, password)

    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
