# Generated by Django 5.0.6 on 2024-06-14 01:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_alter_user_options_remove_user_rol_alter_user_avatar_and_more'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='user',
            table='users',
        ),
    ]
