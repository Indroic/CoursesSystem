# Generated by Django 5.0.6 on 2024-06-10 05:15

import users.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_user_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(default='avatars/default.jpg', upload_to=users.models.generar_nombre),
        ),
    ]
