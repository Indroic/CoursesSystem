# Generated by Django 5.0.6 on 2024-06-10 05:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_user_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(default='avatars/default.png', upload_to='<function User.<lambda> at 0x7ff92ec8fd90>'),
        ),
    ]