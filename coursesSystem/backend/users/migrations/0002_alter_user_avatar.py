# Generated by Django 5.0.6 on 2024-06-10 05:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to='<function User.<lambda> at 0x7f9cce5a7d90>'),
        ),
    ]